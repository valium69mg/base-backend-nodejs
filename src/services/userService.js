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
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if (existingUser != null) { // user exists
            return {status: 400, message: "User already exists"};
        }
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        user.createdAt = new Date();
        let success = await this.userRepository.createUser(user);
        if (success) {
            return {status: 200, message: "User registered succesfully"};;
        }
        return {status: 500, message: "User could not be saved"};
    }

    async updateUser(user) {
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if (existingUser != null && user.id != existingUser.id) { // user exists and is not the same
            return false;
        }
        let success = await this.userRepository.updateUser(user);
        return success;
    }

    async updateUserPassword(id, password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        password = hashedPassword;
        let success = await this.userRepository.updateUserPassword(id, password);
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