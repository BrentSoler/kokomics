import { TComicLists } from "@/types/comics/TComics";
import { scrapper } from "@/utils/scrapper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: TComicLists = await req.json();

    const get_lists = await scrapper(async (page) => {
        await page.waitForSelector(".listing");

        const get_list: TComicLists[] = await page.evaluate(() => {
            const table = document.getElementsByClassName("listing");

            if (!table) return [];

            const lists: TComicLists[] = Array.from(table[0]?.children[0].children)
                .slice(2)
                .map((el) => {
                    return {
                        title: el.querySelector("a")?.textContent?.trim() ?? "",
                        href: el.querySelector("a")?.getAttribute("href") ?? "",
                    };
                });

            return lists;
        });

        return get_list;
    }, `${process.env.NEXT_PUBLIC_COMIC_URL}${body.href}`);

    return Response.json({ comics: get_lists });
}
