import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.option('--persistence <persistence>', 'variable de ambiente', 'MONGO');
program.parse();
const persistence = program.opts().persistence;

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence,
    privateKey: process.env.PRIVATE_KEY,
    idGitHub: process.env.ID_GITHUB,
    secretGitHub: process.env.SECRET_GITHUB,
    idGoogle: process.env.ID_GOOGLE,
    secretGoogle: process.env.SECRET_GOOGLE,
    idFacebook: process.env.ID_FACEBOOK,
    secretFacebook: process.env.SECRET_FACEBOOK,
    passDefault: process.env.PASS_DEFAULT
}