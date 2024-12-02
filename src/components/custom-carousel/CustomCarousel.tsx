import { TComics } from "@/types/comics/TComics";
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import CutomCarouselItem from "./CutomCarouselItem";

export default function CustomCarousel({ comics }: { comics?: TComics[] }) {
    return (
        <Carousel className="w-[50vw]">
            <CarouselContent>
                <CutomCarouselItem />
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
