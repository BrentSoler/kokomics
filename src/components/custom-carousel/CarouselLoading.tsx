import { Card } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

export default function CarouselLoading() {
    return (
        <Carousel className="w-[80vw] ">
            <CarouselContent>
                <CarouselItem>
                    <Card className="flex w-full justify-between items-center overflow-hidden h-[230px] relative p-4">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="p-1 rounded-s px-3 w-[2.5rem] h-[.8rem]" />
                            <Skeleton className="p-1 rounded-s px-3 w-[8rem] h-[1.5rem]" />
                        </div>

                        <div className="w-[180px] h-full absolute right-0 overflow-hidden">
                            <Skeleton className="w-full h-full rounded-s" />
                        </div>
                    </Card>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
}
