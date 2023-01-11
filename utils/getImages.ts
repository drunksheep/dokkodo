import puppeteer from 'puppeteer';
import headlessDOMHandling from "./headlessDOMHandling";

export default async function getImages(url: string = "") {

    // initial settings
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    // https://pptr.dev/guides/evaluate-javascript/
    const body = await page.evaluateHandle(() => {
       return document.body;
    });

    const results = headlessDOMHandling(body);

    // page closing
    await page.close();
    await browser.close();

    return results;
};
