const puppeteer = require("puppeteer");
let page;


const browserOpenPromise = puppeteer.launch({
    headless : false,
    slowMo : true,
    defaultViewport : null,
    args: ["--start-maximized"]
});
browserOpenPromise
    .then(function(browser){
        //currently opened tab
       const pageArrPromise = browser.pages();
       return pageArrPromise ;
    }).then(function(browserPages){
        page = browserPages[0];
        let gotoPromise = page.goto("https://www.google.com/");
        return gotoPromise;
    }).then(function(){
        // waiting for element to open on the page
        let elementWaitPromise = page.waitForSelector("input[type='text']", {visible : true});
        return elementWaitPromise;
    }).then(function(){
        // type any element on that page -> selector
        // console.log("Reached google page");
        let keysWillBeSendPromise = page.type("input[type='text']","pepcoding");
        return keysWillBeSendPromise;
    }).then(function(){
        // page.keyboard to type special character
        let enterWillBePressed = page.keyboard.press("Enter");
        return enterWillBePressed;
    }).then(function(){
        let elementWaitPromise = page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md", {visible : true});
        return elementWaitPromise;
    }).then(function(){
        let keysWillBeSendPromise = page.click("h3.LC20lb.MBeuO.DKV0Md");
        return keysWillBeSendPromise;
    })
    .catch(function(err){
        // incase any function does not execute it will handle it
        console.log(err);
    })