class UserController {
    constructor(userService) {
        if (UserController.instance) {
            return UserController.instance;
        }
        this.userService = userService;
        UserController.instance = this;
    }

    async register(req, res) {
        try {
            const userData = req.body;

            const response = await this.userService.createUser(userData);

            return res.status(response.status).json(response);

        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async update(req, res) {
        try {
            const userData = req.body;

            const success = await this.userService.updateUser(userData);

            if (success) {
                return res.status(201).json({ message: 'User updated successfully' });
            } else {
                return res.status(400).json({ message: 'User update failed' });
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUserPassword(req, res) {
        try {
            const body = req.body;
            const id = req.params.id;

            const success = await this.userService.updateUserPassword(id, body.password);

            if (success) {
                return res.status(201).json({ message: 'User password updated successfully' });
            } else {
                return res.status(400).json({ message: 'User password update failed' });
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAllUsers(req, res) {
        try {

            const users = await this.userService.getAllUsers();
            if (users) {
                return res.status(200).json(users);
            } else {
                return res.status(200).json([]);
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getUserById(req, res) {
        try {

            const id = req.params.id;

            const user = await this.userService.getUserById(id);

            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({message: 'User not found'});
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteUserById(req, res) {
        try {
            
            const id = req.params.id;

            const success = await this.userService.deleteUserById(id);

            if (success) {
                return res.status(201).json({ message: 'User deleted successfully' });
            } else {
                return res.status(400).json({ message: 'User delete failed' });
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;
