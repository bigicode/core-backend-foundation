const pool = require('../../config/database');

class UserRepository{
    async create(email, hashedPassword, role = 'user'){
        const [result] = await pool.execute(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email,hashedPassword, role]
        );
        return result.insertId;
    }

     async findByEmail(email){
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows [0] || null
     }

     async updateAvatar(userId, avatarPath){
        const [ result ] = await pool.execute(
            'UPDATE users SET avatar = ? WHERE id = ?',
            [avatarPath, userId] 
        );

        return result.affectedRows > 0;
     }
}

module.exports = new UserRepository()