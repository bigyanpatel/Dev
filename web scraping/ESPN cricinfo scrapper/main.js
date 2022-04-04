const url = "https://www.espncricinfo.com/series/ipl-2021-1249214"
const fs = require("fs");
const path = require("path");
// venue    date    opponent result run balls four sixes str. Rate
const request = require("request");
const cheerio = require("cheerio");
const AllMatchObj =require("./allMatches");
// home page
const iplPath = path.join(__dirname, "ipl");
dirCreator(iplPath);
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
    AllMatchObj.gAllMathces(fullLink);

}

function dirCreator(filePath){
    if(fs.exitsSync(filePath)== false){
        fs.mkdirSync(filePath);
    }
}