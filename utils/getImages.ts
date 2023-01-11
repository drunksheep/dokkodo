import puppeteer from 'puppeteer';
import headlessDOMHandling from "./headlessDOMHandling";

export default async function getImages(url: string = "") {

    // initial settings
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    let emptyArr : Array<string> = [];

    // https://pptr.dev/guides/evaluate-javascript/
    const evaluate = await page.evaluate(() => {
        let imgs = document.querySelectorAll('img');
        let bgs = document.querySelectorAll('[style*="background-image');

        let elems = new Set([
            ...imgs,
            ...bgs
        ])

        elems.forEach((el: HTMLImageElement | HTMLDivElement | any) => {
            if (el.nodeName == "IMG") {
                console.log(el.src)
                emptyArr.push(el.src);
            } else {
                let style = el.currentStyle || window.getComputedStyle(el, false);
                emptyArr.push(style.backgroundImage.slice(4, -1).replace(/"/g, ""));
            }

        })

        return elems;
    });

    // page closing
    await page.close();
    await browser.close();

    return emptyArr;
};
