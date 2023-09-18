import { Link } from "react-router-dom";
import classNames from "classnames";

import { FaRupeeSign } from "react-icons/fa";
import MasterButton from "../../ui/MasteryButton/MasterButton";
import styles from "./RentalHomeCard.module.css";

const RentalHomeCard = ({
  id,
  img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpv2Vx_IqFRfjZWWHs2bUZ_jRKMx-SEWxCsB-rF_ES6sfWAKfQqlOTRUCvTcLBT9R5ijA&usqp=CAU",
  title = "2 BHK Apartment",
  location = "btm layout stage 2",
  rent = "12000",
  deposit = "60000",
  nestawayId = "N92646",
  className = null,
}) => {
  return (
    <div className={classNames(styles.card, { [className]: className })}>
      <div className={styles.imgContainer}>
        <img
          src={img}
          alt="property-img"
          className={styles.img}
        />
      </div>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.nestID}>{nestawayId}</span>
      </div>
      <div className={styles.location}>
        <span className={styles.highlight}>Location:</span>{" "}
        <span className={styles.loca}>{location}</span>
      </div>
      <div className={styles.footer}>
        <div className={styles.rentContainer}>
          <div className={styles.rent}>
            <div className={styles.label}>Rent</div>
            <div className={styles.value}>
              <FaRupeeSign />
              {rent}
            </div>
          </div>
          <div className={styles.rent}>
            <div className={styles.label}>Deposit</div>
            <div className={styles.value}>
              <FaRupeeSign />
              {deposit}
            </div>
          </div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.btnContainer}>
          <Link to={`/book-home/${id}`}>
            <MasterButton name="Book Now" className={styles.detailsBtn} />
          </Link>

          <Link to={`/view-home/${id}`}>
            <MasterButton name="View Details" className={styles.detailsBtn} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalHomeCard;
