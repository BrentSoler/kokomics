import { TComicIssueSearch } from "@/types/comics/TComics";
import { scrapper } from "@/utils/scrapper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body: TComicIssueSearch = await req.json();

    const comic_issue = await scrapper(async (page) => {
        await page.waitForSelector("#selectReadType");
        await page.click("#selectReadType");
        await page.select("#selectReadType", "1");

        await page.waitForSelector("#divImage");
        await page.waitForSelector('img[src*="/Content/images/blank.gif"]', {
            hidden: true,
        });

        const get_issue = await page.evaluate(() => {
            document.body.scrollIntoView(false);
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
    }, `${process.env.NEXT_PUBLIC_COMIC_URL}${body.href}`);

    return Response.json({ issue: comic_issue });
}
