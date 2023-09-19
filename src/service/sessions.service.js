import UsersRepository from '../repositories/users.repository.js';
import { isValidPassword, generateToken, createHash } from '../utils/utils.js';
import { IncorrectLoginCredentials, UserAlreadyExists, UserNotFound } from "../utils/custom-exceptions.js";
import { addCartService } from './carts.service.js';

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

    user.last_connection = Date.now();
    await usersRepository.updateUser(user._id, user);

    const accessToken = generateToken(user);
    return accessToken;
}

const getByEmailRegister = async (email) => {
    const user = await usersRepository.getByEmail(email);
    if (user) {
        throw new UserAlreadyExists('user already exists');
    }

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
    user.last_connection = Date.now();
    await usersRepository.updateUser(user._id, user);
    const accessToken = generateToken(user);
    return accessToken;
}

const updateUserService = async (uid, user) => {
    const result = await usersRepository.updateUser(uid, user);
    return result;
}

export {
    login,
    getByEmailRegister,
    register,
    currentUser,
    createToken,
    getByEmailLogin,
    updateUserService
}