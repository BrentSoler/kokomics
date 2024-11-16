import { TComics } from "@/types/comics/TComics";
import puppeteer from "puppeteer";

export async function GET() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://readcomiconline.li/");

    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector("#tab-mostview");

    const get_popular: TComics[] = await page.evaluate(() => {
        const popular = document.getElementById("tab-mostview");

        //makes sure there is a #tab-mostview el
        if (!popular) return [];

        const popChild: TComics[] = Array.from(popular?.children).map((el) => {
            return {
                title: el.querySelector("a.title > span")?.textContent ?? "",
                img: el.querySelector("a > img")?.getAttribute("src") ?? "",
                href: el.querySelector("a")?.getAttribute("href") ?? "",
            };
        });

        // removes the more... element freom the child
        popChild.pop();

        return popChild;
    });
    await browser.close();

    return Response.json({ comics: get_popular });
}
