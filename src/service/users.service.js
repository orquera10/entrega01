import UsersRepository from '../repositories/users.repository.js';

const usersRepository = new UsersRepository();

const getByEmail = async (email) => {
    const result = await usersRepository.getByEmail(email);
    return result;
}

const saveUser = async (user) => {
    const result = await usersRepository.save(user);
    return result;
}

export{
    getByEmail,
    saveUser
}