import React from 'react'

const DistanceInfo = () => {
  return (
     <section className="distance-info">
            <div className="info-section">
              <div className="head-info-road">
                <h2>اطلاعات و فاصله مراکز نزدیک ویلا</h2>
                <p className="description">
                  تمامی فواصل به صورت حدودی و در شرایط معمول ترافیکی می‌باشد.
                </p>
              </div>

              <div className="distance-list">
                <div className="distance-item">
                  <div>
                    <strong>قابل دسترسی با خودرو</strong>
                    <span>فاصله از دریا</span>
                  </div>
                  <span>زیر ۵ دقیقه</span>
                </div>

                <div className="distance-item">
                  <div>
                    <strong>قابل دسترسی به صورت پیاده</strong>
                    <span>فاصله از سوپرمارکت</span>
                    <span>فاصله از نانوایی</span>
                  </div>

                  <div>
                    <span>زیر ۵ دقیقه</span>
                    <span>۵ دقیقه</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rules-section">
              <h2>قوانین و مقررات ویلا</h2>

              <div className="time-boxes">
                <div className="time-box">
                  <div className="clock-icon">◷</div>
                  <strong>ساعت ورود</strong>
                  <span>۰۲:۰۰ (بعدازظهر)</span>
                </div>

                <div className="time-box">
                  <div className="clock-icon">◷</div>
                  <strong>ساعت خروج</strong>
                  <span>۱۲:۰۰ (ظهر)</span>
                </div>
              </div>

              <div className="cancel-section">
                <div className="section-title">
                  <span className="circle-minus">−</span>
                  <h3>قوانین لغو رزرو</h3>
                </div>

                <p>مشاهده دقیق جزئیات لغو رزرو ویلا</p>

                <div className="more">
                  <span>توضیحات بیشتر</span>
                  <span>‹</span>
                </div>
              </div>

              <div className="villa-rules">
                <div className="section-title">
                  <span className="document-icon">▤</span>
                  <h3>مقررات ویلا</h3>
                </div>

                <ul>
                  <li className="allowed">
                    <span>✓</span>
                    <p>پذیرش حیوانات خانگی</p>
                  </li>

                  <li className="allowed">
                    <span>✓</span>
                    <p>همراه داشتن مدارک محرمیت الزامی است.</p>
                  </li>

                  <li className="allowed">
                    <span>✓</span>
                    <p>همراه داشتن کارت ملی الزامی می‌باشد</p>
                  </li>

                  <li className="not-allowed">
                    <span>×</span>
                    <p>استعمال دخانیات مجاز نیست.</p>
                  </li>

                  <li className="not-allowed">
                    <span>×</span>
                    <p>ورود حیوانات خانگی مجاز نیست.</p>
                  </li>

                  <li className="not-allowed">
                    <span>×</span>
                    <p>برگزاری مراسم مجاز نیست.</p>
                  </li>

                  <li className="not-allowed">
                    <span>×</span>
                    <p>
                      پذیرش گروه‌های مجردی (فقط آقایان یا خانم‌ها) فراهم نیست.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
  )
}

export default DistanceInfo