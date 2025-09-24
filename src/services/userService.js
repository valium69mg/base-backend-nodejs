const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {

    constructor(userRepository) {
        if (UserService.instance) {
            return UserService.instance;
        }
        this.userRepository = userRepository;
        UserService.instance = this;
    }

    async createUser(user) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        user.createdAt = new Date();
        let success = await this.userRepository.createUser(user);
        return success;
    }

    async updateUser(user) {
        let success = await this.userRepository.updateUser(user);
        return success;
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(id) {
        return await this.userRepository.getUserById(id);
    }

    async deleteUserById(id) {
        let success = await this.userRepository.deleteUserById(id);
        return success;
    }

}

module.exports = UserService;