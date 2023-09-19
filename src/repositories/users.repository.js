import { Users } from '../dao/factory.js';
import { UserDto, GetUserDto } from '../dao/DTOs/user.dto.js';

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

    updateUser = async (uid, user) => {
        const result = await this.dao.update(uid, user);
        return result;
    }

    getById = async (uid) => {
        const result = await this.dao.getById(uid);
        return result;
    }

    getAll = async () => {
        const result = await this.dao.getAll();
        return result.map(user => new GetUserDto(user));
    }
}