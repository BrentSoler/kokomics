import { TComics } from "@/types/comics/TComics";
import { scrapper } from "@/utils/scrapper";

export async function GET() {
    const get_popular = await scrapper(async (page) => {
        // await page.waitForSelector("#tab-mostview");

        const get_popular: TComics[] = await page.evaluate(() => {
            const popular = document.getElementById("tab-mostview");

            if (!popular) return [];

            const popChild: TComics[] = Array.from(popular?.children).map((el) => {
                return {
                    title: el.querySelector("a.title > span")?.textContent ?? "",
                    img: el.querySelector("a > img")?.getAttribute("src") ?? "",
                    href: el.querySelector("a")?.getAttribute("href") ?? "",
                };
            });

            popChild.pop();

            return popChild;
        });

        return get_popular;
    });

    return Response.json({ comics: get_popular });
}
