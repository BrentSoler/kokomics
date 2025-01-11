import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { GetComicsByCategories } from "@/utils/queries/useGetComicsByCategory";
import Link from "next/link";
import HydrateQuery from "@/utils/queries/HydrateQuery";

export default function LandingLayout({ state }: { state: string }) {
    const dehydratedState = HydrateQuery(
        GetComicsByCategories({ category: state }),
    );

    return (
        <div className="flex gap-2 mt-3 h-full">
            <div className="flex flex-col gap-3 ">
                <Link href="/" className="w-full h-[3rem]">
                    <Button
                        className="w-full h-full justify-end"
                        variant={state !== "mostview" ? "ghost" : "default"}
                    >
                        Most Viewed
                    </Button>
                </Link>
                <Link href="/top-day" className="w-full h-[3rem]">
                    <Button
                        className="w-full h-full justify-end"
                        variant={state !== "top-day" ? "ghost" : "default"}
                    >
                        Top Comics Today
                    </Button>
                </Link>
                <Link href="/top-week" className="w-full h-[3rem]">
                    <Button
                        className="justify-end h-full w-full"
                        variant={state !== "top-week" ? "ghost" : "default"}
                    >
                        Top Comics This Week
                    </Button>
                </Link>
                <Link href="/top-month" className="w-full h-[3rem]">
                    <Button
                        className="justify-end h-full w-full"
                        variant={state !== "top-month" ? "ghost" : "default"}
                    >
                        Top Comics This Month
                    </Button>
                </Link>
            </div>
            <Separator orientation="vertical" className="h-[16rem]" />
            <div></div>
        </div>
    );
}
