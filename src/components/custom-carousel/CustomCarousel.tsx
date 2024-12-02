import { TComics } from "@/types/comics/TComics";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

export default function CustomCarousel({ comics }: { comics?: TComics[] }) {
    return (
        <Carousel className="w-[80vw]">
            <CarouselContent>
                <CarouselItem>
                    <div className="w-full flex justify-center items-center">
                        {!"https" ? (
                            <Image
                                className="rotate-45"
                                alt="Comic Cover"
                                src={
                                    "https://readcomiconline.li/Uploads/Etc/3-25-2016/42392826.jpg"
                                }
                                width={200}
                                height={100}
                            />
                        ) : (
                            <img
                                src="https://readcomiconline.li/Uploads/Etc/3-25-2016/42392826.jpg"
                                alt=""
                            />
                        )}
                        <h1 className="font-bold text-white text-2xl drop-shadow-[1px_1px_8px_rgba(0,0,0,1)]">
                            Invincible (2003)
                        </h1>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
