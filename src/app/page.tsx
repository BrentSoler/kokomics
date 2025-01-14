import CustomCarousel from "@/components/custom-carousel/CustomCarousel";
import LandingLayout from "@/components/landingLayout/LandingLayout";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="p-8">
      <div className="flex justify-center p-4">
        <CustomCarousel />
      </div>
      <Separator />
      <LandingLayout state="mostview" />
    </div>
  );
}
