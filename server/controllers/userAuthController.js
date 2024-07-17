import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pool } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Route to create a new user
export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userNameCheckQuery = 'SELECT * FROM users WHERE username = $1';

        const userNameResult = await pool.query(userNameCheckQuery, [username]);

        if (userNameResult.rows.length > 0) {
            return res.status(400).json({ error: "Sorry, a user with this username already exists!" });
        }

        // Generate a unique user_id using uuid
        const userId = uuidv4();

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user record in the database
        const insertUserQuery = `
            INSERT INTO users (user_id, username, password)
            VALUES ($1, $2, $3)
            RETURNING user_id
        `;
        const userResult = await pool.query(insertUserQuery, [userId, username, hashedPassword]);

        res.status(200).json({message:"user registered successfuly"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username exists
        const getUserQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await pool.query(getUserQuery, [username]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verify the password
        const storedPassword = userResult.rows[0].password;
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // User authenticated; create JWT token
        const userId = userResult.rows[0].user_id;
        const data = {
            user: {
                id: userId,
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};