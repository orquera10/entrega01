import { USERSDAO } from '../dao/index.js';

const getByEmail = async (email) => {
    const result = await USERSDAO.getByEmail(email);
    return result;
}

const saveUser = async (user) => {
    const result = await USERSDAO.save(user);
    return result;
}

export{
    getByEmail,
    saveUser
}