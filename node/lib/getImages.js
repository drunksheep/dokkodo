const puppeteer = require('puppeteer');
const domHandling = require('./domHandling');

async function getImages(url = "") {

    // initial settings
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    // meat and potatoes
    const eval = await page.evaluate(() => {
        let emptyArr = [];

        let input = document.querySelector('input');
        let imgs = document.querySelectorAll('img');
        let bgs = document.querySelectorAll('[style*="background-image');
        let elems = new Set([
            ...imgs,
            ...bgs
        ])
    
        elems.forEach(el => {
            if (el.nodeName == "IMG") {
                emptyArr.push(el.src);
            } else {
                let style = el.currentStyle || window.getComputedStyle(el, false);
                emptyArr.push(style.backgroundImage.slice(4, -1).replace(/"/g, ""))
            }
        })

        return emptyArr; 
    });

    // page closing
    await page.close();
    await browser.close();

    // console.log('close');

    return eval;
};

module.exports = getImages;