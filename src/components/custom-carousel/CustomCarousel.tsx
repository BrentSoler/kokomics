import { Carousel, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { HydrationBoundary } from "@tanstack/react-query";
import { GetComicsByCategories } from "@/utils/queries/useGetComicsByCategory";
import { Suspense } from "react";
import CarouselLoading from "./CarouselLoading";
import CustomCarouselContent from "./CustomCarouselContent";
import HydrateQuery from "@/utils/queries/HydrateQuery";

export default async function CustomCarousel() {
    const dehydratedState = HydrateQuery(
        GetComicsByCategories({ category: "newest" }),
    );

    return (
        <HydrationBoundary state={dehydratedState}>
            <Carousel className="w-[60vw]">
                <Suspense fallback={<CarouselLoading />}>
                    <CustomCarouselContent />
                </Suspense>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </HydrationBoundary>
    );
}
