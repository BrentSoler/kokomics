"use client";

import { TComics } from "@/types/comics/TComics";
import { CarouselContent } from "../ui/carousel";
import CutomCarouselItem from "./CutomCarouselItem";
import { useGetComicsByCategories } from "@/utils/queries/useGetComicsByCategory";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function CustomCarouselContent() {
    const { data } = useSuspenseQuery(
        useGetComicsByCategories({ category: "newest" }),
    );
    return (
        <CarouselContent>
            {data?.map((comic: TComics) => (
                <CutomCarouselItem key={comic.href} comic={comic} />
            ))}
        </CarouselContent>
    );
}
