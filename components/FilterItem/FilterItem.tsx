/* eslint-disable @next/next/no-img-element */
import "./FilterItem.css";
import { useState } from "react";
import FormFilterModal from "../FilterItem/FormFilterModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const FilterItem = () => {
  const [filterbtn, setFilterbtn] = useState(false);

  const {
    category,
    categories,
    priceMin,
    priceMax,
    roomsMin,
    ratingMin: reduxRatingMin,
  } = useSelector((state: RootState) => state.search);

  const activeFilterCount =
    (category?.length ?? 0) +
    (priceMin !== undefined || priceMax !== undefined ? 1 : 0) +
    (roomsMin !== undefined ? 1 : 0) +
    (reduxRatingMin !== undefined ? 1 : 0);

  const showStaticFilters = activeFilterCount < 3;

  return (
    <>
      <div className="Filter-wrapper">
       
        <button
          className="button-style-filter"
          onClick={() => setFilterbtn(!filterbtn)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="5"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-5"
          >
            <path
              fill="#0C0C0E"
              fillRule="evenodd"
              d="M15 12.75a3.25 3.25 0 0 1 3.162 2.5H21a.75.75 0 0 1 0 1.5h-2.838a3.25 3.25 0 0 1-6.324 0H3a.75.75 0 0 1 0-1.5h8.838A3.25 3.25 0 0 1 15 12.75m0 1.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M9 4.75a3.25 3.25 0 0 1 3.162 2.5H21a.75.75 0 0 1 0 1.5h-8.838a3.25 3.25 0 0 1-6.324 0H3a.75.75 0 0 1 0-1.5h2.838A3.25 3.25 0 0 1 9 4.75m0 1.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5"
              clipRule="evenodd"
            />
          </svg>{" "}
          فیلتر ها
        </button>

        <button className="button-style-filter">قیمت ⬇</button>

        <div className="border-right-button"></div>

    
        <div className="active-filter-list">
          {category?.map((categoryId) => {
            const categoryItem = categories.find(
              (item) => item.id === categoryId,
            );

            if (!categoryItem) return null;

            return (
              <button type="button" className="active-filter" key={categoryId}>
                {categoryItem.category_name}
              </button>
            );
          })}

          {roomsMin !== undefined && (
            <button type="button" className="active-filter">
              حداقل {roomsMin} اتاق
            </button>
          )}

          {(priceMin !== undefined || priceMax !== undefined) && (
            <button type="button" className="active-filter">
              {priceMin?.toLocaleString("en-US") ?? "—"}
              {" - "}
              {priceMax?.toLocaleString("en-US") ?? "—"}
            </button>
          )}

          {reduxRatingMin !== undefined && (
            <button type="button" className="active-filter">
              امتیاز بالای {reduxRatingMin}
            </button>
          )}
        </div>

        {showStaticFilters && (
          <>
            <button className="button-style-filter white-bg">
              <img src="/images/filter-img/filter-item2.png" alt="" />
              پذیرش با کارت ملی
            </button>

            <button className="button-style-filter white-bg">
              <img src="/images/filter-img/filter-item3.png" alt="" />
              معماری مدرن
            </button>

            <button className="button-style-filter white-bg">
              <img src="/images/filter-img/filter-item4.png" alt="" />
              میزبانی خوب
            </button>

            <button className="button-style-filter white-bg">
              <img src="/images/filter-img/filter-item5.png" alt="" />
              قیمت منصفانه
            </button>
          </>
        )}
      </div>

      {filterbtn && (
        <div className="filter-panel">
          <FormFilterModal />
        </div>
      )}
    </>
  );
};

export default FilterItem;
