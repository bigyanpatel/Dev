const { BADHINTS } = require("dns");
const puppeteer = require("puppeteer");
const codeObj = require("./codes");

const loginLink = 'https://www.hackerrank.com/auth/login';
const userName = 'bigyanpatel07769';
const password = 'bigyan2022#';

let browserOpen = puppeteer.launch({
    headless : false,
    args : ['--start-maximize'],
    defaultViewport : null
});
let page;
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab;
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(function(){
    let emailEntered = page.type("input[id='input-1']", userName, {delay : 50});
    return emailEntered;
}).then(function(){
    let passwordEntered = page.type("input[type='password']", password, {delay : 50});
    return passwordEntered;
}).then(function(){
    let loginButtonClick = page.click('button[data-analytics="LoginPassword"]', {delay : 50});
    return loginButtonClick;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1 = "algorithms"]', page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmup = waitAndClick('input[value="warmup"]', page);
    return getToWarmup;
}).then(function(){
    let waitFor3Secs = page.waitFor(3000);
    return waitFor3Secs;
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay : 50});
    return allChallengesPromise;
}).then(function(quesArr){
    // console.log('number of questions', quesArr.length);
    let questionWillBeSolved = questionSolver(page, quesArr[0], codeObj.answers[0]);
    return questionWillBeSolved;
})



function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}


function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function(){
            let EdtitorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return EdtitorInFocusPromise;
        }).then(function(){
            return waitAndClick('.css-19bqh2r', page);
        }).then(function(){
            return page.type('.css-19bqh2r', "java 15");
        }).then(function(){
            return page.keyboard.press('Enter');
        }).then(function(){
            return waitAndClick('.checkbox-input', page);
        }).then(function(){
            return page.waitForSelector('textarea.custominput', page);
        }).then(function(){
            return page.type('textarea.custominput', answer, {delay : 1})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed = page.keyboard.press('A', {delay : 100});
            return aIsPressed;
        }).then(function(){
            let xIsPressed = page.keyboard.press('X', {delay : 100});
            return xIsPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return mainEditorInFocus;
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let aIsPressed = page.keyboard.press('A', {delay : 100});
            return aIsPressed;
        }).then(function(){
            let vIsPressed = page.keyboard.press('V', {delay : 100});
            return vIsPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function(){
            return waitAndClick('button.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', page);
        })
    })
}