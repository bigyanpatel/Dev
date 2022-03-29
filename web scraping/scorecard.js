const url = "https://www.espncricinfo.com/series/ipl-2021-1249214/mumbai-indians-vs-royal-challengers-bangalore-1st-match-1254058/full-scorecard"

const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

// home page
function processScorecard(url){
    request(url, (err, response, html) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(html);
            extractMatchDetails(html);
        }
    });
}

// venue    date    opponent result run balls four sixes str. Rate
function extractMatchDetails(html){
    let $ = cheerio.load(html);
    let descElem = $(".header-info .description");
    let result =$(".event .status-text");
    let stringArr = (descElem.text().split(","));
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    result = result.text();
    let innings = $(".content-block>.Collapsible");
    let htmlString = "";
    for(let i = 0; i < innings.length; i++){
        // htmlString = $(innings[i]).html();
        let teamName = $(innings[i]).find("h5").text().split("INNINGS")[0].trim();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentName = $(innings[opponentIndex]).find("h5").text().split("INNINGS")[0].trim();
        console.log(venue, date, teamName, opponentName, result);
        let cInnings = $(innings[i]);
        let allRows = cInnings.find(".table.batsman tbody tr")
        for(let j = 0 ; j < allRows.length; j++){
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("batsman-cell");
            if(isWorthy ==  true){
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
                processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result);
            }
        }
    }
    // console.log(htmlString);
}
function processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result){
    let teamPath = path.join(__dirname, "ipl", teamName);
    dirCreator(teamPath);
    let filePath = path.join(filePath, playerName + ".xlsx");
    let content = excelReader(filePath, playerName);
    let playerObj = {
        teamName,
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentName,
        venue,
        date,
        result
    }
    content.push(playerObj);
    excelWriter(filePath, content, playerName);
}

function dirCreator(filePath){
    if(fs.exitsSync(filePath)== false){
        fs.mkdirSync(filePath);
    }
}
function excelWriter(filePath, json, sheetName){
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB,newWS, sheetName);
    xlsx.writerFile(newWB, filePath);
}

function excelReader(filePath, sheetName){
    if(fs.existSync(filePath) == false){
        return [];
    }
    let wb = xlsx.readFile(filePath);
    let excelData = wb.sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}

module.exports = {
    ps :processScorecard
}