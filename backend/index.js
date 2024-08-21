const puppeteer = require('puppeteer');
const fs = require('fs'); // Import the file system module


async function run() {
    const browser = await puppeteer.launch({ timeout: 0 });
    const page = await browser.newPage();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let currentDate = `${year}-${month}-${day}`;

    await page.goto(`https://www.goal.com/en-ae/live-scores`, { waitUntil: 'networkidle2' });
    // await autoScroll(page);

    
    // await page.waitForSelector('.match-list_match-list-wrapper__x3R4e');
    const data = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.competition_competition__wbjsu'), e => ({
            league: e.querySelector('.competition_name__O93QA').innerText,
            league_link: e.querySelector('.competition_name__O93QA').href,
            league_logo: e.querySelector('.competition_logo-wrapper__tejNa .competition_logo__Rvl0N').getAttribute('src'),
            match: Array.from(e.querySelectorAll(('[class="row_row__pwLvU row"]')), e => ({
                match_link: e.querySelector('a').href,
                time: e.querySelector('.start-date_start-date__8rMB6') ? e.querySelector('.start-date_start-date__8rMB6').innerText : '',
                home: e.querySelector('.team_team-a__KZ1AE .name_name__qsruk').innerText,
                home_logo: e.querySelector('.team_team-a__KZ1AE .crest.team-crest_crest__Jp9_k').getAttribute('src'),
                home_score: e.querySelector('.result_score__yfsC8 .result_team-a__jx1EM') ? e.querySelector('.result_score__yfsC8 .result_team-a__jx1EM').innerText : "",
                away: e.querySelector('.team_team-b__6xMTs .name_name__qsruk').innerText,
                away_logo: e.querySelector('.team_team-b__6xMTs .crest.team-crest_crest__Jp9_k').getAttribute('src'),
                away_score: e.querySelector('.result_score__yfsC8 .result_team-b__kNMbF') ? e.querySelector('.result_score__yfsC8 .result_team-b__kNMbF').innerText : "",
            }))
        }))
    );


    
    // data.forEach(league => {
    //     console.log(`League: ${league.league}`);
    //     league.match.forEach(match => {
    //         console.log(`Match Link: ${match.match_link}`);
    //         console.log(`Time: ${match.time}`);
    //         console.log(`Home Team: ${match.home}`);
    //         console.log(`Home Team Logo: ${match.home_logo}`);
    //         console.log(`Home Team Score: ${match.home_score}`);
    //         console.log(`Away Team: ${match.away}`);
    //         console.log(`Away Team Logo: ${match.away_logo}`);
    //         console.log(`Away Team Score: ${match.away_score}`);
    //         console.log("-------------");
    //     });
    // });
    

    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON string to a file
    fs.writeFile('scraped_data.json', jsonData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Data saved to scraped_data.json');
        }
    });
    
    await browser.close();
}

run();








