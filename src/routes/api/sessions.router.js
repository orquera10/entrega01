import { Router } from 'express';
import passport from 'passport';

const router = Router();

const setearUsuario = (req) => {
    if (req.user.email === 'adminCoder@coder.com') req.user.role = "admin";
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role || "usuario",
        itsAdmin: req.user.role === "admin"
    };
};

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' })
});

router.get('/fail-register', async (req, res) => {
    res.status(400).send({ status: 'error', message: 'Register failed' });
});

router.post('/login',  passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
    
    if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });

    setearUsuario(req);

    res.send({ status: 'success', message: 'Login success' })
});

router.get('/fail-login', async (req, res) => {
    res.status(400).send({ status: 'error', message: 'Login failed' })
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({ status: 'error', error: 'Logout fail' });
        res.redirect('/products')
    })
});

router.get('/github', passport.authenticate(
    'github', { scope: ['user:email'] }
), async (req, res) => {
    res.send({ status: "success", message: "User registered" })
});

router.get('/github-callback', passport.authenticate(
    'github', { failureRedirect: '/login' }
), async (req, res) => {
    setearUsuario(req);
    res.redirect('/')
});

router.get('/google', passport.authenticate(
    'google'
), async (req, res) => {
    res.send({ status: "success", message: "User registered" })
});

router.get('/google-callback', passport.authenticate(
    'google', { failureRedirect: '/login' }
), async (req, res) => {
    setearUsuario(req);
    res.redirect('/')
});

export default router;