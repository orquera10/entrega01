import {
    getByEmailLogin as getByEmailLoginService,
    register as registerService,
    login as loginService,
    getByEmailRegister as getByEmailRegisterService,
    currentUser as currentUserService,
    createToken as createTokenService,
    getByEmail as getByEmailService,
    passwordLinkService, verificarTokenService,
    resetPassService, validarPasswordService,
    getByIDService, updateRoleService,
    updateUserService
} from '../service/users.service.js';
import { IncorrectPassword } from '../utils/custom-exceptions.js';


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

const userLogout = (req, res) => {
    req.logger.info('access token deleted successfully');
    res.clearCookie("coderCookieToken").redirect('/login')
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
        const result = await updateRoleService(user);
        req.logger.info('Role change successfully');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error service premium');
        res.sendServerError(error.message);
    }

}

const upload = async (req, res) => {
    try {
        // const filename = req.file.filename;
        // console.log(filename);

        req.logger.info('upload successfully');
        res.sendSuccess('upload successfully');
    } catch (error) {
        req.logger.error('error service upload');
        res.sendServerError(error.message);
    }
}

const uploadDocuments = async (req, res) => {
    const userID = req.params.uid;
    try {
        const filename = req.files;
        const user = await getByIDService(userID);
        const newDocument = [];
        if (!user) {
            req.logger.error('user not exist');
            res.sendClientError('user not exist');
        }

        if (filename.identificacion) newDocument.push({ name: 'Identificacion', reference: `http://localhost:8081/img/${filename.identificacion[0].filename}` });
        if (filename.domicilio) newDocument.push({ name: 'Comprobante de domicilio', reference: `http://localhost:8081/img/${filename.domicilio[0].filename}` });
        if (filename.estadoCuenta) newDocument.push({ name: 'Comprobante de estado de cuenta', reference: `http://localhost:8081/img/${filename.estadoCuenta[0].filename}` });

        if (!user.documents) {
            user.documents = newDocument;
        } else {
            newDocument.forEach(ndoc => {
                let band = true;
                user.documents.forEach(doc => {
                    if (doc.name === ndoc.name) {

                        band = false;
                        doc.reference = ndoc.reference;

                    }
                })
                if (band) {
                    user.documents.push(ndoc)
                }
            });

        }

        console.log(user);

        const result = await updateUserService(user._id, user);
        req.logger.info('upload successfully');
        res.sendSuccess(result);
    } catch (error) {
        req.logger.error('error service upload');
        res.sendServerError(error.message);
    }
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
    callbackFacebook,
    passwordLink,
    passwordReset,
    premium,
    upload,
    uploadDocuments
}