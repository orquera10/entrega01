// import path from 'path'
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dirname, join } from "path";
import { PRIVATE_KEY } from "../config/constants.js";
import { faker } from '@faker-js/faker';
import nodemailer from 'nodemailer';
import config from '../config/config.js';
import multer from 'multer';

faker.locale = "es";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __directory = join(__dirname, '..')

//cifrado vs hasheo
//Hasheo es mucho más seguro, porque?, con este mecanismo garantizamos que no vamos a poder revertir los datos a texto plano
//Cifrado, si nosotros sabemos la clave privada con la que estamos cifrando los datos, podemos hacer el proceso inverso.
const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' });
    return token;
};

const validateToken = (token) => {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return decoded;
};

const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(10),
        price: faker.commerce.price(),
        status: true,
        category: faker.commerce.department(),
        stock: faker.random.numeric(1),
        thumbnail: faker.image.image()
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.userNodemailer,
        pass: config.passNodemailer
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__directory}/public/img`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({
    storage, onError: (err, next) => {
        console.log(err);
        next();
    }
});

export {
    __directory,
    createHash,
    isValidPassword,
    generateToken,
    generateProduct,
    transporter,
    validateToken,
    uploader
}

