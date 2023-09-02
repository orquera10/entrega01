import UsersRepository from '../repositories/users.repository.js';
import { isValidPassword, generateToken, createHash, validateToken } from '../utils/utils.js';
import { IncorrectLoginCredentials, UserAlreadyExists, UserNotFound, IncorrectPassword, RoleNotUser } from "../utils/custom-exceptions.js";
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
    const { user } = validationResult;
    return user;
}

const resetPassService = async (user, password) => {
    const hashedPassword = createHash(password);
    user.password = hashedPassword;
    await usersRepository.updateUser(user._id, user);
}

const validarPasswordService = async (user, password) => {
    const comparePassword = isValidPassword(user, password);
    if (comparePassword) {
        throw new IncorrectPassword('invalid password');
    }
}

const getByIDService = async (uid) => {
    const user = await usersRepository.getById(uid);
    return user;
}

const updateRoleService = async (user) => {
    
    
    if (user.role === 'USER') {
        
        const docsBuscados = ['Identificacion', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];

        const docsEncontrados = user.documents.filter(doc => docsBuscados.includes(doc.name));
        console.log(user);
        console.log(docsEncontrados.length);
        if (docsEncontrados.length === 3) {
            
            user.role = 'PREMIUM';
        } else {
            throw new RoleNotUser('user role is not USER'); 
        }
    } else if (user.role === 'PREMIUM'){
        user.role = 'USER';
    }

    await usersRepository.updateUser(user._id, user);
}

const updateUserService = async (uid, user) => {
    const result = await usersRepository.updateUser(uid, user);
    return result;
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
    verificarTokenService,
    resetPassService,
    validarPasswordService,
    getByIDService,
    updateRoleService,
    updateUserService
}