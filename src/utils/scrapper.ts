import puppeteer, { Page } from "puppeteer";

export async function scrapper<T>(cb: (page: Page) => T, url?: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url ? url : process.env.NEXT_PUBLIC_COMIC_URL ?? "");

    await page.setViewport({ width: 1080, height: 1024 });

    const cb_return = await cb(page);

    await browser.close();

    return cb_return;
}
