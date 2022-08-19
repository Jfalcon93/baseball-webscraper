## baseball-webscraper

Baseball webscraper created to seed a database of MVPs to build app.

Thanks to the MLB being so stringent with their api access, I needed a way to collect MLB data to create web apps related to baseball (which I don't even really care about lolol).

MVP data contains relevant stats, link to their baseball reference profile, and link to image.

I started out using Cheerio to webscrape but needed to visit links so I installed Puppeteer. Come to find out I'm a silly billy and I didn't need to vist links. I could just compile them all in an array and individually go out to them to collect images. I gathered my player urls using puppeteer and used cheerio to visit profiles and get images. This can all be done using just cheerio. I KNOW. I'll rewrite it in the future! 😭😭😭

Not being used for money, profit, etc.. blah blah blah just using for fun :)
