import Hero from "@/components/Hero";
import Explore from "@/components/explore";
import FeaturedEvents from "@/components/explore";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#1a1a1a] ">
      <Hero /> <Explore />
    </div>
  );
}
