import puppeteer, { Page } from "puppeteer";

export async function scrapper<T>(cb: (page: Page) => T, url?: string) {
    const browser = await puppeteer.launch({
        devtools: false,
        headless: false,
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (req) => {
        if (
            req.resourceType() === "stylesheet" ||
            req.resourceType() === "font" ||
            req.resourceType() === "image"
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.goto(url ? url : process.env.NEXT_PUBLIC_COMIC_URL ?? "");

    await page.setViewport({ width: 1080, height: 1024 });

    try {
        const cb_return = await cb(page);

        await page.close();

        await browser.close();

        return cb_return;
    } catch (err) {
        await page.close();

        await browser.close();
    }
}

export async function autoScroll(page: Page) {
    await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
