import { TComics, TComicSearch } from "@/types/comics/TComics";
import { scrapper } from "@/utils/scrapper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: TComicSearch = await req.json();

    const get_search = await scrapper(async (page) => {
        await page.type("#keyword", body.title);

        await page.click("#imgSearch");

        const get_result: TComics[] = await page.evaluate(async () => {
            const searched =
                document.getElementsByClassName("list-comic") ||
                document.getElementsByClassName("list-comic");

            if (!searched) return [];

            await new Promise<void>((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                let scrolls = 0;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    scrolls++;
                    if (
                        totalHeight >= scrollHeight - window.innerHeight ||
                        scrolls >= searched[0].children.length / 20
                    ) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });

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
