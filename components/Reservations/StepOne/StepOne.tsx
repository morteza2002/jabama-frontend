"use client";
import { toGregorian } from "jalaali-js";
import { ResidenceDetail } from "@/Types/FilterCategoryMainPageWithDetails.types";
import { useBooking } from "../../../Context/BookingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAddressCard,
  faBan,
  faCakeCandles,
  faCalendarCheck,
  faClock,
  faCreditCard,
  faPeopleArrows,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "./StepOne.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "@/components/mainDatePicker/DatePicker";
import ModalPopUp from "@/components/ModalPop/ModalPopUp";
import { useAuth } from "@/Context/AuthContext";
import useCountdown from "@/hooks/useTimerCount";
const StepOne = () => {
  const API_URL = "http://127.0.0.1:8000";

  const {
    setCurrentStep,
    booking,
    setDates,
    setGuests,
    setPrice,
    setFirstName,
    setLastName,
  } = useBooking();

  const [residence, setResidence] = useState<ResidenceDetail | null>(null);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestEditorOpen, setIsGuestEditorOpen] = useState(false);
  const { isLoggedIn, userId } = useAuth();
  const { minutes, seconds } = useCountdown(60 * 60);

  const getNumberOfNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;

    const [startYear, startMonth, startDay] = checkIn
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .split("/")
      .map(Number);

    const [endYear, endMonth, endDay] = checkOut
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .split("/")
      .map(Number);

    const startGregorian = toGregorian(startYear, startMonth, startDay);

    const endGregorian = toGregorian(endYear, endMonth, endDay);

    const start = new Date(
      startGregorian.gy,
      startGregorian.gm - 1,
      startGregorian.gd,
    );

    const end = new Date(endGregorian.gy, endGregorian.gm - 1, endGregorian.gd);

    return Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
  };
  const convertJalaliToGregorian = (date: string) => {
    const [year, month, day] = date
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .split("/")
      .map(Number);

    const gregorian = toGregorian(year, month, day);

    return `${gregorian.gy}-${String(gregorian.gm).padStart(
      2,
      "0",
    )}-${String(gregorian.gd).padStart(2, "0")}`;
  };
  const numberOfNights = getNumberOfNights(booking.checkIn, booking.checkOut);
  const totalPrice = booking.price * numberOfNights;
  useEffect(() => {
    const fetchResidence = async () => {
      try {
        const response = await axios.get<ResidenceDetail>(
          `${API_URL}/residence-detail/${booking.residenceId}/`,
        );

        setResidence(response.data);
        setPrice(Number(response.data.price));
      } catch (error) {
        console.error("خطا در دریافت اطلاعات اقامتگاه:", error);
      }
    };

    if (booking.residenceId) {
      fetchResidence();
    }
  }, [booking.residenceId, setPrice]);
  const handleReserve = async () => {
    console.log("وضعیت لاگین:", isLoggedIn);
    console.log("USER ID:", userId);

    if (!isLoggedIn) {

      document
        .querySelector<HTMLElement>("#reservation-login-modal .btn-login")
        ?.click();

      return;
    }

    if (!userId) {
      console.error("شناسه کاربر پیدا نشد");
      return;
    }

    if (!booking.residenceId) {
      console.error("شناسه اقامتگاه پیدا نشد");
      return;
    }

    if (!booking.checkIn || !booking.checkOut) {
      console.error("تاریخ ورود یا خروج وارد نشده");
      return;
    }

    const checkIn = convertJalaliToGregorian(booking.checkIn);
    const checkOut = convertJalaliToGregorian(booking.checkOut);

    const payload = {
      user: Number(userId),
      residence: Number(booking.residenceId),
      check_in: checkIn,
      check_out: checkOut,
    };

    console.log("RESERVE PAYLOAD:", payload);

    try {
      const response = await axios.post(`${API_URL}/reserve/`, payload);

      console.log("RESERVE STATUS:", response.status);
      console.log("RESERVE RESPONSE:", response.data);

      if (response.status === 200 || response.status === 201) {

        setCurrentStep(2);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("RESERVE STATUS:", error.response?.status);
        console.error(
          "RESERVE DATA:",
          JSON.stringify(error.response?.data, null, 2),
        );
      } else {
        console.error("خطا در ثبت رزرو:", error);
      }
    }
  };
  return (
    <>
      <div className="wrapp-step1">
        <div className="part-one-step1">
          <p
            style={{
              color: "black",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            {booking.residenceName}
          </p>

          <div className="wrapper-edit-step-one">
            <span
              style={{
                color: "gold",
                fontSize: "15px",
              }}
            >
              ★
            </span>

            <strong>{residence?.average_ratings}</strong>

            <span style={{ color: "gray" }}>
              ({residence?.comments.length} دیدگاه)
            </span>

            <span
              style={{
                color: "blue",
                display: "flex",
                gap: "5px",
              }}
            >
              <img
                src="https://cdn.jabama.com/image/jabama-images/0/522c99cd-c785-49c5-8ffd-e59e1e9439e0.png"
                width="20px"
                alt=""
              />
              قیمت منصفانه
            </span>
          </div>

          <div className="img-info">
            <img
              src="https://cdn.jabama.com/image/jabama-images/880777/7096b5a1-c7e0-4dc6-8cd4-d35455485213.jpg"
              style={{
                width: "110px",
                height: "80px",
                borderRadius: "5px",
              }}
              alt=""
            />
          </div>

          <div className="col-flex">
            <div className="date-road">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <FontAwesomeIcon icon={faCalendarCheck} />

                <div className="wrape-date">
                  <p>تاریخ سفر</p>

                  <p>
                    {booking.checkIn} تا {booking.checkOut}
                  </p>
                </div>
              </div>

              <button
                className="btn-edit"
                style={{ cursor: "pointer" }}
                onClick={() => setIsDatePickerOpen(true)}
              >
                ویرایش
              </button>
            </div>
            <div className="date-passenger">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <FontAwesomeIcon icon={faPeopleArrows} />

                <div className="wrape-date">
                  <p>تعداد مسافران</p>

                  <p style={{ color: "black", fontWeight: "bold" }}>
                    {booking.guests} نفر
                  </p>
                </div>
              </div>

              <button
                className="btn-edit"
                style={{ cursor: "pointer" }}
                onClick={() => setIsGuestEditorOpen(true)}
              >
                ویرایش
              </button>
            </div>

            <button
              style={{
                backgroundColor: "#f1f1f1",
                borderRadius: "8px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              جزئیات اقامتگاه
            </button>
          </div>
          <FontAwesomeIcon icon={faAddressCard} className="guest-main-icon" />
          <div className="guest-info-box">
            <div className="guest-info-title">اطلاعات سرپرست</div>

            <div className="guest-inputs">
              <input
                type="text"
                placeholder="نام"
                value={booking.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="نام خانوادگی"
                value={booking.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="rules-section">
            <h2>مقررات مهم اقامتگاه</h2>

            <div className="rule-item">
              <FontAwesomeIcon icon={faAddressCard} />
              <span>ارائه کارت ملی کافی است.</span>
            </div>

            <div className="rule-item">
              <FontAwesomeIcon icon={faCreditCard} />
              <span>استعمال دخانیات مجاز است.</span>
            </div>

            <div className="rule-item">
              <FontAwesomeIcon icon={faClock} />
              <span>امکان پذیرش ۲۴ ساعته فراهم است.</span>
            </div>

            <div className="rule-item">
              <FontAwesomeIcon icon={faUsers} />
              <span>
                پذیرش گروه‌های مجردی (فقط آقایان یا خانم‌ها) فراهم است.
              </span>
            </div>

            <div className="rule-item rule-danger">
              <FontAwesomeIcon icon={faBan} />
              <span>ورود حیوانات خانگی مجاز نیست.</span>
            </div>

            <div className="rule-item rule-danger">
              <FontAwesomeIcon icon={faCakeCandles} />
              <span>برگزاری مراسم مجاز نیست.</span>
            </div>
          </div>

          <div className="cancel-section">
            <h2>
              قوانین لغو رزرو <span>سخت‌گیرانه</span>
            </h2>

            <div className="cancel-rule cancel-green">
              <p>تا ۶ آبان</p>
              <strong>۳۰٪ مبلغ شب اول + ۲۰٪ مبلغ شب‌های باقیمانده</strong>
            </div>

            <div className="cancel-rule cancel-orange">
              <p>از ۷ آبان تا ۱۳ آبان</p>
              <strong>۵۰٪ مبلغ شب اول + ۵۰٪ مبلغ شب‌های باقیمانده</strong>
            </div>

            <div className="cancel-rule cancel-red">
              <p>از ۱۴ آبان تا ۱۶ آبان</p>
              <strong>
                ۱۰۰٪ مبلغ شب‌های سپری شده + ۱۰۰٪ مبلغ شب‌های باقیمانده
              </strong>
            </div>
          </div>

          <div className="host-message">
            <h2>پیام به میزبان</h2>

            <p>
              اگر سوالی داری یا نکته‌ای هست که میزبان باید بدونه، اینجا بنویس.
              پیام همراه درخواست رزرو برای میزبان ارسال میشه و بعد از تایید رزرو
              می‌تونی چتت رو با میزبان ادامه بدی.
            </p>

            <textarea placeholder="متن پیام برای میزبان ..." />
          </div>
        </div>
        <div className="part-two-step1">
          <div className="wrapper-price-check">
            <img
              src="https://cdn.jabama.com/image/jabama-images/880777/7096b5a1-c7e0-4dc6-8cd4-d35455485213.jpg"
              alt=""
            />
            <div className="wrape-pernight">
              <p>
                {numberOfNights} شب x {booking.price.toLocaleString("fa-IR")}{" "}
                تومان
              </p>

              <p>{totalPrice.toLocaleString("fa-IR")} تومان</p>
            </div>
            <div className="wrape-pernight">
              <p>قابل پرداخت نهایی</p>

              <strong>{totalPrice.toLocaleString("fa-IR")} تومان</strong>
            </div>

        

            <span className="prize-price">
              پس از اقامت، 3٬570٬000 تومان اعتبار سفر پاداش خواهید گرفت!
            </span>

            <div id="reservation-login-modal" style={{ display: "none" }}>
              <ModalPopUp />
            </div>
            <button className="btn-reseve" onClick={handleReserve}>
              ثبت درخواست رزرو
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => setCurrentStep(2)}>رفتن به مرحله دوم</button>

      {isDatePickerOpen && (
        <DatePicker
          initialCheckIn={booking.checkIn}
          initialCheckOut={booking.checkOut}
          onClose={() => setIsDatePickerOpen(false)}
          onChange={(startDate, endDate) => {
            setDates(startDate, endDate);

            setIsDatePickerOpen(false);
          }}
        />
      )}

      {isGuestEditorOpen && (
        <div className="guest-editor">
          <div className="guest-editor-box">
            <div className="wrapp-flex-head">
              <span>X</span>
              <div className="flex-head-guest">
                <h3>ویرایش تعداد مسافران</h3>
                <p>تعداد مسافران و واحد مورد نظر را انتخاب کنید.</p>
              </div>
            </div>
            <div className="flex-guest-wrap">
              {" "}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <FontAwesomeIcon icon={faPeopleArrows} />

                <div className="wrape-date">
                  <p>تعداد مسافران</p>

                  <p>{booking.guests}</p>
                </div>
              </div>
              <div className="guest-counter">
                <button
                  onClick={() => setGuests(Math.max(1, booking.guests - 1))}
                >
                  −
                </button>

                <span>{booking.guests}</span>

                <button
                  onClick={() =>
                    setGuests(
                      Math.min(residence?.capacity ?? 1, booking.guests + 1),
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>{" "}
            <div className="button-guest-wrap">
              <button
                onClick={() => setIsGuestEditorOpen(false)}
                style={{ backgroundColor: "black", color: "white" }}
              >
                ثبت تغییرات
              </button>
              <button onClick={() => setIsGuestEditorOpen(false)}>بستن</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepOne;
