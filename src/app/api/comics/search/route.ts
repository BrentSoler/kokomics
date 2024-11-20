import { TComics, TComicSearch } from "@/types/comics/TComics";
import { autoScroll, scrapper } from "@/utils/scrapper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: TComicSearch = await req.json();

    const get_search = await scrapper(async (page) => {
        await page.type("#keyword", body.title);

        await page.click("#imgSearch");

        await page.waitForSelector(".list-comic");
        await autoScroll(page);

        const get_result: TComics[] = await page.evaluate(() => {
            const searched = document.getElementsByClassName("list-comic");

            if (!searched) return [];

            const result: TComics[] = Array.from(searched[0]?.children).map((el) => {
                return {
                    title: el.querySelector("span.title")?.textContent ?? "",
                    img: el.querySelector("a > img")?.getAttribute("src") ?? "",
                    href: el.querySelector("a")?.getAttribute("href") ?? "",
                };
            });

            return result;
        });

        return get_result;
    });

    return Response.json({ comics: get_search });
}
