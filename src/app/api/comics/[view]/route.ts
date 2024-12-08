import { TComics } from "@/types/comics/TComics";
import endpoint from "@/utils/endpoint";
import { scrapper } from "@/utils/scrapper";
import { NextRequest } from "next/server";

const comics = new Map<string, TComics[]>([]);

export async function GET(req: NextRequest) {
    return endpoint(async () => {
        const viewType = req.nextUrl.pathname.split("/")[3];

        if (!comics.has(viewType)) {
            comics.set(viewType, []);
        }

        if (comics.get(viewType)?.length === 0) {
            const scrapped = await scrapper(async (page) => {
                await page.waitForSelector(`#tab-${viewType}`);

                const get_view: TComics[] = await page.evaluate((view: string) => {
                    const popular = document.getElementById(`tab-${view}`);

                    if (!popular) return [];

                    const popChild: TComics[] = Array.from(popular?.children).map(
                        (el) => {
                            return {
                                title: el.querySelector("a.title > span")?.textContent ?? "",
                                img: el.querySelector("a > img")?.getAttribute("src") ?? "",
                                href: el.querySelector("a")?.getAttribute("href") ?? "",
                            };
                        },
                    );

                    popChild.pop();

                    return popChild;
                }, viewType);

                comics.set(viewType, get_view);
                return get_view;
            });

            return Response.json({
                messege: "Success",
                isCached: false,
                data: scrapped,
            });
        }

        return Response.json({
            messege: "Success",
            isCached: true,
            data: comics.get(viewType),
        });
    });
}

export async function PUT(req: NextRequest) {
    return endpoint(async () => {
        const viewType = req.nextUrl.pathname.split("/")[3];

        await scrapper(async (page) => {
            await page.waitForSelector(`#tab-${viewType}`);

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

            comics.set(viewType, get_view);
            return get_view;
        });

        return Response.json({
            messege: "Success",
            isCached: true,
            data: comics.get(viewType),
        });
    });
}
