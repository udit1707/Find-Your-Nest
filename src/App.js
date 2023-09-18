import { useEffect } from "react";
import "./App.css";
import RentalHomeDetails from "./components/RentalHomeDetails";
import RentalHomeList from "./components/RentalHomeList/RentalHomeList";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRentalHomesData } from "./store/rentalHome";
import RentalBookingForm from "./components/RentalBookingForm";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRentalHomesData());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<RentalBookingForm />} path="/book-home/:id" />
        <Route element={<RentalHomeDetails />} path="/view-home/:id" />
        <Route path="/" element={<RentalHomeList />} />
      </Routes>
    </div>
  );
}

export default App;
