import React from 'react'

const Details = () => {
  return (
   <div className="villa-details">
              <h2>مشخصات کلی ویلا</h2>

              <div className="detail-item">
                <div className="detail-icon">⌂</div>

                <div className="detail-text">
                  <h3>درباره ویلا</h3>
                  <p>۸۵ متر زیربنا، درست ۳ طبقه</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">♧</div>

                <div className="detail-text">
                  <h3>ظرفیت</h3>
                  <p>ظرفیت تا ۵ نفر (۴ نفر پایه + ۱ نفر اضافه)</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">▱</div>

                <div className="detail-text">
                  <h3>سرویس‌های خواب</h3>
                  <p>۲ اتاق، ۱ تخت دو نفره، ۱ تخت یک نفره، ۱ رختخواب سنتی</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">▣</div>

                <div className="detail-text">
                  <h3>سرویس‌های بهداشتی</h3>
                  <p>۱ سرویس ایرانی، سرویس فرنگی ندارد، ۱ حمام</p>
                </div>
              </div>
            </div>
  )
}

export default Details