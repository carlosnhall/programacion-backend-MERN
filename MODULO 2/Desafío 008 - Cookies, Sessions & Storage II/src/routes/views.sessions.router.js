import { Router } from 'express';
const router = Router();

const auth = (req, res, next) => {
    if(req.session.user){
        return next();
    }else if(!req.session.user){
        res.redirect('/sessions/login');
    };
};

router.get('/register', (req, res) => {
    res.render('register', {
        style: 'sessions',
        script: 'register'
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        style: 'sessions',
        script: 'login'
    });
});

router.get('/profile', auth, (req, res) => {
    res.render('profile', {
        style: 'sessions',
        script: 'profile',
        user: req.session.user
    });
});


export default router;