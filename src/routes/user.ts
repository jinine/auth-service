import pool from "../util/db";
import { HashPassword } from "../util/hash";

export const createUser = async (req: any, res: any) => {
    const {
      username,
      email,
      first_name,
      last_name,
      clean_password,
      profile_picture_url,
    } = req.body;

    // Input validation
    if (!username || !email || !first_name || !last_name || !clean_password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Hash the password
      const password = await HashPassword(clean_password);
      console.log("Hashed Password:", password);

      // Insert user into the database
      const result = await pool.query(
        `INSERT INTO users (username, email, first_name, last_name, encrypted_pass, profile_picture_url, is_active, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *`,
        [
          username, 
          email, 
          first_name, 
          last_name, 
          password, 
          profile_picture_url, 
          true, 
          new Date(),
          new Date() 
        ]
      );

      // Ensure a user is created
      if (result.rows.length === 0) {
        return res.status(500).json({ message: "User creation failed." });
      }

      // Return the created user
      return res.status(201).json(result.rows[0]);
    } catch (error: any) {
      console.error("Registration Error:", error);

      // Handle specific error for unique constraint violations
      if (error.code === '23505') { 
        return res.status(409).json({ message: "User already exists." });
      }

      // General internal server error
      return res.status(500).json({ message: "Internal server error." });
    }
};
