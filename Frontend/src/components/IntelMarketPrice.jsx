import React, { useState } from "react";

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

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [marketOptions, setMarketOptions] = useState([]);

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setMarketOptions(districtMarkets[district] || []);
  };

  return (
    <div className="intel-yield-root">
      <nav className="intel-price-nav">
        <div class="intel-header-logotext">
          Krishi Market Guide &ndash; <i>Sell for profit</i>
        </div>
        <div class="intel-header-content">
          <a href="/home">Home</a>
          <a href="/home">Kisan Guide</a>
          <a href="/home">Help</a>
          <a href="">contact</a>
        </div>
      </nav>
      <div class="main-yield-form_block">
        <form>
          <div class="sub-yield-form-block">
            <div class="yield-formcontent">
              <label>Commodity : </label>
              <select className="intel-price-input">
                <option value="">Commodity</option>
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

            <div class="yield-formcontent">
              <label for="year">Year : </label>
              <input
                className="intel-price-input"
                type="text"
                placeholder="Enter year"
                min="1"
              />
            </div>

            <div class="yield-formcontent">
              <label for="month">Select Month : </label>
              <select className="intel-price-input">
                <option value="">Select Month</option>
                <option value="1">1 - January</option>
                <option value="2">2 - February</option>
                <option value="3">3 - March</option>
                <option value="4">4 - April</option>
                <option value="5">5 - May</option>
                <option value="6">6 - June</option>
                <option value="7">7 - July</option>
                <option value="8">8 - August</option>
                <option value="9">9 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>

            <div className="yield-formcontent">
              <label for="district">Select District : </label>
              <select value={selectedDistrict} onChange={handleDistrictChange}>
                <option value="">Select District</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Pune">Pune</option>
                <option value="Sangli">Sangli</option>
                <option value="Satara">Satara</option>
                <option value="Solapur">Solapur</option>
              </select>
            </div>

            {/* <div className="yield-formcontent">
              <label for="market">Select Market : </label>
              <select>
                <option value="">Select Market</option>
                {marketOptions.map((market, index) => (
                  <option key={index} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          <div class="btn-block">
            <button id="predict_btn" class="submitbtn">
              Submit
            </button>
            <div id="loader" class="loader"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
