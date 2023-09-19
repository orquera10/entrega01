export class UserDto {
    // {
    //     "data": {
    //     "_id": "64a490b8d4564a1df4c27e36",
    //     "first_name": "orquera10",
    //     "last_name": "user",
    //     "email": "orquera10@gmail.com",
    //     "age": 18,
    //     "password": "$2b$10$prJsGF2p44gGswTYsrksbu6xUUvYrbkuQlWImC4U337CAgKpp4Q/m",
    //     "role": "USER",
    //     "cart": {},
    //     "__v": 0
    //     }
    // }
   // {
    //     "data": {
    //     "_id": "64a490b8d4564a1df4c27e36",
    //     "first_name": "orquera10",
    //     "last_name": "user",
    //     "email": "orquera10@gmail.com",
    //     "age": 18,
    //     
    //     "role": "USER",
    //     "cart": {},
    //     "__v": 0
    //     }
    // }
    constructor(user) {
        const updateUser = user;
        delete updateUser.password;
        Object.assign(this, updateUser);
    }
}

export class GetUserDto {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}`;
        this.email = user.email;
        this.role = user.role;
    }
}

export const DTOs = {
    UserDto,
    GetUserDto
}