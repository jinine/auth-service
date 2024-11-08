import pool from "../util/db";
import { hash_password } from "../util/hash";

export const create_user = async (req: any, res: any) => {
  const {
    username,
    email,
    first_name,
    last_name,
    clean_password,
    profile_picture_url,
  } = req.body;

  if (!username || !email || !first_name || !last_name || !clean_password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const password = await hash_password(clean_password);
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
        new Date(),
      ]
    );

    if (result.rows.length === 0) {
      return res.status(500).json({ message: "User creation failed." });
    }

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Registration Error:", error);

    if (error.code === "23505") {
      return res.status(409).json({ message: "User already exists." });
    }

    return res.status(500).json({ message: "Internal server error." });
  }
};

export const get_user = async (req: any, res: any) => {
  const { username } = req.body;
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1;`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(500).json({ message: "User Not Found." });
    }

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Fetch error", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const update_password = async (req: any, res: any) => {
  const { username, password } = req.body;
  try {
    const new_password = await hash_password(password);
    await pool.query(
      `UPDATE users
       SET encrypted_pass = $1
       WHERE username = $2
       RETURNING *;
      `,
      [new_password, username]
    );
    return res.status(201).json({message: "password updated successfully."});
  } catch (error) {
    console.error("Update password error", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
