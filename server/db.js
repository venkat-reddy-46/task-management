import dotenv from 'dotenv';
import pg from "pg";

dotenv.config();
  
  export const pool = new pg.Pool({
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });
  
  pool.on("connect", () => {
    console.log("Database connected");
  });