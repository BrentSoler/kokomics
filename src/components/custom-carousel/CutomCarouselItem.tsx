import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { CarouselItem } from "../ui/carousel";
import { TComics } from "@/types/comics/TComics";

export default function CutomCarouselItem({ comic }: { comic: TComics }) {
    return (
        <CarouselItem>
            <Card className="flex justify-between items-center overflow-hidden h-[230px] relative p-4">
                <div className="flex flex-col gap-2 ">
                    <Badge className="p-1 rounded-full px-3 w-max">New Release</Badge>
                    <h1 className="text-3xl max-w-[23rem] truncate">{comic.title}</h1>
                </div>

                <div className="w-[180px] h-full absolute right-0 overflow-hidden">
                    {!comic.img.includes("https") ? (
                        <Image
                            alt="Comic Cover"
                            src={`https://readcomiconline.li${comic.img}`}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <img className="object-cover" src={comic.img} alt="Comic Cover" />
                    )}
                </div>
            </Card>
        </CarouselItem>
    );
}
