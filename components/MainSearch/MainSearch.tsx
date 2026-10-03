"use client";

import DatePicker from "../DatePicker/DatePicker";
import "./MainSearch.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Location {
  id: number;
  is_sub: boolean;
  category_name: string;
  slug: string;
  sub_category: number | null;
}

const MainSearch = () => {
  const router = useRouter();

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
        if (!response.ok) throw new Error("خطا در دریافت شهرها");
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
    <div className="bg-wrapper" ref={searchRef}>
      <div className="bg-search">
        <div
          className="search-item destination"
          onClick={() => setIsPopupDes(true)}
        >
          <span className="search-title">مقصد سفرت کجاست؟</span>

          <span className="search-placeholder">
            {destination || "جستجو مقصد سفر"}
          </span>

          {IsPopupDes && (
            <div
              className="popup-overlay"
              onClick={(event) => {
                event.stopPropagation();
                setIsPopupDes(false);
              }}
            >
              <div
                className="popup"
                onClick={(event) => event.stopPropagation()}
              >
                <h6>
                  می‌توانید شهر، استان، محله، جاذبه، نام و یا دسته‌بندی اقامتگاه
                  را جست‌وجو کنید.
                </h6>

                <p>محبوب‌ترین مقصدها</p>

                <div className="button-choise-wraaper">
                  {locations.map((location) => (
                    <button
                      key={location.id}
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

        <div className="search-item" onClick={() => setIsDatePickerOpen(true)}>
          <span className="search-title">تاریخ ورود</span>

          <span className="search-placeholder">
            {startDate || "انتخاب تاریخ"}
          </span>
        </div>

        <div className="search-item" onClick={() => setIsDatePickerOpen(true)}>
          <span className="search-title">تاریخ خروج</span>

          <span className="search-placeholder">
            {endDate || "انتخاب تاریخ"}
          </span>
        </div>

        {isDatePickerOpen && (
          <DatePicker
            onClose={() => setIsDatePickerOpen(false)}
            onChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
              setIsDatePickerOpen(false);
            }}
          />
        )}

        <div
          className="search-item number search-item-last"
          onClick={() => setIsPopupNum(true)}
        >
          <span className="search-title">تعداد نفرات</span>

          <span className="search-placeholder">
            {num > 0 ? `${num} نفر` : "انتخاب تعداد نفرات"}
          </span>

          {IsPopupNum && (
            <div
              className="popup-overlayNum"
              onClick={(event) => {
                event.stopPropagation();
                setIsPopupNum(false);
              }}
            >
              <div
                className="popupNum"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="Num-count">
                  <p>تعداد نفرات</p>

                  <div className="plus-minus-icon">
                    <button
                      type="button"
                      className="count-btn minus"
                      onClick={() => setNum((prev) => Math.max(0, prev - 1))}
                    >
                      −
                    </button>

                    <span className="count-number">{num}</span>

                    <button
                      type="button"
                      className="count-btn plus"
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

        <button className="search-button" onClick={handleSearch}>
          <span>⌕</span>
        </button>
      </div>
    </div>
  );
};

export default MainSearch;
