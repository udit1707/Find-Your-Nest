import MasterButton from "../../ui/MasteryButton/MasterButton";
import styles from "./RentalHomeCard.module.css";
import classNames from "classnames";
import { FaRupeeSign } from "react-icons/fa";

const RentalHomeCard = ({
  img,
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
          src="https://nestaway-houses.s3.ap-southeast-1.amazonaws.com/uploads/images/thumb_large_427cbd10-2055-4076-8415-475a455be3b1.png"
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
          <MasterButton name="Book Now" />
          <MasterButton name="View Details" className={styles.detailsBtn} />
        </div>
      </div>
    </div>
  );
};

export default RentalHomeCard;
