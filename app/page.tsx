import Hero from "@/components/Hero";
import AboutUs from "@/components/about";

import BlogCards from "@/components/blog";
import EventsPage from "@/components/eventcards";


export default function Home() {
  return (
    <div className="bg-[#1a1a1a] ">
      <Hero /><AboutUs/> <BlogCards /> <EventsPage/>
    </div>
  );
}
