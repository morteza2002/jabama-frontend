import {
  faFire,
  faKitchenSet,
  faMobileScreen,
  faPercent,
  faSnowflake,
  faSquareParking,
  faToilet,
  faUserPlus,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const FearurePart = () => {
  const [showpossiblebtn, SetShowpossiblebtn] = useState(false);
  return (
    <section className="villa-features">
      <h2>امکانات مهم ویلا</h2>

      <div className="features-grid">
        <div className="feature-item">
          <FontAwesomeIcon icon={faMobileScreen} />
          <span>آنتن‌دهی موبایل</span>
        </div>

        <div className="feature-item">
          <FontAwesomeIcon icon={faSnowflake} />
          <span>سیستم سرمایشی</span>
        </div>

        <div className="feature-item">
          <FontAwesomeIcon icon={faFire} />
          <span>سیستم گرمایشی</span>
        </div>

        <div className="feature-item">
          <FontAwesomeIcon icon={faKitchenSet} />
          <span>اجاق گاز</span>
        </div>

        <div className="feature-item">
          <FontAwesomeIcon icon={faUtensils} />
          <span>لوازم سرو غذا</span>
        </div>

        <div className="feature-item">
          {/* <FontAwesomeIcon icon={} /> */}
          <span>یخچال</span>
        </div>

        <div className="feature-item disabled">
          <FontAwesomeIcon icon={faSquareParking} />
          <span>پارکینگ</span>
        </div>

        <div className="feature-item disabled">
          <FontAwesomeIcon icon={faToilet} />
          <span>سرویس بهداشتی فرنگی</span>
        </div>
      </div>

      <button
        className="show-all-features"
        onClick={() => SetShowpossiblebtn(!showpossiblebtn)}
      >
        مشاهده همه امکانات (۱۸ مورد)
      </button>
      {showpossiblebtn && (
        <div className="showpossiblebtn-panel">
          <div className="amenities-header">
            <h3>امکانات اقامتگاه</h3>
            <button
              className="amenities-close"
              onClick={() => SetShowpossiblebtn(false)}
            >
              ×
            </button>
          </div>

          <div className="amenities-scroll">
            <section className="amenity-section">
              <h4>پایه</h4>

              <div className="amenity-grid">
                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/c700cae7-b819-41e0-b88d-61493bbfc360.svg" />
                  <span>آب</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/ffc6babc-5f01-40db-8999-30ae7632d9f1.svg" />
                  <span>برق</span>
                </div>

                <div className="amenity-item">
                  <span className="amenity-no-icon">گاز</span>
                </div>
              </div>
            </section>

            <section className="amenity-section">
              <h4>بهداشتی</h4>

              <div className="amenity-grid">
                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/804f3d7b-993a-44aa-9d61-4ea16a28dcc0.svg" />
                  <div>
                    <span>سرویس بهداشتی ایرانی</span>
                    <small>خصوصی</small>
                  </div>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/241e315c-578b-463b-bd1f-ef1aa9ac801a.svg" />
                  <div>
                    <span>حمام</span>
                    <small>خصوصی</small>
                  </div>
                </div>
              </div>
            </section>

            <section className="amenity-section">
              <h4>آشپزخانه</h4>

              <div className="amenity-grid">
                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/f94cfe17-0169-4894-a06f-d993cf3ea244.svg" />
                  <span>لوازم سرو غذا</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/58c2a5e9-eb55-403f-badc-195b04300a4e.svg" />
                  <span>اجاق گاز</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/e9851a1b-a2e2-4751-a5c1-025918074d16.svg" />
                  <span>یخچال</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/c1d14ade-a7ba-4f3e-9826-2e85676bf29d.svg" />
                  <div>
                    <span>آشپزخانه</span>
                    <small>خصوصی</small>
                  </div>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/469faf28-a5b4-4ab9-8082-13dd60e1ad8d.svg" />
                  <span>وسایل پخت و پز</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/61265a16-ca31-4cf6-85dd-2f2f433343f5.svg" />
                  <span>میز نهارخوری</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/032f8c2b-214d-47ec-bb6a-52dfc6f27c2d.svg" />
                  <span>کابینت</span>
                </div>
              </div>
            </section>

            <section className="amenity-section">
              <h4>رفاهی</h4>

              <div className="amenity-grid">
                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/image/jabama-images/0/ef0e3c7d-9bf2-4da8-9753-8cb528d34fa0.png" />
                  <div>
                    <span>آنتن‌دهی موبایل</span>
                    <small>
                      رایتل 4G/LTE · همراه اول 4G/LTE · ایرانسل 4G/LTE
                    </small>
                  </div>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/image/jabama-images/0/6120bc8c-38d9-4957-ada6-13798627d090.png" />
                  <div>
                    <span>سیستم سرمایشی</span>
                    <small>کولر گازی · پنکه سقفی</small>
                  </div>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/5c45f09e-c5d8-49de-a17f-af987186e8d4.svg" />
                  <div>
                    <span>سیستم گرمایشی</span>
                    <small>بخاری گازی</small>
                  </div>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/251b5d73-3e95-418c-8f2a-32ee3313d467.svg" />
                  <span>مبلمان</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/21531228-94f0-40bf-be24-26464a9c7407.svg" />
                  <span>تلویزیون</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/4115404a-3f7d-4f62-b8c7-1c58d3126ad9.svg" />
                  <span>گیرنده دیجیتال ایران</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/347ab7d5-454d-46d6-878a-742a129e4c5a.svg" />
                  <span>جاروبرقی</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/f5daf425-f074-408a-be0e-c4728c0f4f97.svg" />
                  <span>اتو</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/ae7e4388-5da7-41de-a12a-e688678bafe8.svg" />
                  <span>جالباسی</span>
                </div>
              </div>
            </section>

            <section className="amenity-section">
              <h4>محیطی</h4>

              <div className="amenity-grid">
                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/d4e3b859-0a41-4e28-92d2-42ab42605af6.svg" />
                  <div>
                    <span>پارکینگ</span>
                    <small>ظرفیت خودرو: ۷ · سرباز · اشتراکی</small>
                  </div>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/b6487f6b-286c-4757-a4b7-8953721e1553.svg" />
                  <span>بالکن</span>
                </div>

                <div className="amenity-item">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/08fe7940-7627-4ead-96e3-3404a308d5f9.svg" />
                  <span>باربیکیو</span>
                </div>
              </div>
            </section>

            <section className="amenity-section unavailable-section">
              <h4>امکاناتی که در اقامتگاه فراهم نیست</h4>

              <div className="amenity-grid">
                <div className="amenity-item unavailable">
                  <img src="https://cdn.jabama.com/original/jabama-images/0/70af058b-97f1-4cc8-9fed-27041944ab31.svg" />
                  <span>سرویس بهداشتی فرنگی</span>
                </div>

                <div className="amenity-item unavailable">
                  <img src="https://cdn.jabama.com/image/jabama-images/0/00f98674-75a4-47ca-9f3d-e33a32d42c39.png" />
                  <span>استخر</span>
                </div>
              </div>
            </section>

            <div className="amenities-note">
              <strong>توجه:</strong>
              برای اطلاعات و جزییات بیشتر در مورد امکانات اقامتگاه به بخش
              توضیحات بیشتر مراجعه کنید.
            </div>
          </div>
        </div>
      )}

      <div className="features-bottom">
        <div className="extra-section">
          <div className="extra-title">
            <FontAwesomeIcon icon={faUserPlus} />
            <h3>نفر اضافه</h3>
          </div>

          <p>
            هزینه‌ای که برای نفرات بیش از استاندارد (سرویس خواب ۹ و ...) به مبلغ
            رزرو اضافه می‌شود.
          </p>

          <strong>قیمت هر نفر اضافه به ازای هر شب: ۲۵۰ هزار تومان</strong>
        </div>

        <div className="extra-section">
          <div className="extra-title">
            <FontAwesomeIcon icon={faPercent} />
            <h3>تخفیف‌ها</h3>
          </div>

          <p>۱۰٪ تخفیف لحظه آخری</p>
          <p>۲۰٪ تخفیف اقامت بالای ۲۸ شب</p>
          <p>۱۷٪ تخفیف اقامت بالای ۱۴ شب</p>
          <p>۱۴٪ تخفیف اقامت بالای ۷ شب</p>
          <p>۸٪ تخفیف اقامت بالای ۳ شب</p>
        </div>
      </div>
    </section>
  );
};

export default FearurePart;
