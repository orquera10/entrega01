import { Router as expressRouter } from 'express';
import { passportStrategiesEnum } from '../config/enums.js';
import passport from 'passport';
// import toAsyncRouter from 'async-express-decorator';

//POST, GET, DELETE, PUT
//router.get('/asdasd', middle1, middle2, (req, res, next))
export default class Router {
    constructor() {
        this.router = expressRouter();
        this.init();
    }

    getRouter() {
        return this.router;
    };

    init() { }

    async get(path, policies, passportStrategy, ...callbacks) {
        this.router.get(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }

    async post(path, policies, passportStrategy, ...callbacks) {
        this.router.post(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }

    async put(path, policies, passportStrategy, ...callbacks) {
        this.router.put(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }

    async delete(path, policies, passportStrategy, ...callbacks) {
        this.router.delete(
            path,
            this.applyCustomPassportCall(passportStrategy),
            this.handlePolicies(policies),
            this.generateCustomReponse,
            this.applyCallbacks(callbacks)
        );
    }

    applyCustomPassportCall = (strategy) => (req, res, next) => {
        if (strategy === passportStrategiesEnum.JWT || strategy === passportStrategiesEnum.github || strategy === passportStrategiesEnum.google || strategy === passportStrategiesEnum.facebook ) {
            passport.authenticate(strategy, function (err, user, info) {
                if (err) return next(err);
                if (!user)
                    return res.status(401).send({
                        error: info.messages ? info.messages : info.toString()
                    })
                req.user = user;
                next();
            })(req, res, next);
        } else {
            next();
        }
    }

    handlePolicies = (policies) => (req, res, next) => {
        if (policies[0] === 'PUBLIC') return next();

        const user = req.user;

        if (!policies.includes(user.role.toUpperCase()))
            return res.status(403).json({ message: 'Forbidden' })
        
        next();
    }

    generateCustomReponse = (req, res, next) => {
        res.sendSuccess = (data) => {
            res.status(200).json({ data });
        };
        res.sendServerError = (error) => {
            res.status(500).json({ error });
        };
        res.sendClientError = (error) => {
            res.status(400).json({ error });
        };
        next();
    }

    applyCallbacks (callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);//req, res, next
            } catch (error) {
                // throw error
                params[1].status(500).json({ error: error.message });
            }
        })
    }
}

