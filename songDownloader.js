const puppeteer = require("puppeteer");
const fs = require('puppeteer');
let tab;
//let songname = "the plan";
const prompt = require('prompt-sync')();

const songname = prompt('Enter songName ');

(async function(){
    let browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args: ["--start-maximized"],
    })
    let allpages = await browser.pages();
    tab = allpages[0];
    await tab.goto("https://www.youtube.com");

    await tab.waitForSelector(`input[id="search"]`);
    await tab.waitForTimeout(1000);
    await tab.type(`input[id="search"]`,songname);
    await tab.click(`button[id="search-icon-legacy"]`);
    await tab.waitForSelector(`a[id="video-title"]`);

    let song_aTag = await tab.$(`a[id="video-title"]`);
    console.log(song_aTag);
    let songUrl = await tab.evaluate(function(elem){
        return elem.getAttribute("href");
    },song_aTag);
    songUrl = "https://www.youtube.com" + songUrl;
    console.log(songUrl);

    let newTab = await browser.newPage();
    await newTab.goto("https://ytmp3.cc/youtube-to-mp3/");
    await newTab.waitForSelector(`input[id="input"]`);
    await newTab.type(`input[id="input"]`,songUrl);
    await newTab.waitForTimeout(3000);
    await newTab.click(`input[id="submit"]`);
    await newTab.waitForSelector(`div[id="buttons"] a`);
    await newTab.waitForTimeout(3000);
    await newTab.click(`div[id="buttons"] a`);
    await newTab.waitForTimeout(15000);
    await browser.close();
    // let download_link = await newTab.$(`div[id="buttons"] a`);
    // console.log(download_link);


})();