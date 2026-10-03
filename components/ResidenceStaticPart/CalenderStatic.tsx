import React from 'react'
import DatePicker from '../DatePicker/DatePicker'

const CalenderStatic = () => {
  return (
   
          <section className="calender-choise">
            <h3>تاریخ رزرو انتخاب نشده است</h3>
            <p>لطفا روز ورود خود را وارد کنید</p>
            <div className="calender">
              {" "}
              <DatePicker
                disabled={true}
                onClose={() => {}}
                onChange={() => {}}
              />{" "}
              <div className="reservefast">
                {" "}
                <p>در این روزها «آنی و قطعی» رزرو کنید</p>{" "}
              </div>{" "}
            </div>
            <div className="credit-box">
              <div className="credit-content">
                <strong>۱۰٬۰۰۰٬۰۰۰ تومان</strong>
                <span>اعتبار ویژه رزرو از جاباما</span>
              </div>

              <button className="credit-button">دریافت آنی از جاباما</button>
            </div>
          </section>
  )
}

export default CalenderStatic