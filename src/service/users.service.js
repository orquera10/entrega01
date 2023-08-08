import UsersRepository from '../repositories/users.repository.js';
import { isValidPassword, generateToken, createHash, validateToken } from '../utils/utils.js';
import { IncorrectLoginCredentials, UserAlreadyExists, UserNotFound } from "../utils/custom-exceptions.js";
import { addCartService } from './carts.service.js';
import { loginNotification } from "../utils/custom-html.js";
import { sendEmail } from './mail.js';

const usersRepository = new UsersRepository();

const getByEmailLogin = async (email) => {
    const user = await usersRepository.getByEmail(email);
    if (!user) {
        throw new UserNotFound('User not found');
    }
    return user;
}

const login = async (password, user) => {
    const comparePassword = isValidPassword(user, password);
    if (!comparePassword) {
        throw new IncorrectLoginCredentials('incorrect credentials');
    }
    const accessToken = generateToken(user);
    return accessToken;
}

const getByEmailRegister = async (email) => {
    const user = await usersRepository.getByEmail(email);
    if (user) {
        throw new UserAlreadyExists('user already exists');
    }
    return result;
}

const register = async (user) => {

    const cart = await addCartService({ products: [] });
    const hashedPassword = createHash(user.password);
    const newUser = {
        ...user, role: "USER", cart: cart._id
    };
    newUser.password = hashedPassword;

    const result = await usersRepository.saveUser(newUser);
    return result;
}

const currentUser = async (user) => {
    const result = await usersRepository.currentUser(user);
    return result;
}

const createToken = async (user) => {
    const accessToken = generateToken(user);
    return accessToken;
}

const getByEmail = async (email) => {
    const user = await usersRepository.getByEmail(email);
    return user;
}

const passwordLinkService = async (user) => {
    const passLinkToken = generateToken(user);
    const email = {
        to: user.email,
        subject: 'Restablecimiento de contraseña',
        html: loginNotification(passLinkToken)
    }
    await sendEmail(email);
}

const verificarTokenService = async (token) => {
    const validationResult = validateToken(token);
    if (validationResult.valid) {
        console.log('El JWT es válido.');
        console.log('Contenido del JWT:', validationResult.decoded);
    } else {
        console.error('Error:', validationResult.message);
    }
}

export {
    getByEmail,
    login,
    getByEmailRegister,
    register,
    currentUser,
    createToken,
    getByEmailLogin,
    passwordLinkService,
    verificarTokenService
}