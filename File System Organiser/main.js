#!/usr/bin/env node
const { dir } = require("console");
let fs = require("fs");
let path = require("path");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
let helpObj = require("./commands/help");

let inputArr = process.argv.slice(2);

let command = inputArr[0];

let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'def'],
    document: ['doc', 'docx', 'ppt', 'pptx'],
    images: ['jpeg', 'jpg']

}

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey(inputArr[1]);
        break;
    default:
        console.log("Please🙏 input a correct format");
}
