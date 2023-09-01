import { userModel } from '../dbManager/models/user.model.js';

export default class Users {
    constructor() {
        console.log('Working users with DB in mongoDB')
    }

    getAll = async () => {
        const users = await userModel.find();
        return users.map(user => user.toObject());
    }

    getByEmail = async (email) => {
        const user = await userModel.findOne({ email }).lean();
        return user;
    }

    save = async (user) => {
        const result = await userModel.create(user);
        return result;
    }

    update = async (uid, user) => {
        const result = await userModel.updateOne({ _id: uid }, user);
        return result;
    }

    getById = async (uid) => {
        const user = await userModel.findOne({ _id: uid }).lean();
        return user;
    }
}