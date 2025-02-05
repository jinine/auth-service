import pool from "../util/db";
import { ComparePassword } from "../util/hash";
import jwt from "jsonwebtoken";

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = result.rows[0];
    const isPasswordValid = await ComparePassword(password, user.encrypted_pass);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "your_secret_key", { expiresIn: "1h" });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



export const change_password = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const user: any = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const foundUser = user.rows[0];

    const isPasswordValid = await ComparePassword(password, foundUser.encrypted_pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: foundUser.id,
        username: foundUser.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
