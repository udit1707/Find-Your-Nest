import { useDispatch, useSelector } from "react-redux";
import {
  rentalsDataSelector,
  rentalsLoaderSelector,
} from "../../selectors/rentalHome";
import RentalHomeCard from "../RentalHomeCard/RentalHomeCard";
import { useEffect } from "react";
import { getRentalHomesData } from "../../store/rentalHome";
import styles from "./RentalHomeList.module.css";

const RentalHomeList = () => {
  const dispatch = useDispatch();
  const { isLoading, loadError } = useSelector(rentalsLoaderSelector);
  const { list } = useSelector(rentalsDataSelector);

  useEffect(() => {
    console.log("running");
    if (list.length === 0) {
      dispatch(getRentalHomesData());
    }
  }, []);

  console.log("listttt", list);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (loadError) {
    <h1>Error.</h1>;
  } else if (list?.length > 0) {
    return (
      <div className={styles.grid}>
        {list.map((i, index) => {
          if (i.available_from.length > 0) {
            return (
              <RentalHomeCard
                img="https://homerealestate.cz/uploads/cache/uploads/p/f4/f4dcd577b3d65445586a13df798e5e85b133450e_1024x660.JPG"
                title={i.title}
                nestawayId={i.nestaway_id}
                location={`${i.locality}, ${i.sublocality_level1}, ${i.city}`}
                rent={i.rent}
                deposit={i.advance}
                key={i.id}
                className={styles.item}
              />
            );
          }
        })}
      </div>
    );
  }
};

export default RentalHomeList;
