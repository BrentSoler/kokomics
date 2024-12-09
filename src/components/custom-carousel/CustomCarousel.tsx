import getQueryClient from "@/utils/queries/getQueryClient";
import { Carousel, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { useGetComicsByCategories } from "@/utils/queries/useGetComicsByCategory";
import { Suspense } from "react";
import CarouselLoading from "./CarouselLoading";
import CustomCarouselContent from "./CustomCarouselContent";

export default async function CustomCarousel() {
    const queryClient = getQueryClient();
    queryClient.prefetchQuery(useGetComicsByCategories({ category: "newest" }));
    const dehydratedState = dehydrate(queryClient);

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
