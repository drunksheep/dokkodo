import puppeteer from 'puppeteer';
import headlessDOMHandling from "./headlessDOMHandling";

export default async function getImages(url : string = "") {

    // initial settings
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    // https://pptr.dev/guides/evaluate-javascript/
    const evaluate = await page.evaluate(() => {
        return headlessDOMHandling()
    });

    // page closing
    await page.close();
    await browser.close();

    return evaluate;
};
