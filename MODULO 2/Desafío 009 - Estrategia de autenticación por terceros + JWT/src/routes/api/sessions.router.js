import { Router } from 'express';
import passport from 'passport';
const router = Router();

// Register
router.post('/register', passport.authenticate("register", { failureRedirect: "/session/failRegister"}), async (req, res) => {
    res.status(200).send({ status: "success", success: "User has been successfully created" });
});

// Register Failure
router.get("/failRegister", (req, res) => {
    res.send({ error: "Fail register" });
});

// Login
router.post('/login', passport.authenticate("login", { failureRedirect: "/sessions/failLogin" }), async (req, res) => {

    if(!req.user){
        res.status(400).send({ status: "error", error: "Invalid credentials" })
    };

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    };

    res.status(200).send({ status: "success", success: "The user has successfully logged in" });
});

// Login Failure
router.get("/failLogin", (req, res) => {
    res.send({ error: "Fail login" });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error){
           return res.status(500).send({ status: "error", error: `Error trying to destroy session: ${error}` })
        } else {
            return res.status(200).send({ status: "success", success: "User loggedout" });
        };
    });
});

// Github
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), (req, res) => {});

// Github Callback
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
});

export default router;