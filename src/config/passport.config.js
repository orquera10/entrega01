import passport from 'passport';
import local from 'passport-local';
import userModel from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth2'

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //permite acceder al objeto request como cualquier otro middleware,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
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

            if (!isValidPassword(user, password)) {
                return done(null, false)
            }

            return done(null, user)
            //req.user

        } catch (error) {
            return done(`Error al obtener el usario: ${error}`)
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.d43bcb2397327d68",
        clientSecret: "19dcaa0228ee07bd94c9c35f6cf5726f98b86df5",
        callbackURL: "http://localhost:8081/api/sessions/github-callback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email })
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: '' 
                }

                const result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('google', new GoogleStrategy({
        clientID: '497464075287-fc71tg0hfcf9ek0p2nm8cvlpq6hqdsr2.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8081/api/sessions/google-callback",
        passReqToCallback   : true,
        scope: [ 'email', 'profile' ]
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email })
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: '' 
                }

                const result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error)
        }
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;