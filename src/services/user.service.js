import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";

class UserService {
    async getUsers(filters = null) {

        if (!filters) {
            return await userRepository.getAll();
        }
        return await userRepository.getByOneSearchTerm(filters);
    }

    async getUserById(user_id) {
        const user = await userRepository.getById(user_id);
        if (!user) {
            throw new ServerError(`User with ID ${user_id} not found`, 404);
        }
        return user;
    }

    async deleteUser(userId) {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ServerError(`User with ID ${userId} not found`, 404);
        }
        return await userRepository.softDeleteById(userId);
    }
}

const userService = new UserService();
export default userService;
