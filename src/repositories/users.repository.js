import { Users } from '../dao/factory.js';
import UserDto from '../dao/DTOs/user.dto.js';

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

    currentUser = async (user) => {
        const result = new UserDto(user);
        return result;
    }
}