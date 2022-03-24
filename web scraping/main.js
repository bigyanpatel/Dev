const url = "https://www.espncricinfo.com/series/ipl-2021-1249214"

// venue    date    opponent result run balls four sixes str. Rate

const request = require("request");
const cheerio = require("cheerio");

// home page -> all mathces -> find out all urls -> details -> check folders of player name ->

// home page
request(url, (err, response, html) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(html);
            extractLink(html);
        }
    });

function extractLink(html){
    let $ = cheerio.load(html);
    let anchorElem = $("a[data-hover='View All Results']");
    let link = anchorElem.attr("href");
    // console.log(link);
    let fullLink = "https://www.espncricinfo.com" + link;
    // console.log(fullLink);
    getAllMatchesLink(fullLink);

}

function getAllMatchesLink(url){
    request(url, (err, response, html) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(html);
                extractAllLinks(html);
            }
        });
    
}

function extractAllLinks(html){
    let $ = cheerio.load(html);
    let scorecardElems = $("a[data-hover='Scorecard']");
    for(let i = 0; i < scorecardElems.length; i++){
        let link = $(scorecardElems[i]).attr("href");
        console.log(link);
    }
}
