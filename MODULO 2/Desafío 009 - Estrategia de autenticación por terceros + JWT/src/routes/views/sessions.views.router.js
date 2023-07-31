import { Router } from 'express';
const router = Router();

// Simple auth
const auth = (req, res, next) => {
    if(req.session.user){
        return next();
    }else if(!req.session.user){
        res.redirect('/sessions/login');
    };
};

// Register
router.get('/register', (req, res) => {
    res.render('sessions/register', {
        ttitle: 'Spazzio: Sign Up',
        style: 'index',
        script: 'register',
        header: false,
    });
});

// Login
router.get('/login', (req, res) => {
    res.render('sessions/login', {
        title: 'Spazzio: Log In',
        style: 'index',
        script: 'login',
        header: false,
    });
});

// Profile
router.get('/profile', auth, (req, res) => {
    res.render('sessions/profile', {
        title: 'Spazzio: Profile',
        style: 'index',
        script: 'profile',
        header: true,
        user: req.session.user,
    });
});


export default router;