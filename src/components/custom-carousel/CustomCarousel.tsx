"use client";

import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import CarouselLoading from "./CarouselLoading";
import CutomCarouselItem from "./CutomCarouselItem";
import { useGetComicsByCategories } from "@/utils/queries/useGetComicsByCategory";

export default function CustomCarousel() {
    const { data, isLoading } = useGetComicsByCategories("newest");

    return isLoading ? (
        <CarouselLoading />
    ) : (
        <Carousel className="w-[60vw]">
            <CarouselContent>
                {data?.map((comic) => (
                    <CutomCarouselItem key={comic.href} comic={comic} />
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
