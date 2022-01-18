#!/usr/bin/env node
let fs = require('fs');
const { toNamespacedPath } = require('node:path/posix');

// input
let inputArr = process.argv.slice(2);

// options 
let optionsArr = [];
let filesArr = [];

//identify options
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == '-') {
        optionsArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);
    }
}

// options check
let isBothPresent = optionsArr.includes("-b") && optionsArr.includes("-n");
if (isBothPresent) {
    console.log("either enter -n or -b options");
    return;
}

//existence
for (let i = 0; i < filesArr.length; i++) {
    let isPresent = fs.existsSync(filesArr[i]);
    if (isPresent == false) {
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
}

// read
let content = "";
for (let i = 0; i < filesArr.length; i++) {
    let bufferCount = fs.readFileSync(filesArr[i]);
    content += bufferCount + "\n";
}

let contentArr = content.split("\r\n");


// -s
let isSPresent = optionsArr.includes("-s");
if (isSPresent == true) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == '' && contentArr[i - 1] == '') {
            contentArr[i] = null;
        } else if (contentArr[i] == '' && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }

    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

// -n
let isNPresent = optionsArr.includes("-n");
if (isNPresent == true) {
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = `${i + 1} ${contentArr[i]}`;
    }
}

// -b
let isBPresent = optionsArr.includes("-b");
if (isBPresent == true) {
    let counter = 1;
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            // contentArr[i] = `${i + 1} ${contentArr[i]}`;
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}

console.log(contentArr.join("\n"));