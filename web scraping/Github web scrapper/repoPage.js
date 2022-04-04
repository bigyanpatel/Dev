const request = require("request");
const cheerio = require("cheerio");
const getIssuesHtml = require("./issues");

function getRepospageHtml(url, topic){
    request(url, db);

    function db(err, response, html) {
        if (err) {
            console.log(err);
        } else if(response.statusCode == 404){
            console.log("page not found");
        } else {
            // console.log(html);
            getTopicLinks(html);
        }
    }

    function getTopicLinks(html){
        let $ = cheerio.load(html);
        let headingsArr = $(".text-bold.wb-break-word");
        // console.log(topic);
        for(let i = 0; i < 8; i++){
            let link = $(headingsArr[i]).attr("href");
            let fullLink = `https://github.com${link}/issues`;
            let repoName = link.split("/").pop();
            // console.log(fullLink);
            getIssuesHtml(fullLink, topic, repoName);
        }
        // console.log("-----------------------------------")
    }
    
    // getIssuesLink()
}

module.exports = getRepospageHtml;
