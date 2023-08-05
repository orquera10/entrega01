import UsersRepository from '../repositories/users.repository.js';
import { isValidPassword, generateToken, createHash } from '../utils/utils.js';
import { IncorrectLoginCredentials, UserAlreadyExists, UserNotFound } from "../utils/custom-exceptions.js";
import { addCartService } from './carts.service.js';

const usersRepository = new UsersRepository();

const getByEmail = async (email) => {
    const user = await usersRepository.getByEmail(email);
    if (!user) {
        throw new UserNotFound('User not found');
    }
    return result;
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

    const result = await usersRepository.save(newUser);
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

export {
    getByEmail,
    saveUser,
    login,
    getByEmailRegister,
    register,
    currentUser,
    createToken
}