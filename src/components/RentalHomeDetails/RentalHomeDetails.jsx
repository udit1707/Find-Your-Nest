import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { rentalHomeDetailsSelector } from "../../selectors/rentalHome";
import MasterButton from "../../ui/MasteryButton/MasterButton";
import styles from "./RentalHomeDetails.module.css";

const AmenityUI = ({ amenties }) => {
  if (amenties.length === 0)
    return <div className={styles.amentites}>No Amenities Available!</div>;
  else {
    return (
      <ul className={styles.amentites}>
        {amenties.map((i, index) => {
          return (
            <div className={styles.amenity} key={index}>
              <div className={styles.icon}>
                <img
                  src={i.icon_url}
                  alt="icon"
                  className={styles.amenityIcon}
                />
              </div>
              <div className={styles.amenityName}>{i.amenity}</div>
            </div>
          );
        })}
      </ul>
    );
  }
};

const RentalHomeDetails = () => {
  const { id } = useParams();
  const rentalHome = useSelector(rentalHomeDetailsSelector(Number(id)));

  if (rentalHome) {
    return (
      <div className={styles.viewDetails}>
        <div className={styles.card}>
          <div className={styles.mainCnt}>
            <div className={styles.header}>{rentalHome.title}</div>
            <div className={styles.imgCnt}>
              <img
                className={styles.img}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpv2Vx_IqFRfjZWWHs2bUZ_jRKMx-SEWxCsB-rF_ES6sfWAKfQqlOTRUCvTcLBT9R5ijA&usqp=CAU"
                alt="img-rental-home"
              />
            </div>
            <div className={styles.datesAvailable}>
              <div className={styles.dateLabel}>Booking From: </div>{" "}
              <div className={styles.date}>
                {rentalHome.canBook
                  ? rentalHome.available_from
                  : "Not Available"}
              </div>
            </div>
            <div className={styles.desc}>
              {rentalHome.description.short_description}
            </div>
            <div className={styles.amenityLabel}>Amenity List: </div>
            <AmenityUI amenties={rentalHome.amenity_list} />
          </div>

          <div className={styles.btnContainer}>
            <Link to={`/book-home/${rentalHome.id}`} className={styles.homeBtn}>
              <MasterButton name="Book Rental Home" className={styles.btn} />
            </Link>
            <Link to="/" className={styles.homeBtn}>
              <MasterButton name="Home" className={styles.btn} />
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Not Found....</div>;
  }
};

export default RentalHomeDetails;
