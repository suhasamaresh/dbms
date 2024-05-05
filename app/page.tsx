import Hero from "@/components/Hero";
import { BackgroundCellAnimation } from "@/components/Ripple";
import BlogCards from "@/components/blog";
import MostPopularBlogs from "@/components/blog";
import Explore from "@/components/explore";
import FeaturedEvents from "@/components/explore";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#1a1a1a] ">
      <Hero />  <BlogCards /> 
    </div>
  );
}
