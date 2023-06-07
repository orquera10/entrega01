import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //permite acceder al objeto request como cualquier otro middleware,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {

            // if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            //     const userToSave = {
            //         first_name: "Administrador",
            //         email: email,
            //         role: 'admin'
            //     }
            //     return done(null, userToSave)
            // }

            const user = await userModel.findOne({ email: username });

            if (user) {
                return done(null, false)
            }

            const userToSave = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
    
            const result = await userModel.create(userToSave);
            return done(null, result)

        } catch (error) {
            return done(`Error al obtener el usario: ${error}`)
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username});

            if (!user) {
                return done(null, false)
            }

            if (!isValidPassword(user, password)) return done(null, false)

            return done(null, user)
            //req.user

        } catch (error) {
            return done(`Error al obtener el usario: ${error}`)
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;

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