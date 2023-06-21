// import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dirname } from "path";
import { PRIVATE_KEY } from "./config/constants.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//cifrado vs hasheo
//Hasheo es mucho más seguro, porque?, con este mecanismo garantizamos que no vamos a poder revertir los datos a texto plano
//Cifrado, si nosotros sabemos la clave privada con la que estamos cifrando los datos, podemos hacer el proceso inverso.
const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
};

export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken
}

