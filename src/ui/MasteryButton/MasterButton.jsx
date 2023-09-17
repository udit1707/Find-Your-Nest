import classNames from "classnames";
import styles from "./MasterButton.module.css";

const MasterButton = ({ name, handleClick = () => {}, className = null }) => {
  return (
    <button
      onClick={handleClick}
      className={classNames(styles.masterBtn, { [className]: className })}
    >
      {name}
    </button>
  );
};

export default MasterButton;
