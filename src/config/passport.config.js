import passport from 'passport';
import { createHash } from '../utils/utils.js';
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';
import jwt from "passport-jwt";
import { PRIVATE_KEY } from "./constants.js";
import config from './config.js';
import { getByEmail } from '../service/users.service.js';
import { register } from '../service/sessions.service.js';

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

    passport.use('github', new GitHubStrategy({
        clientID: config.idGitHub,
        clientSecret: config.secretGitHub,
        callbackURL: "http://localhost:8081/api/users/github-callback",
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await getByEmail(email)
            if (!user) {
                // const cart = await addCartService({ products: [] });
                const newUser = {
                    first_name: profile._json.login,
                    last_name: 'user',
                    age: 18,
                    email,
                    // role: 'USER',
                    password: createHash(config.passDefault)
                    // cart: cart._id
                }
                const result = await register(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('google', new GoogleStrategy({
        clientID: config.idGoogle,
        clientSecret: config.secretGoogle,
        callbackURL: "http://localhost:8081/api/users/google-callback",
        passReqToCallback: true,
        scope: ['email', 'profile']
    },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const user = await getByEmail(email)

                if (!user) {
                    // const cart = await addCartService({ products: [] });
                    const newUser = {
                        first_name: profile._json.given_name,
                        last_name: profile._json.family_name,
                        age: 18,
                        email,
                        // role: 'USER',
                        password: createHash(config.passDefault)
                        // cart: cart._id
                    }
                    const result = await register(newUser);
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
        clientID: config.idFacebook,
        clientSecret: config.secretFacebook,
        callbackURL: "http://localhost:8081/api/users/facebook-callback"
    },
        async function (accessToken, refreshToken, profile, done) {

            try {
                const user = await getByEmail(`${profile._json.id}@mail.com`)
                if (!user) {
                    // const cart = await addCartService({ products: [] });
                    const newUser = {
                        first_name: profile._json.name,
                        last_name: 'user',
                        age: 18,
                        email: `${profile._json.id}@mail.com`,
                        // role: 'USER',
                        password: createHash(config.passDefault)
                        // cart: cart._id
                    }

                    const result = await register(newUser);
                    done(null, result);
                } else {
                    done(null, user);
                }
            } catch (error) {
                return done(error)
            }

        }
    ));

};

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken'];
    }
    return token;
}

export default initializePassport;