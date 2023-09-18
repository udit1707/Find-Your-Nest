import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { rentalHomeDetailsSelector } from "../../selectors/rentalHome";
import { bookHome } from "../../store/rentalHome";
import MasterButton from "../../ui/MasteryButton/MasterButton";
import styles from "./RentalBookingForm.module.css";

const RentalBookingForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const rentalHome = useSelector(rentalHomeDetailsSelector(Number(id)));
  const givenDate = new Date(rentalHome?.available_from);
  const [formData, setFormData] = useState({
    username: {
      val: "",
      errors: "",
    },
    address: {
      val: "",
      errors: "",
    },
    contact: {
      val: "",
      errors: "",
    },
    date: {
      val: "",
      errors: "",
    },
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: {
        ...formData.name,
        val: value,
      },
    });
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      username: "",
      address: "",
      contact: "",
      date: "",
    };

    if (formData.username.val.trim() === "") {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (formData.address.val.trim() === "") {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (formData.contact.val.trim() === "") {
      newErrors.contact = "Contact is required";
      valid = false;
    }

    const enteredDate = new Date(formData.date.val);
    console.log(enteredDate, givenDate);
    if (isNaN(enteredDate.getTime()) || enteredDate < givenDate) {
      console.log("Error");
      newErrors.date = "Enter a valid date greater than or equal to 2023-09-23";
      valid = false;
    }

    console.log(valid);

    setFormData((prev) => {
      return {
        ...prev,
        username: {
          ...prev.username,
          errors: newErrors.username,
        },
        address: {
          ...prev.address,
          errors: newErrors.address,
        },
        contact: {
          ...prev.contact,
          errors: newErrors.contact,
        },
        date: {
          ...prev.date,
          errors: newErrors.date,
        },
      };
    });

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting...");
    console.log(validateInputs());
    if (validateInputs()) {
      console.log("working...");
      // Handle form submission here
      console.log("Form submitted:", formData);
      dispatch(bookHome(rentalHome.id));
      setSuccess(true);
    }
  };

  if (!rentalHome) {
    return <div>Booking Not Available </div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.cnt}>
        <h2>Book Your Rental Home Today</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputCnt}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username.val}
              onChange={handleInputChange}
            />
            <span className={styles.errorStatus}>
              {formData.username.errors}
            </span>
          </div>
          <div className={styles.inputCnt}>
            <label htmlFor="address">Primary Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address.val}
              onChange={handleInputChange}
            />
            <span className={styles.errorStatus}>
              {formData.address.errors}
            </span>
          </div>
          <div className={styles.inputCnt}>
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact.val}
              onChange={handleInputChange}
            />
            <span className={styles.errorStatus}>
              {formData.contact.errors}
            </span>
          </div>
          <div className={styles.inputCnt}>
            <label htmlFor="date">Booking Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date.val}
              onChange={handleInputChange}
            />
            <span className={styles.errorStatus}>{formData.date.errors}</span>
          </div>
          <MasterButton
            type="submit"
            name="Submit"
            disabled={!rentalHome.canBook}
            className={styles.btn}
          />
        </form>
        {success && <h1 className={styles.successLabel}>Booking Confirmed</h1>}
        {!success && !rentalHome.canBook && (
          <h1 className={styles.closedLabel}>Booking Closed</h1>
        )}
        <div className={styles.btnCnt}>
          <Link to={`/view-home/${rentalHome.id}`} className={styles.detailsBtn}>
            <MasterButton name="Property Details" className={styles.navBtn}/>
          </Link>
          <Link to="/" className={styles.homeBtn}>
            <MasterButton name="Home" className={styles.navBtn}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalBookingForm;
