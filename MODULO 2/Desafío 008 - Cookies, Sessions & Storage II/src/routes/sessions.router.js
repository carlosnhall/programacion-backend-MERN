import { Router } from 'express';
import userModel from '../dao/models/user.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    if(!req.body) return;

    const formatEmail =  req.body.email.trim();
    const formatPassword =  req.body.password.trim();

    const isAdmin = (email, password) => {
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
            return true;
        } else {
            return false;
        };
    };

    const newUser = {
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
        email: req.body.email.trim(),
        age: Number(req.body.age),
        password: req.body.password.trim(),
        admin: isAdmin(formatEmail, formatPassword),
    };

    try{
        const user = new userModel(newUser);
        await user.save();
        res.status(200).json({"status": "success", "message": `User has been created: ${user}`});
    }catch(error){
        res.status(500).json({"status": "error", "message": `Error trying to fetch data: ${error}`}); 
    };
});

router.post('/login', async (req, res) => {
    if(!req.body) return;

    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({email, password}).lean().exec();
        
        if(!user){
            return res.status(401).json({"status": "error", "message": "Invalid email or password. Please make sure your email and password are correct."});
        };

        req.session.user = user;

        res.status(200).json({"status": "success", "message": `Welcome: ${user.first_name}`});
    }catch(error){
        res.status(500).json({"status": "error", "message": `Error trying to fetch data: ${error}`}); 
    };
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error){
           return res.status(500).json({"status": "error", "message": `Error trying to destroy session: ${error}`})
        } else {
            return res.status(200).json({"status": "success", "message": "User loggedout"});
        };
    });
});

export default router;