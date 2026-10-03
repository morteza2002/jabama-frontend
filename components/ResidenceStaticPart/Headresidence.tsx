import { faHeart, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ResidenceDetail } from "../../Types/FilterCategoryMainPageWithDetails.types";

interface HeadresidenceProps {
  residence: ResidenceDetail;
}

const Headresidence = ({ residence }: HeadresidenceProps) => {
  return (
    <section className="head-residence">
      <h1>{residence.name}</h1>

      <div className="button-residence">
        <button>
          <FontAwesomeIcon
            style={{
              borderLeft: "1px solid #e0e0e0",
              paddingLeft: "10px",
              marginLeft: "10px",
            }}
            icon={faShareSquare}
          />
          اشتراک گذاری
        </button>

        <button>
          <FontAwesomeIcon
            style={{
              borderLeft: "1px solid #e0e0e0",
              paddingLeft: "10px",
              marginLeft: "10px",
            }}
            icon={faHeart}
          />
          افزودن به مورد علاقه ها
        </button>
      </div>
    </section>
  );
};

export default Headresidence;