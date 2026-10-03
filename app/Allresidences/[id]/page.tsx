"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import "./residence.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@/components/reui/rating";
import DatePicker from "@/components/DatePicker/DatePicker";

import { faHeart, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type {
  Category,
  CategoryResponse,
  ResidenceDetail,
  CategoryLocation,
  CategoryLocationResponse,
} from "../../../Types/FilterCategoryMainPageWithDetails.types";
import { useBooking } from "@/Context/BookingContext";
import { useRouter } from "next/navigation";
import ImgGrid from "@/components/ResidenceStaticPart/ImgGrid";
import DistanceInfo from "@/components/ResidenceStaticPart/DistanceInfo";
import FearurePart from "@/components/ResidenceStaticPart/FearurePart";
import Details from "@/components/ResidenceStaticPart/Details";
import LocationStatic from "@/components/ResidenceStaticPart/LocationStatic";
import BookingInfo from "@/components/ResidenceStaticPart/BookingInfo";
import CalenderStatic from "@/components/ResidenceStaticPart/CalenderStatic";
import OwnerStatic from "@/components/ResidenceStaticPart/OwnerStatic";
import Boxreserve from "@/components/ResidenceStaticPart/Boxreserve";
import Headresidence from "@/components/ResidenceStaticPart/Headresidence";

const API_URL = "http://127.0.0.1:8000";

export default function ResidenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [now] = useState(() => Date.now());
  const [residence, setResidence] = useState<ResidenceDetail | null>(null);
  const [rating, setRating] = useState<number>(0);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    setResidence: setBookingResidence,
    setDates: setBookingDates,
    setGuests: setBookingGuests,
  } = useBooking();
  const router = useRouter();
  const [categoryLocations, setCategoryLocations] = useState<
    CategoryLocation[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [guests, setGuests] = useState(0);
  const searchDates = useSelector((state: RootState) => state.search);
  const [checkIn, setCheckIn] = useState(searchDates.checkIn);
  const [checkOut, setCheckOut] = useState(searchDates.checkOut);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [residenceResponse, categoryResponse, categoryLocationResponse] =
          await Promise.all([
            axios.get<ResidenceDetail>(`${API_URL}/residence-detail/${id}/`),

            axios.get<CategoryResponse>(`${API_URL}/category-list/`),

            axios.get<CategoryLocationResponse>(
              `${API_URL}/category-location-list/`,
            ),
          ]);

        setResidence(residenceResponse.data);

        setCategories(categoryResponse.data.results);

        setCategoryLocations(categoryLocationResponse.data.results);
      } catch (error) {
        console.error(error);
        setError("خطا در دریافت اطلاعات اقامتگاه");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>در حال دریافت اطلاعات...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!residence) {
    return <div>اقامتگاه پیدا نشد.</div>;
  }

  // پیدا کردن اسم دسته‌بندی
  const category = categories.find((item) => item.id === residence.category);

  //   هسته پیدا کردن اسم location ها ما میتونیم 2 تا لوکشین بزازیم سر اینکه استان های شمالی و...
  const residenceLocations = categoryLocations.filter((location) =>
    residence.category_location.includes(location.id),
  );

  return (
    <main className="main-residence">
      <Headresidence residence={residence} />
      <div className="subinfo-residence">
        <p>
          ⭐ {residence.average_ratings}{" "}
          <span>({residence.comments.length} نظر ثبت شده)</span>
          {residenceLocations.map((location) => (
            <span style={{ color: "black" }} key={location.id}>
              شهر : {location.category_name}{" "}
            </span>
          ))}
        </p>
        <p style={{ color: "red", fontSize: "10px" }}>
          لحظه‌آخری و اقامت بلند‌مدت
        </p>
      </div>
      <ImgGrid />

      <div className="page">
        <Boxreserve residence={residence}  />
        <div className="section-one">
          <h3
            style={{ paddingTop: "25px", fontSize: "20px", fontWeight: "bold" }}
          >
            {category?.category_name || "نامشخص"}
          </h3>

          <div className="head-title">
            <p>
              {" "}
              اجاره {category?.category_name || "نامشخص"}
              {residenceLocations.map((location) => (
                <span style={{ color: "black" }} key={location.id}>
                  / در {location.category_name}{" "}
                </span>
              ))}{" "}
              به میزبانی نیما درویش
            </p>

            <img
              src="/images/avatar.png"
              alt=""
              style={{
                borderRadius: "100px",
                width: "50px",
                height: "50px",
                marginBottom: "10px",
              }}
            />
          </div>

          <div className="villa-info">
            <BookingInfo />

            <div className="credit-box">
              <div className="credit-content">
                <strong>۱۰٬۰۰۰٬۰۰۰ تومان</strong>
                <span>اعتبار ویژه رزرو از جاباما</span>
              </div>

              <button className="credit-button">دریافت آنی از جاباما</button>
            </div>

            <Details />
          </div>
          <p className="subDetail">
            <strong> توضیحات: {category?.category_name || "نامشخص"} </strong>
            <br />
            {residence.description}
          </p>

          <FearurePart />
          <CalenderStatic />
          <LocationStatic />

          <DistanceInfo />

          <hr />

          <section style={{ marginTop: "20px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>
              امتیاز کلی اقامتگاه {residence.average_ratings} از 5
            </h2>

            <p>
              <strong>از</strong> {residence.comments.length} نظر ثبت شده
            </p>

            {residence.comments.length === 0 ? (
              <p>هنوز نظری ثبت نشده است.</p>
            ) : (
              <div className="people-live-container">
                {residence.comments.map((comment) => (
                  <article key={comment.id} className="people-live">
                    <div className="wrapp-all">
                      <img
                        src="/images/avatar.png"
                        alt=""
                        style={{
                          borderRadius: "100px",
                          width: "50px",
                          height: "50px",
                          marginBottom: "10px",
                        }}
                      />

                      <div className="wrapp-profile">
                        <h3>{comment.name}</h3>

                        <p>
                          اقامت{" "}
                          {Math.floor(
                            (now - new Date(comment.created).getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          روز پیش
                        </p>
                      </div>
                    </div>

                    <div className="rate-star">
                      {" "}
                      <Rating
                        rating={residence.average_ratings}
                        onRatingChange={setRating}
                      />{" "}
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        {Math.floor(
                          (now - new Date(comment.created).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        شب اقامت در اقامتگاه
                      </p>
                    </div>
                    <p style={{ marginTop: "20px", color: "black" }}>
                      {comment.body}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <OwnerStatic residence={residence} />
        </div>
      </div>
      {isDatePickerOpen && (
        <DatePicker
          onClose={() => setIsDatePickerOpen(false)}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          onChange={(startDate, endDate) => {
            setCheckIn(startDate);
            setCheckOut(endDate);
            setIsDatePickerOpen(false);
          }}
        />
      )}
    </main>
  );
}
