import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import UserModel from "./dao/models/user.model.js";
import { createHash, isValidPassword } from "./utils.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {

    // Github
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.c6393a5a4e45f659",
        clientSecret: "56481b236a470302ddb135a301e721716a8b6ae4",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try{
            const user = await UserModel.findOne({ email: profile._json.email });
            if(user) return done(null, user);

            const newUser = await UserModel.create({
                first_name: profile._json.name,
                email: profile._json.email
            });

            return done(null, newUser);
        } catch (error){
            return done("Error trying to log in with GitHub");
        };
    }))

    // Register
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email",
    }, async (req, username, password, done) => {
        // Si no recibo nada por body interrumpo la ejecucion
        if(!req.body) return;

        // Formateo la informacion recibida
        const newFirstName =  req.body.first_name.trim();
        const newLastName =  req.body.last_name.trim();
        const newEmail =  req.body.email.trim();
        const newAge = Number(req.body.age);
        
        // Funcion auxiliar para verificar si el usuario creado es administrador
        const isAdmin = (email, psw) => {
            if(email === "adminCoder@coder.com" && psw === "adminCod3r123"){
                return true;
            } else {
                return false;
            };
        };

        try {
            // Buscamos en la bse de datos si existe el usuario a traves de su email
            const user = await UserModel.findOne({ email: username })

            // Si existe retornamos que el usuario ya existe
            if(user !== null){
                console.log("User already exists");
                return done(null, false);
            };

            // En caso de que no exista guardamos al usuario en la base de datos

            // Nuevo usuario
            const newUser = {
                first_name: newFirstName,
                last_name: newLastName,
                email: newEmail,
                age: newAge,
                // Hasheamos con bcrypt el password
                password: createHash(password),
                admin: isAdmin(newEmail, password),
            };

            // Cramos el usuario en la base de datos
            const result = await UserModel.create(newUser);

            // Devolvemos el usuario
            return done(null, result);

        } catch(error){
            return done(`Internal fatal error trying to create a new user: ${error}`);
        };
    }));
    
    // Login
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username });
            
            if(!user){
                console.log("User doesnt exists");
                return done(null, user);
            };

            if(!isValidPassword(user, password)) return done(null, false);

            return done(null, user);
        } catch (error){
            return done(`Internal fatal error trying to login: ${error}`);
        };
    }));

    // Serialize
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Deserialize
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;