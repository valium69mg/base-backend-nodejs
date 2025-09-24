const { getPool } = require('../../config/database');
const {querySuccess} = require('../utils/utils.js')

class UserRepository {
    constructor(pool) {
        if (UserRepository.instance) {
            return UserRepository.instance;
        }
        this.pool = pool;
        UserRepository.instance = this;
    }

    async createUser(user) {
        const [result] = await this.pool.query(`INSERT INTO users (name, last_name, email, password, created_at)
            VALUES (?, ?, ?, ?, ?)`, [user.name, user.lastName, user.email, user.password, user.createdAt])
        return querySuccess(result.affectedRows);
    }

    async updateUser(user) {
        const [result] = await this.pool.query(
            `UPDATE users SET 
            name = ?, 
            last_name = ?, 
            email = ? 
            WHERE id = ?`,
            [user.name, user.lastName, user.email, user.id]
        );

        return querySuccess(result.affectedRows);
    }


    async getAllUsers() {
        const [rows] = await this.pool.query("SELECT * FROM users");
        return rows;
    }

    async getUserById(id) {
        const [rows] = await this.pool.query("SELECT * from users WHERE id = ?", [id])
        return rows[0] || null;
    }

    async deleteUserById(id) {
        const [result] = await this.pool.query("DELETE FROM users WHERE id = ?", [id]);
        return querySuccess(result.affectedRows);
    }

}

module.exports = UserRepository;