import { isValidPassword, generateToken, createHash } from '../utils.js';
import { getByEmail as getByEmailService, saveUser as saveUserService } from '../service/users.service.js';
import { addCartService } from '../service/carts.service.js';
import UserDto from '../dao/DTOs/user.dto.js';


const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await getByEmailService(email);
    if (!user) {
        req.logger.error('incorrect credentials');
        return res.sendClientError('incorrect credentials');
    }
    const comparePassword = isValidPassword(user, password);
    if (!comparePassword) {
        req.logger.error('incorrect password');
        return res.sendClientError('incorrect password');
    }
    const accessToken = generateToken(user);
    req.logger.info('access token generated successfully');
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    ).sendSuccess({ accessToken });
}

const userLogout = (req, res) => {
    req.logger.info('access token deleted successfully');
    res.clearCookie("coderCookieToken").redirect('/login')
}

const userRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body;
        if (!first_name || !last_name || !email || !password || !age){
            req.logger.error('error incomplete values');
            return res.sendClientError('incomplete values');
        }

        const exists = await getByEmailService(email);
        if (exists){
            req.logger.error('user already exists');
            return res.sendClientError('user already exists')
        }
        
        const cart = await addCartService({ products: [] });
        const hashedPassword = createHash(password);
        const newUser = {
            ...req.body, role: "USER", cart: cart._id
        };
        newUser.password = hashedPassword;
        const result = await saveUserService(newUser);
        req.logger.info('successfully registered user');
        res.sendSuccess(result)
    } catch (error) {
        req.logger.error('error register user');
        res.sendServerError(error.message);
    }
}

const userCurrent = async (req,res) => {
    try {
        const result = new UserDto(req.user);
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
    const accessToken = generateToken(req.user);
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
    const accessToken = generateToken(req.user);
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
    const accessToken = generateToken(req.user);
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