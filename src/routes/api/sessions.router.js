import { error } from 'console';
import { Router } from 'express';
// import userModel from '../../dao/models/user.model.js';
import passport from 'passport';

const router = Router();

// router.post('/register', async (req, res) => {
//     try {
//         const { first_name, last_name, email, age, password } = req.body;
//         const exists = await userModel.findOne({ email });

//         if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });

//         const user = {
//             first_name,
//             last_name,
//             email,
//             age,
//             password
//         }

//         await userModel.create(user);
//         res.send({ status: 'success', message: 'User registered' })
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// })

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' })
});

router.get('/fail-register', async (req, res) => {
    res.status(400).send({ status: 'error', message: 'Register failed' });
});

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//             req.session.user = {
//                 name: "Administrador",
//                 email: email,
//                 role: 'admin'
//             }
//             return res.send({ status: 'success', message: 'Login success' })
//         }

//         const user = await userModel.findOne({ email, password });

//         if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });

//         req.session.user = {
//             name: `${user.first_name} ${user.last_name}`,
//             email: user.email,
//             age: user.age,
//             role: "usuario"
//         }

//         res.send({ status: 'success', message: 'Login success' })
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });

router.post('/login',  passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
    // const { email, password } = req.body;
    // console.log(req.body);
    // if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
    //     req.session.user = {
    //             first_name: "Administrador",
    //             email: email,
    //             role: 'admin'
    //     }
    //     return res.send({ status: 'success', message: 'Login success' })
    // }
    
    if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
    
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role || "usuario"
    };

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

export default router;