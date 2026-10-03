"use client";

import StepOne from "@/components/Reservations/StepOne/StepOne";
import StepThree from "@/components/Reservations/StepThree/StepThree";
import StepTwo from "@/components/Reservations/StepTwo/StepTwo";
import { useBooking } from "@/Context/BookingContext";
import "./reservations.css";
import { TestProvider } from "@/Context/TestContext";
export default function ReservationsPage() {
  const { booking } = useBooking();

  return (
    <>
    <TestProvider>
      <main className="wrapper-main-reseve">
        <div className="stepper">
          <div
            className={`step ${booking.currentStep > 1 ? "completed" : booking.currentStep === 1 ? "active" : ""}`}
          >
            <div className="circle">{booking.currentStep > 1 ? "✓" : ""}</div>
            <div className="label">اطلاعات رزرو</div>
          </div>

          <div
            className={`line ${booking.currentStep > 1 ? "completed" : ""}`}
          ></div>

          <div
            className={`step ${booking.currentStep > 2 ? "completed" : booking.currentStep === 2 ? "active" : ""}`}
          >
            <div className="circle">{booking.currentStep > 2 ? "✓" : ""}</div>
            <div className="label">اطلاعات مسافر</div>
          </div>

          <div
            className={`line ${booking.currentStep > 2 ? "completed" : ""}`}
          ></div>

          <div className={`step ${booking.currentStep === 3 ? "active" : ""}`}>
            <div className="circle"></div>
            <div className="label">تأیید و پرداخت</div>
          </div>
        </div>
        {booking.currentStep === 1 && <StepOne />}

        {booking.currentStep === 2 && <StepTwo />}

        {booking.currentStep === 3 && <StepThree />}
        <p>نام اقامتگاه: {booking.residenceName}</p>

        {/* <p>شناسه اقامتگاه: {booking.residenceId}</p>
      <p>نام اقامتگاه: {booking.residenceName}</p>
      <p>تاریخ ورود: {booking.checkIn}</p>
      <p>تاریخ خروج: {booking.checkOut}</p>
      <p>تعداد مسافر: {booking.guests}</p>
      <p>مرحله فعلی: {booking.currentStep}</p> */}
      </main>
    </TestProvider>
    </>
  );
}
