import axios from "axios";
import cheerio from "cheerio";
import mysql from "mysql";

const connectionString = process.env.DATABASE_URL || "";
const connection = mysql.createConnection(connectionString);
connection.connect();

const mvpValues = ($) => $("#mvp").find("tbody > tr");

let mvpNumbers = [];

axios
  .get("https://www.baseball-reference.com/awards/mvp.shtml")
  .then(({ data }) => {
    const $ = cheerio.load(data);
    mvpValues($).each((i, el) => {
      let arr = [];
      arr.push($(el).find("th").text());
      $(el)
        .find("td")
        .each((i, value) => {
          arr.push($(value).text());
        });
      if (arr[0] !== "") {
        mvpNumbers.push(arr);
      }
    });
    mvpNumbers.forEach((el, i) => {
      el.unshift(i + 1);
    });

    const sql =
      "INSERT INTO MVPS (id, year, league, name, team, war, battingAverage, onBasePercentage, slugging, homerun, rbi, stolenBase, wins, losses, saves, era, innings, strikeouts) VALUES ?";
    connection.query(sql, [mvpNumbers], (err) => {
      if (err) {
        console.log(err);
        console.error("didn't work");
      } else {
        console.log("DB is populated");
      }
    });
  });
