import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../static/css/intel-price.css";

export default function IntelPrice() {
  const [commodity, setCommodity] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    
    if (!commodity || !year || !month) {
      setError("Please fill all the fields before submitting.");
      return;
    }

    const formData = {
      commodity,
      year,
      month,
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/intel-wpi-price", formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = response.data;
        console.log(responseData)
        navigate("/intel-price-result", { state: responseData });
      setSuccess("Data submitted successfully!");
      console.log("Response: ", response.data);
    } catch (err) {
      setError("Failed to send data. Please try again.");
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intel-price-root">
      <nav className="intel-price-nav">
        <div className="intel-header-logotext">
          Kisan Dhan &ndash; <i>Data driven crop price prediction engine</i>
        </div>
        <div className="intel-header-content">
          <a href="/home">Home</a>
          <a href="/home">Kisan Guide</a>
          <a href="/home">Help</a>
          <a href="">Contact</a>
        </div>
      </nav>
      <div className="outer_form_block">
        <form onSubmit={handleSubmit}>
          <div className="form-block">
            <div className="formcontent">
              <label>Commodity: </label>
              <select
                className="intel-price-input"
                name="commodity"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
              >
                <option value="">Select Commodity</option>
                {["Bajra", "Barley", "Cotton", "Gram", "Groundnut", "Jowar", "Maize", "Masoor", "Moong", "Soyabean", "Sugarcane", "Tur", "Urad", "Wheat"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="formcontent">
              <label>Year: </label>
              <input
                className="intel-price-input"
                name="year"
                type="text"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="formcontent">
              <label>Select Month: </label>
              <select
                className="intel-price-input"
                name="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {["1 - January", "2 - February", "3 - March", "4 - April", "5 - May", "6 - June", "7 - July", "8 - August", "9 - September", "10 - October", "11 - November", "12 - December"].map((item, index) => (
                  <option key={index + 1} value={index + 1}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <div className="btn-block">
            <button id="predict_btn" className="submitbtn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            {loading && <div id="loader" className="loader"></div>}
          </div>
        </form>
      </div>
    </div>
  );
}
