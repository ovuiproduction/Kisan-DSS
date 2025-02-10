import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../static/css/intel-yield.css";

export default function IntelYield() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    year: "",
    commodity: "",
    district: "",
    area: "",
    soilColor: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    fertilizer: "",
    pH: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill in ${key}`);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/intel-yield",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      // Navigate to result page with received data
      navigate("/intel-yield-result", { state: responseData });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to get yield prediction. Try again.");
    }
  };

  return (
    <div className="intel-yield-root">
      <nav className="intel-price-nav">
        <div className="intel-header-logotext">
          Kisan Utpann &ndash;{" "}
          <i>Weather driven crop yield insights for your Region</i>
        </div>
        <div className="intel-header-content">
          <a href="/home">Home</a>
          <a href="/home">Kisan Guide</a>
          <a href="/home">Help</a>
          <a href="">Contact</a>
        </div>
      </nav>
      <div className="main-yield-form_block">
        <form onSubmit={handleSubmit}>
          <div className="sub-yield-form-block">
            <div className="yield-formcontent">
              <label>Commodity : </label>
              <select
                name="commodity"
                className="intel-price-input"
                value={formData.commodity}
                onChange={handleChange}
              >
                <option value="">Select Commodity</option>
                {[
                  "Bajra",
                  "Barley",
                  "Cotton",
                  "Gram",
                  "Groundnut",
                  "Jowar",
                  "Maize",
                  "Masoor",
                  "Moong",
                  "Soyabean",
                  "Sugarcane",
                  "Tur",
                  "Urad",
                  "Wheat",
                ].map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div className="yield-formcontent">
              <label htmlFor="year">Year : </label>
              <input
                name="year"
                className="intel-price-input"
                type="text"
                placeholder="Enter year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            
            <div className="yield-formcontent">
              <label htmlFor="district">Select District : </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
              >
                <option value="">Select District</option>
                {["Kolhapur", "Pune", "Sangli", "Satara", "Solapur"].map(
                  (dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="yield-formcontent">
              <label htmlFor="area">Cultivation Area : </label>
              <input
                name="area"
                className="intel-price-input"
                type="number"
                placeholder="Enter Area in hectare"
                min="0"
                step="0.01"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div className="yield-formcontent">
              <label htmlFor="soilColor">Soil Color:</label>
              <select
                id="soilColor"
                name="soilColor"
                className="intel-price-input"
                value={formData.soilColor}
                onChange={handleChange}
              >
                <option value="">Select Soil Color</option>
                <option value="Medium Brown">Medium Brown</option>
                <option value="Black">Black</option>
                <option value="Dark Brown">Dark Brown</option>
                <option value="Red">Red</option>
                <option value="Reddish Brown">Reddish Brown</option>
                <option value="Light Brown">Light Brown</option>
              </select>
            </div>

            <div className="yield-formcontent">
              <label htmlFor="fertilizer">Select Fertilizer :</label>
              <select
                name="fertilizer"
                value={formData.fertilizer}
                onChange={handleChange}
              >
                <option value="">Select Fertilizer</option>
                {[
                  "Urea",
                  "10:26:26 NPK",
                  "Dark Brown",
                  "SSP",
                  "MOP",
                  "18:46:00 NPK",
                  "Chilated Micronutrient",
                  "DAP",
                  "Black",
                  "12:32:16 NPK",
                  "20:20:20 NPK",
                ].map((fertilizer) => (
                  <option key={fertilizer} value={fertilizer}>
                    {fertilizer}
                  </option>
                ))}
              </select>
            </div>

            <div className="yield-formcontent">
              <label htmlFor="nitrogen">Nitrogen : </label>
              <input
                name="nitrogen"
                className="intel-price-input"
                type="number"
                placeholder="Enter Nitrogen"
                min="0"
                step="0.01"
                value={formData.nitrogen}
                onChange={handleChange}
              />
            </div>

            <div className="yield-formcontent">
              <label htmlFor="phosphorus">Phosphorus : </label>
              <input
                name="phosphorus"
                className="intel-price-input"
                type="number"
                placeholder="Enter Phosphorus"
                min="0"
                step="0.01"
                value={formData.phosphorus}
                onChange={handleChange}
              />
            </div>

            <div className="yield-formcontent">
              <label htmlFor="potassium">Potassium : </label>
              <input
                name="potassium"
                className="intel-price-input"
                type="number"
                placeholder="Enter Potassium"
                min="0"
                step="0.01"
                value={formData.potassium}
                onChange={handleChange}
              />
            </div>

            <div className="yield-formcontent">
              <label htmlFor="pH">pH : </label>
              <input
                name="pH"
                className="intel-price-input"
                type="number"
                placeholder="Enter pH"
                min="0"
                step="0.01"
                value={formData.pH}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="btn-block">
            <button id="predict_btn" className="submitbtn" type="submit">
              Submit
            </button>
            <div id="loader" className="loader"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
