import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { CarouselItem } from "../ui/carousel";

export default function CutomCarouselItem() {
    return (
        <CarouselItem>
            <Card className="flex justify-between items-center overflow-hidden h-[230px] relative p-4">
                <div className="flex flex-col gap-2">
                    <Badge className="p-1 rounded-full px-3 w-max">New Release</Badge>
                    <h1 className="text-3xl">Invincible (2003)</h1>
                </div>

                <div className="w-[180px] h-full absolute right-0 overflow-hidden">
                    {"https" ? (
                        <Image
                            alt="Comic Cover"
                            src={
                                "https://readcomiconline.li/Uploads/Etc/3-25-2016/42392826.jpg"
                            }
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <img
                            className="object-cover"
                            src="https://readcomiconline.li/Uploads/Etc/3-25-2016/42392826.jpg"
                            alt="Comic Cover"
                        />
                    )}
                </div>
            </Card>
        </CarouselItem>
    );
}
