import React, { useState } from "react";
import axios from "axios";
import "../static/css/intel-market-price.css";

export default function IntelMarketPrice() {
  const districtMarkets = {
    Kolhapur: ["Kolhapur", "Vadgaonpeth"],
    Pune: [
      "Pune",
      "Pune(Pimpri)",
      "Junnar(Otur)",
      "Pune(Moshi)",
      "Junnar(Alephata)",
      "Manchar",
      "Junnar",
      "Nira(Saswad)",
      "Pune(Khadiki)",
      "Shirur",
      "Baramati",
      "Nira",
      "Khed(Chakan)",
      "Bhor",
      "Pune(Manjri)",
      "Indapur(Nimgaon Ketki)",
      "Dound",
      "Indapur",
      "Mulshi",
      "Junnar(Narayangaon)",
      "Indapur(Bhigwan)",
    ],
    Sangli: [
      "Sangli",
      "Vita",
      "Islampur",
      "Sangli(Miraj)",
      "Palus",
      "Sangli(Phale, Bhajipura Market)",
      "Tasgaon",
    ],
    Satara: [
      "Vai",
      "Satara",
      "Phaltan",
      "Vaduj",
      "Karad",
      "Koregaon",
      "Lonand",
    ],
    Solapur: [
      "Akluj",
      "Laxmi Sopan Agriculture Produce Marketing Co Ltd",
      "Pandharpur",
      "Mangal Wedha",
      "Mohol",
      "Kurdwadi(Modnimb)",
      "Karmala",
      "Barshi",
      "Solapur",
      "Dudhani",
      "Akkalkot",
      "Barshi(Vairag)",
      "Kurdwadi",
    ],
  };

  // State to store form values
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [commodity, setCommodity] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [marketPriceData, setMarketPriceData] = useState(null);

  // Handle district change
  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!commodity || !year || !month || !selectedDistrict) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("commodity", commodity);
      formData.append("year", year);
      formData.append("month", month);
      formData.append("district", selectedDistrict);

      // Send request to backend
      const response = await axios.post(
        "http://localhost:5000/intel-market-price",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Store response in state
      const responseData = response.data;
      setMarketPriceData(response.data);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the server.");
    }
  };

  return (
    <div className="intel-yield-root">
      <nav className="intel-price-nav">
        <div className="intel-header-logotext">
          Krishi Market Guide &ndash; <i>Sell for profit</i>
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
              <label>Year : </label>
              <input
                className="intel-price-input"
                type="number"
                placeholder="Enter year"
                min="2000"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="yield-formcontent">
              <label>Month : </label>
              <select
                className="intel-price-input"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <div className="yield-formcontent">
              <label>District : </label>
              <select
                className="intel-price-input"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">Select District</option>
                {Object.keys(districtMarkets).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="btn-block">
            <button id="predict_btn" className="submitbtn" type="submit">
              Submit
            </button>
            <div id="loader" className="loader"></div>
          </div>
        </form>

        {marketPriceData && (
          <div className="response-container">
            <h3>Market Price Data</h3>
            <table>
              <thead>
                <tr>
                  <th>Market</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(marketPriceData).map(([market, price]) => (
                  <tr key={market}>
                    <td>{market}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
