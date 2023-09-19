import {
    getByEmailLogin as getByEmailLoginService,
    register as registerService,
    login as loginService,
    getByEmailRegister as getByEmailRegisterService,
    currentUser as currentUserService,
    createToken as createTokenService,
    updateUserService
} from '../service/sessions.service.js';
import { UserNotFound, IncorrectLoginCredentials, UserAlreadyExists } from '../utils/custom-exceptions.js';


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getByEmailLoginService(email);
        const accessToken = await loginService(password, user);
        req.logger.info('access token generated successfully');
        res.cookie(
            'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
        ).sendSuccess({ accessToken });
    } catch (error) {
        if (error instanceof UserNotFound) {
            req.logger.error('user not found');
            return res.sendClientError(error.message);
        }

        if (error instanceof IncorrectLoginCredentials) {
            req.logger.error('incorrect credentials');
            return res.sendClientError(error.message);
        }
        req.logger.error('server error login user');
        res.sendServerError(error.message);
    }
}

const userRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body;

        if (!first_name || !last_name || !email || !password || !age) {
            req.logger.error('error incomplete values');
            return res.sendClientError('incomplete values');
        }

        await getByEmailRegisterService(email);

        const result = await registerService(req.body);
        req.logger.info('successfully registered user');
        res.sendSuccess(result);

    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            req.logger.error('user already exists');
            return res.sendClientError('user already exists');
        }
        req.logger.error('error register user');
        res.sendServerError(error.message);
    }
}

const userLogout = async (req, res) => {
    try {
        const user = req.user
        user.last_connection = Date.now();
        await updateUserService(user._id, user);
        req.logger.info('access token deleted successfully');
        res.clearCookie("coderCookieToken").redirect('/login')
    } catch (error) {
        req.logger.error('error logout');
        res.sendServerError(error.message);
    }

}

const userCurrent = async (req, res) => {
    try {
        const result = await currentUserService(req.user);
        req.logger.info('successfully user current');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error current user');
        res.sendServerError(error.message);
    }
}


const logGithub = async (req, res) => {
    req.logger.info('successfully login github');
    res.sendSuccess("User registered")
}

const callbackGithub = async (req, res) => {
    const accessToken = await createTokenService(req.user);
    req.logger.info('access token generated successfully');
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    );
    res.redirect('/');
}

const logGoogle = async (req, res) => {
    req.logger.info('successfully login google');
    res.sendSuccess("User registered");
}

const callbackGoogle = async (req, res) => {
    const accessToken = await createTokenService(req.user);
    req.logger.info('access token generated successfully');
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    );
    res.redirect('/');
}

const logFacebook = async (req, res) => {
    req.logger.info('successfully login facebook');
    res.sendSuccess("User registered")
}

const callbackFacebook = async (req, res) => {
    const accessToken = await createTokenService(req.user);
    req.logger.info('access token generated successfully');
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    );
    res.redirect('/');
}

export {
    userLogin,
    userLogout,
    userRegister,
    userCurrent,
    logGithub,
    callbackGithub,
    logGoogle,
    callbackGoogle,
    logFacebook,
    callbackFacebook
}