import pool from '../util/db';
import { User } from '../types/user';

export const createUser = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const { username, email, first_name, last_name, encrypted_pass, profile_picture_url } = userData;

    const result = await pool.query(
        `INSERT INTO users (username, email, first_name, last_name, encrypted_pass, profile_picture_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [username, email, first_name, last_name, encrypted_pass, profile_picture_url]
    );

    return result.rows[0];
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0] || null;
};
