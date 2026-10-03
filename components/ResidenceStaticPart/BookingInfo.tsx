import React from "react";

const BookingInfo = () => {
  return (
    <div className="booking-info">
      <div className="installment-box">
        <div className="installment-icon">💳</div>

        <div>
          <strong>هر قسط ~ ۶۰٬۰۰۰٬۰۰۰ تومان</strong>
          <span>پرداخت ۴ قسطه</span>
        </div>
      </div>

      <div className="instant-book">
        <div className="instant-icon">⚡</div>

        <div>
          <strong>رزرو آنی و قطعی</strong>
          <span>بدون نیاز به تأیید میزبانی</span>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
