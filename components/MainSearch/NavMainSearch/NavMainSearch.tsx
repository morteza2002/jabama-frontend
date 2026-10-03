"use client";

import DatePicker from "../../DatePicker/DatePicker";
import "./NavMainSearch.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearchDates } from "@/redux/searchSlice";

interface Location {
  id: number;
  is_sub: boolean;
  category_name: string;
  slug: string;
  sub_category: number | null;
}

const MainSearch = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [IsPopupDes, setIsPopupDes] = useState(false);
  const [IsPopupNum, setIsPopupNum] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [num, setNum] = useState(0);

  const [destination, setDestination] = useState("");
  const [destinationId, setDestinationId] = useState<number | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsPopupDes(false);
        setIsPopupNum(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/category-location-list/",
        );

        if (!response.ok) {
          throw new Error("خطا در دریافت شهرها");
        }

        const data = await response.json();

        setLocations(data.results);
      } catch (error) {
        console.error("خطا در دریافت شهرها:", error);
      }
    };

    getLocations();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destinationId !== null) {
      params.set("location", String(destinationId));
    }

    if (num > 0) {
      params.set("num", String(num));
    }

    router.push(`/Allresidences?${params.toString()}`);
  };

  return (
    <div className="main-search-wrapper" ref={searchRef}>
      <div className="main-search">
        <div
          className="search-field destination-field"
          onClick={() => setIsPopupDes(true)}
        >
          <span className="field-value">
            {destination || "مقصد سفرت کجاست؟"}
          </span>

          {IsPopupDes && (
            <div
              className="search-popup-overlay"
              onClick={(event) => {
                event.stopPropagation();
                setIsPopupDes(false);
              }}
            >
              <div
                className="destination-popup"
                onClick={(event) => event.stopPropagation()}
              >
                <h6>
                  می‌توانید شهر، استان، محله، جاذبه، نام و یا دسته‌بندی اقامتگاه
                  را جست‌وجو کنید.
                </h6>

                <p>محبوب‌ترین مقصدها</p>

                <div className="destination-list">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => {
                        setDestination(location.category_name);
                        setDestinationId(location.id);
                        setIsPopupDes(false);
                      }}
                    >
                      {location.category_name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="search-field date-field"
          onClick={() => setIsDatePickerOpen(true)}
        >
          <span className="field-value">{startDate || "تاریخ ورود"}</span>
        </div>

        <div
          className="search-field date-field"
          onClick={() => setIsDatePickerOpen(true)}
        >
          <span className="field-value">{endDate || "تاریخ خروج"}</span>
        </div>

        <div
          className="search-field people-field"
          onClick={() => setIsPopupNum(true)}
        >
          <span className="field-value">
            {num > 0 ? `${num} نفر` : "چند نفر"}
          </span>

          {IsPopupNum && (
            <div
              className="search-popup-overlay people-overlay"
              onClick={(event) => {
                event.stopPropagation();
                setIsPopupNum(false);
              }}
            >
              <div
                className="people-popup"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="people-counter">
                  <p>تعداد نفرات</p>

                  <div className="counter-controls">
                    <button
                      type="button"
                      onClick={() => setNum((prev) => Math.max(0, prev - 1))}
                    >
                      −
                    </button>

                    <span>{num}</span>

                    <button
                      type="button"
                      onClick={() => setNum((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isDatePickerOpen && (
          <DatePicker
            onClose={() => setIsDatePickerOpen(false)}
            onChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);

              dispatch(
                setSearchDates({
                  checkIn: start,
                  checkOut: end,
                }),
              );

              setIsDatePickerOpen(false);
            }}
          />
        )}

        <button
          type="button"
          className="main-search-button"
          onClick={handleSearch}
          aria-label="جستجو"
        >
          <span>⌕</span>
        </button>
      </div>
    </div>
  );
};

export default MainSearch;
