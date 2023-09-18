import classNames from "classnames";
import styles from "./MasterButton.module.css";

const MasterButton = ({
  name,
  handleClick = () => {},
  className = null,
  type = null,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        styles.masterBtn,
        { [className]: className },
        {
          [styles.disabled]: disabled,
        }
      )}
    >
      {name}
    </button>
  );
};

export default MasterButton;
