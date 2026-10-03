import MarkazBoom from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageNoDetails/MarkazBoom";
import NewBoomkadeh from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageNoDetails/NewBoomkadeh";
import NorthVilla from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageNoDetails/NorthVilla";
import PopularVillaCity from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageNoDetails/PopularVillaCity";
import ApartmanRent from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageWithDetails/ApartmanRent";
import FairPriceMainPage from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageWithDetails/FairPriceMainPage";
import LastOffer from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageWithDetails/LastOffer";
import LastOfferPool from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageWithDetails/LastOfferPool";
import LastWeekPoolPage from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageWithDetails/LastWeekPoolPage";
import TehranVilla from "../CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageWithDetails/TehranVilla";
import SouthBoom from "@/components/CategoryPlaces/FilterCategoryMainPage/FilterCategoryMainPageNoDetails/SouthBoomrent";




export const MainPageSwiper = () => {
  return (
  <>
  <PopularVillaCity />
  <FairPriceMainPage />
  <LastWeekPoolPage />
  <LastOffer />
  <LastOfferPool />
  <NewBoomkadeh />
  <ApartmanRent />
  <NorthVilla />
  <SouthBoom />
  <MarkazBoom />
  <TehranVilla />
</>
  )
}

