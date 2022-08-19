import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import cors from "cors";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const app = express();
app.use(cors());

app.get("/mlb-mvps", async (req, res) => {
  let retVal = {};
  try {
    const query = "SELECT * FROM MVPS";
    const [rows] = await connection.query(query);
    retVal.data = rows;
    res.json(retVal);
  } catch (err) {
    console.error(err);
    res.status(status).json();
  }
});

app.get("/mlb-mvps/:year", async (req, res) => {
  let year = req.params.year;
  let retVal = {};
  try {
    const query = `SELECT * FROM MVPS WHERE year=${year}`;
    const [rows] = await connection.query(query);
    retVal.data = rows;
    res.json(retVal);
  } catch (err) {
    console.error(err);
    res.status(status).json();
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("App is running");
});
