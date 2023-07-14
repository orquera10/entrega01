import { Users } from '../dao/factory.js'

export default class UsersRepository {
    constructor() {
        this.dao = Users;
    }

    getByEmail = async (email) => {
        const result = await this.dao.getByEmail(email);
        return result;
    }

    saveUser = async (user) => {
        const result = await this.dao.save(user);
        return result;
    }
}