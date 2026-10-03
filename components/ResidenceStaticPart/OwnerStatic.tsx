import { ResidenceDetail } from "@/Types/FilterCategoryMainPageWithDetails.types";

interface OwnerStaticProps {
  residence: ResidenceDetail;
}

const OwnerStatic = ({ residence }: OwnerStaticProps) => {
  return (
    <section className="owner-part">
      <div className="owner-profile">
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

        <p>مالک ویلا</p>
      </div>

      <p>
        میانگین {residence.average_ratings}
        <br />
        از 5 امتیاز
      </p>

      <button>مشاهده پروفایل میزبان</button>
    </section>
  );
};

export default OwnerStatic;