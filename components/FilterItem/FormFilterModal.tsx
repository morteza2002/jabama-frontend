"use client";

import {
  setCategory,
  setPriceRange,
  setRoomRange,
  setRatingMin,
} from "@/redux/searchSlice";
import "./FormFilterModal.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import axios from "axios";
interface Category {
  id: number;
  category_name: string;
  slug: string;
}
const FormFilterModal = () => {
  const dispatch = useDispatch();
  const {
    category,
    priceMin,
    priceMax,
    roomsMin,
    ratingMin: reduxRatingMin,
  } = useSelector((state: RootState) => state.search);

  const [selectedCategories, setSelectedCategories] = useState<number[]>(category ?? []);
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };
  const [minPrice, setMinPrice] = useState(priceMin !== undefined ? String(priceMin) : "");
  const [maxPrice, setMaxPrice] = useState(priceMax !== undefined ? String(priceMax) : "");
  const [rooms, setRooms] = useState(roomsMin ?? 0);
  const [ratingMin, setRatingMinState] = useState<number | undefined>(
    reduxRatingMin
  );
  const increase = () => {
    setRooms((prev) => prev + 1);
  };
  const decrease = () => {
    setRooms((prev) => Math.max(0, prev - 1));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setPriceRange({
        min: minPrice ? Number(minPrice) : undefined,
        max: maxPrice ? Number(maxPrice) : undefined,
      }),
    );
    dispatch(setRoomRange(rooms > 0 ? rooms : undefined));
    dispatch(setCategory(selectedCategories));

    dispatch(setRatingMin(ratingMin));
  
  };
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setRooms(0);
    setRatingMinState(undefined);
  };
  const [categories, setCategoriesState] = useState<Category[]>([]);


  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/category-list/",
        );

        setCategoriesState(response.data.results);
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      }
    };

    getCategories();
  }, []);
  const [accOpen, setAccOpen] = useState(false);
  const [accOpen2, setAccOpen2] = useState(false);
  const [accOpen3, setAccOpen3] = useState(false);
  const [accOpen4, setAccOpen4] = useState(false);
  const [accOpen5, setAccOpen5] = useState(false);
  const [accOpen6, setAccOpen6] = useState(false);

  const facilities = [
    "استخر",
    "فوتبال دستی",
    "سونا",
    "سیستم تهویه هوا",
    "سیستم سرمایشی",
    "سیستم گرمایشی",
    "سیستم صوتی",
    "لوازم سرو غذا",
    "سرویس بهداشتی فرنگی",
    "فضای سبز",
    "آبشار",
  ];
  const [facilitySearch, setFacilitySearch] = useState("");

  const filteredFacilities = facilities.filter((facility) =>
    facility.toLowerCase().includes(facilitySearch.toLowerCase()),
  );
  const order = [
    " امکان برگزاری مراسم و مهمانی",

    "امکان ورود حیوانات خانگی",

    "امکان استعمال دخانیات",

    "امکان پذیرش ۲۴ ساعته مهمان",

    "امکان پذیرش گروه‌های مجردی (فقط آقایان یا خانم‌ها)",
  ];
  const region = ["  روستایی", "کوهستانی", "کویری", "ساحلی", "شهری", "جنگلی"];
  return (
    <>
      <div className="headLine">فیلتر ها </div>

      {/* فعلا فرم سابمیتش بداشتم تا بعدا اضافه کنم */}
      <form onSubmit={handleSubmit}>
        <div className="lable-input1">
          <div className="col-style-form">
            <h3> اقامتگاه های آنی و قطعی بدون نیاز</h3>
            <p> به تایید میزبان برای قطعی شدن رزرو</p>
          </div>
          <div className="toggle">
            <input type="checkbox" />
            <label></label>
          </div>
        </div>

        <div className="lable-input1">
          <div className="col-style-form">
            <h3>تعداد اتاق ها</h3>
            <p>{rooms} اتاق</p>
          </div>
          <div className="room-counter-Room">
            {" "}
            <button
              type="button"
              className="counter-btn-Room minus"
              onClick={decrease}
            >
              {" "}
              −{" "}
            </button>{" "}
            <span className="counter-number-Room">{rooms}</span>{" "}
            <button
              type="button"
              className="counter-btn-Room plus"
              onClick={increase}
            >
              {" "}
              +{" "}
            </button>{" "}
          </div>
        </div>
        <div className="acc-wrapper">
          <button
            type="button"
            className={accOpen ? "accordion active" : "accordion"}
            onClick={() => setAccOpen(!accOpen)}
          >
            <div className="col-style-form">
              <h3>قیمت</h3>
            </div>
            <div className="icon-down-form">{accOpen ? "▲" : "▼"}</div>
          </button>
          {accOpen && (
            <div className="panel">
              <div className="price-input">
                <label>حداقل قیمت</label>

                <input
                  type="text"
                  value={
                    minPrice ? Number(minPrice).toLocaleString("en-US") : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setMinPrice(value);
                  }}
                  placeholder="مثلاً ۱,۰۰۰,۰۰۰"
                  inputMode="numeric"
                />
              </div>

              <div className="price-input">
                <label>حداکثر قیمت</label>

                <input
                  type="text"
                  value={
                    maxPrice ? Number(maxPrice).toLocaleString("en-US") : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setMaxPrice(value);
                  }}
                  placeholder="مثلاً ۵,۰۰۰,۰۰۰"
                  inputMode="numeric"
                />
              </div>
            </div>
          )}
        </div>
        <div className="acc-wrapper">
          <button
            type="button"
            className={accOpen3 ? "accordion active" : "accordion"}
            onClick={() => setAccOpen3(!accOpen3)}
          >
            <div className="col-style-form">
              <h3>امتیاز</h3>
            </div>
            <div className="icon-down-form">{accOpen3 ? "▲" : "▼"}</div>
          </button>
          {accOpen3 && (
            <div className="panel">
              <div className="button-score">
                <button
                  type="button"
                  className={ratingMin === 5 ? "selected" : ""}
                  onClick={() => setRatingMinState(5)}
                >
                  5
                </button>

                <button
                  type="button"
                  className={ratingMin === 4.5 ? "selected" : ""}
                  onClick={() => setRatingMinState(4.5)}
                >
                  بالای 4.5
                </button>

                <button
                  type="button"
                  className={ratingMin === 4 ? "selected" : ""}
                  onClick={() => setRatingMinState(4)}
                >
                  بالای 4
                </button>

                <button
                  type="button"
                  className={ratingMin === 3.5 ? "selected" : ""}
                  onClick={() => setRatingMinState(3.5)}
                >
                  بالای 3.5
                </button>

                <button
                  type="button"
                  className={ratingMin === 3 ? "selected" : ""}
                  onClick={() => setRatingMinState(3)}
                >
                  بالای 3
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="acc-wrapper">
          <button
            type="button"
            className={accOpen2 ? "accordion active" : "accordion"}
            onClick={() => setAccOpen2(!accOpen2)}
          >
            <div className="col-style-form">
              <h3>امکانات</h3>
            </div>
            <div className="icon-down-form">{accOpen2 ? "▲" : "▼"}</div>
          </button>
          {accOpen2 && (
            <div className="panel">
              <div className="facility-search">
                {" "}
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="جستجو در امکانات"
                  value={facilitySearch}
                  onChange={(e) => setFacilitySearch(e.target.value)}
                />
              </div>

              <div className="facilities">
                {filteredFacilities.map((facility) => (
                  <button type="button" className="facility" key={facility}>
                    {facility}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="acc-wrapper">
          <button
            type="button"
            className={accOpen4 ? "accordion active" : "accordion"}
            onClick={() => setAccOpen4(!accOpen4)}
          >
            <div className="col-style-form">
              <h3>مقررات اقامتگاه</h3>
            </div>
            <div className="icon-down-form">{accOpen4 ? "▲" : "▼"}</div>
          </button>
          {accOpen4 && (
            <div className="panel">
              <div className="facilities">
                {order.map((facility) => (
                  <button type="button" className="facility" key={facility}>
                    {facility}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="acc-wrapper">
          <button
            type="button"
            className={accOpen5 ? "accordion active" : "accordion"}
            onClick={() => setAccOpen5(!accOpen5)}
          >
            {/* اینو عصر باید از api بگیری */}
            <div className="col-style-form">
              <h3>نوع اقامتگاه</h3>
            </div>
            <div className="icon-down-form">{accOpen5 ? "▲" : "▼"}</div>
          </button>
          {accOpen5 && (
            <div className="panel">
              <div className="facilities">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    className={
                      selectedCategories.includes(category.id)
                        ? "facility selected"
                        : "facility"
                    }
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.category_name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="acc-wrapper">
          <button
            type="button"
            className={accOpen6 ? "accordion active" : "accordion"}
            onClick={() => setAccOpen6(!accOpen6)}
          >
            {/* اینو عصر باید از api بگیری */}
            <div className="col-style-form">
              <h3>نوع منطقه</h3>
            </div>
            <div className="icon-down-form">{accOpen6 ? "▲" : "▼"}</div>
          </button>
          {accOpen6 && (
            <div className="panel">
              <div className="facilities">
                {region.map((region) => (
                  <button type="button" className="facility" key={region}>
                    {region}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="filter-buttons">
          {" "}
          <button
            type="button"
            className="clear-filter"
            onClick={handleClearFilters}
          >
            حذف فیلترها
          </button>
          <button type="submit" className="submit-filter">
            اعمال فیلتر
          </button>
        </div>
      </form>
    </>
  );
};

export default FormFilterModal;
