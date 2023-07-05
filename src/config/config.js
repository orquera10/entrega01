import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    privateKey: process.env.PRIVATE_KEY,
    idGitHub: process.env.ID_GITHUB,
    secretGitHub: process.env.SECRET_GITHUB,
    idGoogle: process.env.ID_GOOGLE,
    secretGoogle: process.env.SECRET_GOOGLE,
    idFacebook: process.env.ID_FACEBOOK,
    secretFacebook: process.env.SECRET_FACEBOOK,
    passDefault: process.env.PASS_DEFAULT
}