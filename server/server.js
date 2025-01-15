//IMPORTING
import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

//REQUIRING
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//SETTING UP DB
const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

DB.connect();

//user register
app.post("/register", (req, res) => {});

//PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Port is running.....on ${PORT}`);
});
