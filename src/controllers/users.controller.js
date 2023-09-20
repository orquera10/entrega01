import {
    getByEmailLogin as getByEmailLoginService,
    getByEmail as getByEmailService,
    passwordLinkService, verificarTokenService,
    resetPassService, validarPasswordService,
    getByIDService, updateRoleService,
    updateUserService, getAllUsersService,
    deleteUsersService, deleteUserService
} from '../service/users.service.js';
import { IncorrectPassword, UserNotFound, RoleNotUser } from '../utils/custom-exceptions.js';

const passwordLink = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getByEmailLoginService(email);
        await passwordLinkService(user);
        req.logger.info('password token send successfully');
        res.sendSuccess("password token generated")
    } catch (error) {
        if (error instanceof UserNotFound) {
            req.logger.error('user not found');
            return res.sendClientError(error.message);
        }
        req.logger.error('server error password link');
        res.sendServerError(error.message);
    }

}

const passwordReset = async (req, res) => {
    try {
        const { password, token } = req.body;

        const userToken = await verificarTokenService(token);
        const user = await getByEmailService(userToken.email);
        await validarPasswordService(user, password);
        if (user) {
            req.logger.info('password reset successfully');
            await resetPassService(user, password);
            res.sendSuccess('password reset successfully');
        }
    } catch (error) {
        if (error instanceof IncorrectPassword) {
            req.logger.error('invalid Password');
            return res.sendClientError(error.message);
        }
        req.logger.error('invalid token');
        res.sendServerError(error.message);
    }

}

const premium = async (req, res) => {
    try {
        const userID = req.params.uid;
        const user = await getByIDService(userID);
        if (user.role === "ADMIN") {
            req.logger.error('not change role, admin user');
            res.sendClientError('not change role, admin user');
        }
        await updateRoleService(user);
        req.logger.info('Role change successfully');
        res.sendSuccess('Role change successfully');
    } catch (error) {
        if (error instanceof RoleNotUser) {
            req.logger.error('user role is not USER');
            return res.sendClientError(error.message);
        }
        req.logger.error('error service premium');
        res.sendServerError(error.message);
    }

}

const upload = async (req, res) => {
    try {
        req.logger.info('upload successfully');
        res.sendSuccess('upload successfully');
    } catch (error) {
        req.logger.error('error service upload');
        res.sendServerError(error.message);
    }
}

const uploadDocuments = async (req, res) => {
    try {
        const { params: { uid }, files: filename } = req;
        const baseURL = 'http://localhost:8081/img/';

        const user = await getByIDService(uid);

        if (!user) {
            req.logger.error('User does not exist');
            return res.sendClientError('User does not exist');
        }

        const newDocument = [];

        if (filename.identificacion) {
            newDocument.push({ name: 'Identificacion', reference: `${baseURL}${filename.identificacion[0].filename}` });
        }
        if (filename.domicilio) {
            newDocument.push({ name: 'Comprobante de domicilio', reference: `${baseURL}${filename.domicilio[0].filename}` });
        }
        if (filename.estadoCuenta) {
            newDocument.push({ name: 'Comprobante de estado de cuenta', reference: `${baseURL}${filename.estadoCuenta[0].filename}` });
        }

        if (!user.documents) {
            user.documents = newDocument;
        } else {
            newDocument.forEach(ndoc => {
                const existingDoc = user.documents.find(doc => doc.name === ndoc.name);
                if (existingDoc) {
                    existingDoc.reference = ndoc.reference;
                } else {
                    user.documents.push(ndoc);
                }
            });
        }

        const result = await updateUserService(user._id, user);
        req.logger.info('Upload successful');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('Error in document upload service');
        res.sendServerError(error.message);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const result = await getAllUsersService();
        req.logger.info('get all successfully');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error get all users');
        res.sendServerError(error.message);
    }
}

const deleteUsers = async (req, res) => {
    try {
        await deleteUsersService();
        req.logger.info('delete users 2 days successfully');
        res.sendSuccess('delete users 2 days successfully');
    } catch (error) {
        req.logger.error('error delete users');
        res.sendServerError(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.uid;
        const user = await getByIDService(userID);
        if (!user) {
            req.logger.error('user not exist');
            res.sendClientError('user not exist');
        }
        await deleteUserService(userID);
        req.logger.info('delete user');
        res.sendSuccess('delete user');
    } catch (error) {
        req.logger.error('error delete user');
        res.sendServerError(error.message);
    }
}

export {
    passwordLink,
    passwordReset,
    premium,
    upload,
    uploadDocuments,
    getAllUsers,
    deleteUsers,
    deleteUser
}