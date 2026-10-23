import { useState } from "react";
import "./App.css";

import vehicleData from "./data/vehicleData";
import BikeCard from "./components/BikeCard";
import PUCDetails from "./components/PUCDetails";
import InsuranceDetails from "./components/InsuranceDetails";
import DrivingLicenseDetails from "./components/DrivingLicenseDetails";
import ChallanList from "./components/ChallanList";

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("challan");

  function searchVehicle() {
    let foundVehicle = null;
    let enteredNumber = registrationNumber.trim().toUpperCase();

    if (enteredNumber === "") {
      setSelectedVehicle(null);
      setMessage("Please enter a registration number.");
      return;
    }

    for (let i = 0; i < vehicleData.length; i++) {
      if (
        vehicleData[i].registrationNumber.toUpperCase() === enteredNumber
      ) {
        foundVehicle = vehicleData[i];
        break;
      }
    }

    if (foundVehicle !== null) {
      setSelectedVehicle(foundVehicle);
      setMessage("");
      setActiveSection("challan");
    } else {
      setSelectedVehicle(null);
      setMessage("Vehicle not found in sample data.");
    }
  }

  return (
    <div className="app-container">
      <img
        src="/dont-drink-drive.png"
        alt="Don't drink and drive safety awareness"
        className="safety-banner"
      />

      <h1>e-Challan</h1>

      <h2>Enter Vehicle Registration Number</h2>

      <form
        className="search-form"
        onSubmit={function (event) {
          event.preventDefault();
          searchVehicle();
        }}
      >
        <input
          type="text"
          placeholder="Example: TS09AB1234"
          value={registrationNumber}
          onChange={function (event) {
            setRegistrationNumber(event.target.value);
          }}
          aria-label="Vehicle registration number"
        />

        <button type="submit">Search Vehicle</button>
      </form>

      {message !== "" && (
        <p className="message" role="status">
          {message}
        </p>
      )}

      {selectedVehicle !== null && (
        <div className="vehicle-results">
          <BikeCard vehicle={selectedVehicle} />

          <div className="details-buttons">
            <button
              type="button"
              className={
                activeSection === "challan" ? "active-button" : ""
              }
              aria-pressed={activeSection === "challan"}
              onClick={function () {
                setActiveSection("challan");
              }}
            >
              Challan Details
            </button>

            <button
              type="button"
              className={
                activeSection === "license" ? "active-button" : ""
              }
              aria-pressed={activeSection === "license"}
              onClick={function () {
                setActiveSection("license");
              }}
            >
              Driving License
            </button>

            <button
              type="button"
              className={
                activeSection === "puc" ? "active-button" : ""
              }
              aria-pressed={activeSection === "puc"}
              onClick={function () {
                setActiveSection("puc");
              }}
            >
              PUC Details
            </button>

            <button
              type="button"
              className={
                activeSection === "insurance" ? "active-button" : ""
              }
              aria-pressed={activeSection === "insurance"}
              onClick={function () {
                setActiveSection("insurance");
              }}
            >
              Insurance Details
            </button>
          </div>

          <div className="selected-details">
            {activeSection === "challan" && (
              <ChallanList challans={selectedVehicle.challans} />
            )}

            {activeSection === "license" && (
              <DrivingLicenseDetails vehicle={selectedVehicle} />
            )}

            {activeSection === "puc" && (
              <PUCDetails puc={selectedVehicle.puc} />
            )}

            {activeSection === "insurance" && (
              <InsuranceDetails insurance={selectedVehicle.insurance} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;