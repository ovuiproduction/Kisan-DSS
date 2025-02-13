import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../static/css/intel-market-price.css";

export default function IntelMarketPrice() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sourceDistrict, setSourceDistrict] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [commodity, setCommodity] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const districtMarkets = {
    Kolhapur: ["Kolhapur", "Vadgaonpeth"],
    Pune: ["Pune", "Pune(Pimpri)", "Junnar(Otur)", "Manchar"],
    Sangli: ["Sangli", "Vita", "Islampur"],
    Satara: ["Vai", "Satara", "Phaltan"],
    Solapur: ["Akluj", "Pandharpur", "Solapur"],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!commodity || !year || !month || !selectedDistrict || !sourceDistrict) {
      alert("Please fill all fields before submitting.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("commodity", commodity);
      formData.append("year", year);
      formData.append("month", month);
      formData.append("district", selectedDistrict);
      formData.append("sourceDistrict", sourceDistrict);

      const response = await axios.post(
        "http://localhost:5000/intel-market-price",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);
      navigate("/intel-market-selection-result", { state: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the server.");
      setLoading(false); // Fix: Ensure loading stops on error
    }
  };


  return (
    <div className="intel-market-price-root">
      <nav className="intel-price-nav">
        <div className="intel-header-logotext">
          Krishi Market Guide &ndash; <i>Sell for profit</i>
        </div>
        <div className="intel-header-content">
          <a href="/home">Home</a>
          <a href="/home">Kisan Guide</a>
          <a href="/home">Help</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <div className="main-market-form-block">
        <form onSubmit={handleSubmit}>
          <div className="sub-yield-form-block">
            <div className="yield-formcontent">
              <label>Commodity : </label>
              <select
                className="intel-price-input"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
              >
                <option value="">Select Commodity</option>
                <option value="Bajra">Bajra</option>
                <option value="Barley">Barley</option>
                <option value="Cotton">Cotton</option>
                <option value="Gram">Gram</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Jowar">Jowar</option>
                <option value="Maize">Maize</option>
                <option value="Masoor">Masoor</option>
                <option value="Moong">Moong</option>
                <option value="Soyabean">Soyabean</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Tur">Tur</option>
                <option value="Urad">Urad</option>
                <option value="Wheat">Wheat</option>
              </select>
            </div>

            <div className="yield-formcontent">
              <label>Year:</label>
              <input
                className="intel-price-input"
                type="number"
                min="2000"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="yield-formcontent">
              <label>Month:</label>
              <select
                className="intel-price-input"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div className="yield-formcontent">
              <label>Farm District:</label>
              <select
                className="intel-price-input"
                value={sourceDistrict}
                onChange={(e) => setSourceDistrict(e.target.value)}
              >
                <option value="">Select Source District</option>
                {Object.keys(districtMarkets).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="yield-formcontent">
              <label>Market District:</label>
              <select
                className="intel-price-input"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select Destination District</option>
                {Object.keys(districtMarkets).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loader Animation */}
          {loading && (
              <div className="loader-container">
              <div className="spinner"></div>
              <p>Processing...</p>
            </div>
          )}

          {/* Submit Button (Only Show When Not Loading) */}
          {!loading && (
            <div className="btn-block">
              <button id="predict_btn" className="submitbtn" type="submit">
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
