import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.option('--persistence <persistence>', 'variable de ambiente', 'MONGO')
    .option('--mode <mode>', 'modo de trabajio', 'develop')

program.parse();
const persistence = program.opts().persistence;
const mode = program.opts().mode;

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence,
    mode,
    privateKey: process.env.PRIVATE_KEY,
    idGitHub: process.env.ID_GITHUB,
    secretGitHub: process.env.SECRET_GITHUB,
    idGoogle: process.env.ID_GOOGLE,
    secretGoogle: process.env.SECRET_GOOGLE,
    idFacebook: process.env.ID_FACEBOOK,
    secretFacebook: process.env.SECRET_FACEBOOK,
    passDefault: process.env.PASS_DEFAULT,
    userNodemailer: process.env.USER_NODEMAILER,
    passNodemailer: process.env.PASS_NODEMAILER
}