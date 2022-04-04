const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const pdfkit = require("pdfkit");

function getIssuesHtml(url, topic, repoName){
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if(response.statusCode == 404){
            console.log("page not found");
        } else {
            // console.log(html);
            // getIssuesLinks(html);
            getIssues(html);
        }
    }

    function getIssues(html){
        let $ = cheerio.load(html);
        let issuesElem = $(".d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0");
        let arr = [];
        for(let i = 0; i < issuesElem.length; i++){
            let link = $(issuesElem[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        // console.log(arr);
        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        // fs.writeFileSync(filePath, text);
    }
}
module.exports = getIssuesHtml;
function dirCreator(folderPath){
    if(fs.existsSync(folderPath) ==  false){
        fs.mkdirSync(folderPath);
    }
}