import { TComics } from "@/types/comics/TComics";
import { scrapper } from "@/utils/scrapper";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const viewType = req.nextUrl.pathname.split("/")[3];

    const scrapped = await scrapper(async (page) => {
        const get_view: TComics[] = await page.evaluate((view: string) => {
            const popular = document.getElementById(`tab-${view}`);

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
        }, viewType);

        return get_view;
    });

    return Response.json({ comics: scrapped });
}