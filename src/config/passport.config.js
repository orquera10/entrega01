import passport from 'passport';
// import local from 'passport-local';
import {userModel} from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';
import jwt from "passport-jwt";
import { PRIVATE_KEY } from "./constants.js";

// const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;


const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user);
            //req.user
        } catch (error) {
            return done(error);
        }
    }))
    

    // passport.use('register', new LocalStrategy({
    //     passReqToCallback: true, //permite acceder al objeto request como cualquier otro middleware,
    //     usernameField: 'email'
    // }, async (req, username, password, done) => {
    //     const { first_name, last_name, email, age } = req.body;
    //     try {
    //         const user = await userModel.findOne({ email: username });

    //         if (user) {
    //             return done(null, false)
    //         }

    //         const userToSave = {
    //             first_name,
    //             last_name,
    //             email,
    //             age,
    //             password: createHash(password)
    //         }
    
    //         const result = await userModel.create(userToSave);
    //         return done(null, result)

    //     } catch (error) {
    //         return done(`Error al obtener el usario: ${error}`)
    //     }
    // }));

    // passport.use('login', new LocalStrategy({
    //     usernameField: 'email'
    // }, async (username, password, done) => {
    //     try {
    //         const user = await userModel.findOne({ email: username});

    //         if (!user) {
    //             return done(null, false)
    //         }

    //         if (!isValidPassword(user, password)) {
    //             return done(null, false)
    //         }

    //         return done(null, user)
    //         //req.user

    //     } catch (error) {
    //         return done(`Error al obtener el usario: ${error}`)
    //     }
    // }));

    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.d43bcb2397327d68",
        clientSecret: "19dcaa0228ee07bd94c9c35f6cf5726f98b86df5",
        callbackURL: "http://localhost:8081/api/users/github-callback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email })
            if (!user) {
                const newUser = {
                    first_name: profile._json.login,
                    last_name: 'user',
                    age: 18,
                    email,
                    role:'USER',
                    password: createHash('1234')
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
        callbackURL: "http://localhost:8081/api/users/google-callback",
        passReqToCallback   : true,
        scope: [ 'email', 'profile' ]
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email })
            if (!user) {
                const newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    age: 18,
                    email,
                    role:'USER',
                    password: createHash('1234') 
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

    passport.use('facebook', new FacebookStrategy({
        clientID: '821769652805626',
        clientSecret: '18eaa5842a5e251bb966ab9b4213cd6e',
        callbackURL: "http://localhost:8081/api/users/facebook-callback"
      },
      async function(accessToken, refreshToken, profile, done) {
        
        try {
            const user = await userModel.findOne({ email:`${profile._json.id}@mail.com` })
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: 'user',
                    age: 18,
                    email: `${profile._json.id}@mail.com`,
                    role:'USER',
                    password: createHash('1234') 
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

    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });

    // passport.deserializeUser(async (id, done) => {
    //     const user = await userModel.findById(id);
    //     done(null, user);
    // });
};

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token;
}

export default initializePassport;