/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import ResidenceCard from "@/components/ResidenceCard/ResidenceCardMain";
import type {
  Residence,
  // Category,
  ResidenceResponse,
  CategoryResponse,
} from "../../Types/FilterCategoryMainPageWithDetails.types";
import ResidenceCardSkeleton from "@/components/Skeletons/ResidenceCardSkeleton";
import { RESIDENCE_IMAGES } from "@/data/residenceImages";
import "./Search.css";
import FilterItem from "@/components/FilterItem/FilterItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispach } from "@/redux/store";
import type { RootState } from "@/redux/store";
import { setPage, setCategories } from "@/redux/searchSlice";
import { useSearchParams } from "next/navigation";
const API_URL = "http://127.0.0.1:8000";

function SearchPageContent() {
  const searchParams = useSearchParams();

  const locationId = searchParams.get("location");
  const numberPeople = searchParams.get("num");
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("default");
  // const [categories, setCategories] = useState<Category[]>([]);
  // const [page, setPage] = useState(1); استفاده از ریداکس بجا state
  const dispatch = useDispatch<AppDispach>();
  //use redux use selector here
  const page = useSelector((state: RootState) => state.search.page);
  const selectedCategoryId = useSelector(
    (state: RootState) => state.search.category,
  );
  const categories = useSelector((state: RootState) => state.search.categories);
  const priceMin = useSelector((state: RootState) => state.search.priceMin);
  const priceMax = useSelector((state: RootState) => state.search.priceMax);
  const roomsMin = useSelector((state: RootState) => state.search.roomsMin);
  const ratingMin = useSelector((state: RootState) => state.search.ratingMin);
  // const roomsMax = useSelector((state: RootState) => state.search.roomsMax);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const SortResidencs = [...residences].sort((a: Residence, b: Residence) => {
    switch (sortOption) {
      case "expensive":
        return b.price - a.price;

      case "cheap":
        return a.price - b.price;

      case "highest-rating":
        return b.average_ratings - a.average_ratings;

      case "lowest-rating":
        return a.average_ratings - b.average_ratings;

      default:
        return 0;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams();
        params.append("page", String(page));

        if (selectedCategoryId?.length) {
          params.append("category", selectedCategoryId.join(","));
        }
        if (priceMin !== undefined) {
          params.append("price_min", String(priceMin));
        }

        if (priceMax !== undefined) {
          params.append("price_max", String(priceMax));
        }
        if (roomsMin !== undefined) {
          params.append("number_rooms_min", String(roomsMin));
        }
        if (ratingMin !== undefined) {
          params.append("average_ratings", String(ratingMin));
        }
        if (locationId) {
          params.append("category_location", locationId);
        }

        if (numberPeople) {
          params.append("number_people", numberPeople);
        }
        const residencesResponse = await axios.get<ResidenceResponse>(
          `${API_URL}/residences-list/?${params.toString()}`,
        );

        const categoriesResponse = await axios.get<CategoryResponse>(
          `${API_URL}/category-list/`,
        );

        setResidences(residencesResponse.data.results);
        setTotalCount(residencesResponse.data.count);
        setNextPage(residencesResponse.data.next);
        setPreviousPage(residencesResponse.data.previous);
        dispatch(setCategories(categoriesResponse.data.results));
      } catch (error) {
        console.error(error);
        setError("دریافت اطلاعات با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    dispatch,
    locationId,
    numberPeople,
    page,
    priceMax,
    priceMin,
    ratingMin,
    roomsMin,
    selectedCategoryId,
  ]);

  if (loading) {
    return (
      <main className="search-page">
        <h1>اقامتگاه‌ها</h1>

        <div className="residences-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <ResidenceCardSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="search-page">
        <h1>اقامتگاه‌ها</h1>
        <p>{error}</p>
      </main>
    );
  }
  // اینو باید برداریم بعدا
  // const selectedCategory = 0; چون از ریداکس استفاده کردیم

  const selectedCategories = categories.filter((item) =>
    selectedCategoryId?.includes(item.id),
  );
  return (
    <main className="search-page">
      <FilterItem />
      <h1>
        {selectedCategories.length > 1
          ? "لیست اقامتگاه‌ها "
          : selectedCategories.length === 1
            ? `${selectedCategories[0].category_name} ها`
            : "همه اقامتگاه‌ها"}
      </h1>

      <main className="search-page">
        <div className="search-wrapper">
          <p className="">{totalCount} اقامتگاه</p>

          <div className="sort-container">
            <div className="sorting-wrapper">
              <label className="sort-label">
                <img src="/images/SortValue.png" alt="مرتب‌سازی" />

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">پیش‌فرض</option>
                  <option value="expensive">گران‌ترین</option>
                  <option value="cheap">ارزان‌ترین</option>
                  <option value="highest-rating">بیشترین امتیاز</option>
                  <option value="lowest-rating">کمترین امتیاز</option>
                </select>
              </label>
              <span>
                <img className="map-img" src="images/map.png" alt="" />
              </span>
            </div>
          </div>
        </div>
        <div className="residences-list">
          {SortResidencs.map((residence) => {
            const startIndex = residence.id % RESIDENCE_IMAGES.length;

            const images = [
              RESIDENCE_IMAGES[startIndex],

              RESIDENCE_IMAGES[(startIndex + 1) % RESIDENCE_IMAGES.length],

              RESIDENCE_IMAGES[(startIndex + 2) % RESIDENCE_IMAGES.length],
            ];

            return (
              <ResidenceCard
                key={residence.id}
                residence={residence}
                images={images}
              />
            );
          })}
        </div>
        <div className="pagination">
          <button
            disabled={!previousPage}
            onClick={() => dispatch(setPage(page - 1))}
          >
            قبلی
          </button>

          <span>صفحه {page}</span>

          <button
            disabled={!nextPage}
            onClick={() => dispatch(setPage(page + 1))}
          >
            بعدی
          </button>
        </div>
      </main>
    </main>
  );
}
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <section className="search-page">
          <h1>اقامتگاه‌ها</h1>

          <div className="residences-list">
            {Array.from({ length: 6 }).map((_, index) => (
              <ResidenceCardSkeleton key={index} />
            ))}
          </div>
        </section>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
