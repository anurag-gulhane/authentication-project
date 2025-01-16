"use Strict";
//IMPORTING
import "dotenv/config";
import express from "express";
import cors from "cors";
import pkg from "pg";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import cookieParser from "cookie-parser";

//REQUIRING
const app = express();
const { Client } = pkg;
const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//SETTING UP DB
const DB = new Client({
  host: "localhost",
  user: "postgres",
  password: "password",
  port: 5432,
  database: "signup",
});

DB.connect()
  .then(() => console.log("Connected to the database successfully!"))
  .catch((error) => console.error("Database connection error:", error));

//user register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "All Fields are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT);

    // Insert user into the database
    const result = await DB.query(
      "INSERT INTO login (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword] // Use parameterized queries to prevent SQL injection
    );

    res.status(201).json({
      message: "User registered successfully!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "Email and password are required",
    });
  }

  try {
    const result = await DB.query("SELECT * FROM login WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Port is running.....on ${PORT}`);
});
