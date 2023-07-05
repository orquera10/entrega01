import { isValidPassword, generateToken, createHash } from '../utils.js';
import { getByEmail as getByEmailService, saveUser as saveUserService } from '../service/users.service.js';
import { addCartService } from '../service/carts.service.js';


const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await getByEmailService(email);
    if (!user) return res.sendClientError('incorrect credentials');
    const comparePassword = isValidPassword(user, password);
    if (!comparePassword) {
        return res.sendClientError('incorrect credentials');
    }
    const accessToken = generateToken(user);
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    ).sendSuccess({ accessToken });
}

const userLogout = (req, res) => {
    res.clearCookie("coderCookieToken").redirect('/login')
}

const userRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body;
        if (!first_name || !last_name || !email || !password || !age)
            return res.sendClientError('incomplete values')
        const exists = await getByEmailService(email);
        if (exists)
            return res.sendClientError('user already exists')
        const cart = await addCartService({ products: [] });
        const hashedPassword = createHash(password);
        const newUser = {
            ...req.body, role: "USER", cart: cart._id
        };
        newUser.password = hashedPassword;
        const result = await saveUserService(newUser);
        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const logGithub = async (req, res) => {
    res.sendSuccess("User registered")
}

const callbackGithub = async (req, res) => {
    const accessToken = generateToken(req.user);
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    )
    res.redirect('/')
}

const logGoogle = async (req, res) => {
    res.sendSuccess("User registered")
}

const callbackGoogle = async (req, res) => {     
    const accessToken = generateToken(req.user);
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    )
    res.redirect('/')
}

const logFacebook = async (req, res) => {
    res.sendSuccess("User registered")
}

const callbackFacebook = async (req, res) => {     
    const accessToken = generateToken(req.user);
    res.cookie(
        'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
    )
    res.redirect('/')
}

export {
    userLogin,
    userLogout,
    userRegister,
    logGithub,
    callbackGithub,
    logGoogle,
    callbackGoogle,
    logFacebook,
    callbackFacebook
}