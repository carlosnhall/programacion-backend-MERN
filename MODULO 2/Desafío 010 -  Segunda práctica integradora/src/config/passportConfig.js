import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/usersModel.js";
import { cartsModel } from "../dao/models/cartsModel.js";
import GitHubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth2";
import jwt from "passport-jwt";
import {
  createHash,
  isValidPassword,
  generateToken,
  extractCookie,
} from "../utils.js";
import dotenv from "dotenv";
dotenv.config();

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID:
          "398333993561-sngbcuiggfce5eccss5p13cpl37ggohm.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/session/googlecallback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });
          if (user) {
            user.token = generateToken(user);
            return done(null, user);
          }
          const nuevoCarrito = {
            products: [],
          };
          let carrito = await cartsModel.create(nuevoCarrito);
          const newUser = {
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            user: profile._json.given_name,
            social: "google",
            rol: "user",
            email: profile._json.email,
            password: "",
            cart: carrito._id,
          };
          const result = await userModel.create(newUser);
          result.token = generateToken(result);
          return done(null, result);
        } catch (error) {
          return done("error to login with github" + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.34ee5890827cdd0f",
        clientSecret: "d850e1513b15048d7be01b42e5123da07633fff5",
        callbackURL: "http://localhost:8080/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });
          if (user) {
            user.token = generateToken(user);
            return done(null, user);
          }

          const nuevoCarrito = {
            products: [],
          };
          let carrito = await cartsModel.create(nuevoCarrito);

          const newUser = {
            user: profile._json.login,
            first_name: profile._json.name,
            last_name: "",
            rol: "user",
            social: "github",
            email: profile._json.email,
            password: "",
            cart: carrito._id,
          };

          const result = await userModel.create(newUser);
          result.token = generateToken(result);
          return done(null, result);
        } catch (error) {
          return done("error to login with github" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel
            .findOne({ email: username })
            .lean()
            .exec();
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);

          user.token = generateToken(user);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        let userNew = req.body;
        try {
          const user = await userModel.findOne({ email: username });

          if (user) {
            return done(null, false);
          }
          if (
            userNew.email.includes(`_admin`) &&
            userNew.password == "SoyAdminPapa"
          ) {
            let asignarRol = {
              ...userNew,
              rol: "admin",
            };
            userNew = asignarRol;
          } else {
            let asignarRol = {
              ...userNew,
              rol: "user",
            };
            userNew = asignarRol;
          }
          const nuevoCarrito = {
            products: [],
          };
          let carrito = await cartsModel.create(nuevoCarrito);
          const hashUser = {
            ...userNew,
            cart: carrito._id,
            password: createHash(userNew.password),
          };
          const result = await userModel.create(hashUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener usuario");
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: process.env.JWT_PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        done(null, jwt_payload);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
