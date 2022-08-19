import puppeteer from "puppeteer";
import mysql from "mysql";
import cheerio from "cheerio";
import axios from "axios";

const connectionString = process.env.DATABASE_URL || "";
const connection = mysql.createConnection(connectionString);
connection.connect();

async function getUrls() {
  try {
    const URL = "https://www.baseball-reference.com/awards/mvp.shtml";
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(URL);
    await page.waitForSelector(`#mvp > tbody`, { timeout: 3000 });

    let playerUrls = await page.evaluate(async () => {
      let playerUrls = [];
      // needs to be 331 for 2021 mvps
      for (let i = 1; i < 331; i++) {
        let playerUrl = document.querySelectorAll(
          `#mvp > tbody > tr:nth-child(${i}) > td:nth-child(3) > a`
        );
        if (playerUrl.length > 0) {
          playerUrls.push(playerUrl[0].href);
        }
      }
      return playerUrls;
    });
    await playerUrls.forEach(async (url, i) => {
      // To seed Profile comment out image code and change sql from img to profile and image to url
      let image = await axios.get(url).then(async ({ data }) => {
        const $ = await cheerio.load(data);
        let image = await $(
          `#meta > div.media-item.multiple > img:nth-child(1)`
        );
        if (image.attr("src") === undefined) {
          image = await $(`#meta > div.media-item > img`);
        }
        return await image.attr("src");
      });
      const sql = `UPDATE MVPS SET img = "${image}" profile = "${url} WHERE id = ${
        i + 1
      }`;
      connection.query(sql, (err) => {
        if (err) {
          console.log(err);
          console.error("didn't work");
        } else {
          console.log(i + "Image is populated");
        }
      });
    });
    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

getUrls();
