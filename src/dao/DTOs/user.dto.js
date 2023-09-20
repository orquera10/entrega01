export class UserDto {
    constructor(user) {
        const updateUser = user;
        delete updateUser.password;
        Object.assign(this, updateUser);
    }
}

export class GetUserDto {
    constructor(user) {
        this._id = user._id
        this.name = `${user.first_name} ${user.last_name}`;
        this.email = user.email;
        this.role = user.role;
    }
}

export const DTOs = {
    UserDto,
    GetUserDto
}