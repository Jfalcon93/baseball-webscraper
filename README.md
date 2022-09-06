## baseball-webscraper

Baseball webscraper created to seed a database of MVPs.

Thanks to the MLB for denying me api access, I needed a way to collect MLB data to create web apps related to baseball (which I don't even really care about lolol).

MVP data contains relevant stats, link to their baseball reference profile, and link to image.

I started out using Cheerio to webscrape but needed to visit links so I installed Puppeteer. Come to find out I'm a silly billy 🤪 and I didn't need to vist links. I could just compile them all in an array and individually go out to collect images. I gathered my player urls using puppeteer and used cheerio to visit profiles and get images. This can all be done using just cheerio. I KNOW. I'll rewrite it in the future! 😭😭😭

My databases are properly seeded. I'm GOOD.

Not being used for money, profit, etc.. blah blah blah just using for fun :)

### How to Use

I'd love to teach all of you how to do this but it's probably best for me to just leave it as it is. Why does anyone else need to know?? Don't you know you SHOULDN'T be doing this?????

Learn planetscale shit and comeback.

All you need to know is that in its current state, you have to run two different scripts separately as well as connect to your planetscale database instance. Here's a rough tutorial, maybe you can figure it out.

`npm install`

`pscale connect <DATABASE_NAME> <BRANCH_NAME> --exceute 'node seed:mvp.js'` - Seeds initial data

`pscale connect <DATABASE_NAME> <BRANCH_NAME> --execute 'node index.js'` - Adds images and profiles

You will need to ctl + c to cancel the seeding before running the images and profiles.

To run the server

`pscale connect <DATABASE_NAME> <BRANCH_NAME> --execute 'node app.js'`

### Future Fixes

- Fix update scripts to only use cheerio instead of this weird polymerization summoned monster we're using now.
- Seeding script can probably handle everything instead of having to run two different scripts.
- Properly name files. Why is there an index.js that isn't truly the index???
