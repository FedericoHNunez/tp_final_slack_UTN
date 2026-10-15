import BaseRepository from './base.repository.js';
import userModel from "../models/user.model.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(userModel, 'userName');
    }

    async create(userName, email, password) {
        const user = await this.model.create({
            userName: userName,
            email: email,
            password: password,
        });
        return user;
    }

    async getGreaterDate(max_date, min_date) {
        const usersFound = await this.model.find(
            {
                createdAt: {
                    $gt: min_date, // Mayor que min_date
                    $lt: max_date  // Menor que max_date
                }
            }
        );
        return usersFound;
    }



    async getByEmail(email) {
        const userResult = await this.model.findOne({
            email: email
        });
        return userResult;
    }

    async softDeleteById(userId) {
        await this.model.findByIdAndUpdate(
            userId,
            {
                active: false
            }
        );
    }

}

const userRepository = new UserRepository();
export default userRepository;