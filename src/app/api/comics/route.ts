import { TComicIssueSearch } from "@/types/comics/TComics";
import { autoScroll, scrapper } from "@/utils/scrapper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: TComicIssueSearch = await req.json();

    const comic_issue = await scrapper(async (page) => {
        await autoScroll(page);

        await page.waitForSelector("#divImage");

        const pg = await page.waitForSelector("#imgLoader", {
            visible: false,
        });

        const get_issue = await pg?.evaluate(() => {
            const comics = document.getElementById("divImage");

            if (!comics) return [];

            const issue = Array.from(comics.children).map((el) => {
                return {
                    img: el.querySelector("p > img")?.getAttribute("src") ?? "",
                };
            });

            return issue;
        });

        return get_issue;
    }, `${process.env.NEXT_PUBLIC_COMIC_URL}${body.href}&s=&readType=1`);

    return Response.json({ issue: comic_issue });
}
