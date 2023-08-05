// import path from 'path'
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dirname, join } from "path";
import { PRIVATE_KEY } from "../config/constants.js"
import { faker } from '@faker-js/faker';

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
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
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

export {
    __directory,
    createHash,
    isValidPassword,
    generateToken,
    generateProduct
}

