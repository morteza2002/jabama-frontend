import Header from "@/components/layout/Header";
import Detail from "@/components/layout/Detailmain";
import StickyNavbar from "@/components/layout/StickyNavbar";
import { MainPageSwiper } from "@/components/MainSwiper/MainPageSwiper";

export default function Home() {
  return (
    <>
      <StickyNavbar />
      <Header />
      <MainPageSwiper/>
      <Detail />
      
    </>
  );
}
