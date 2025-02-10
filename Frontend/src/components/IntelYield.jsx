import React from "react";

import "../static/css/intel-yield.css";

export default function IntelYield() {
  return (
    <div className="intel-yield-root">
      <nav className="intel-price-nav">
        <div class="intel-header-logotext">
          Kisan Utpann &ndash; <i>Weather driven crop yield insights for your Region</i>
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
              <select>
              <option value="">Select District</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Pune">Pune</option>
                <option value="Sangli">Sangli</option>
                <option value="Satara">Satara</option>
                <option value="Solapur">Solapur</option>
              </select>
            </div>
            <div className="yield-formcontent">
              <label for="area">Cultivation Area : </label>
              <input
                className="intel-price-input"
                type="number"
                placeholder="Enter Area in hecter"
                min="0"
              />
            </div>
            <div className="yield-formcontent">
              <label for="fertilizer">Select Fertilizer :</label>
              <select id="fertilizer" name="fertilizer">
                <option value="">Select Fertilizer</option>
                <option value="Urea">Urea</option>
                <option value="10:26:26 NPK">10:26:26 NPK</option>
                <option value="Dark Brown">Dark Brown</option>
                <option value="SSP">SSP</option>
                <option value="MOP">MOP</option>
                <option value="18:46:00 NPK">18:46:00 NPK</option>
                <option value="Chilated Micronutrient">
                  Chilated Micronutrient
                </option>
                <option value="DAP">DAP</option>
                <option value="Black">Black</option>
                <option value="12:32:16 NPK">12:32:16 NPK</option>
                <option value="20:20:20 NPK">20:20:20 NPK</option>
              </select>
            </div>

            <div className="yield-formcontent">
              <label for="Nitrogen">Nitrogen : </label>
              <input
                className="intel-price-input"
                type="number"
                placeholder="Enter Nitrogen"
                min="0"
              />
            </div>
            <div className="yield-formcontent">
              <label for="Phosphorus">Phosphorus : </label>
              <input
                className="intel-price-input"
                type="number"
                placeholder="Enter Phosphorus"
                min="0"
              />
            </div>
            <div className="yield-formcontent">
              <label for="Potassium">Potassium : </label>
              <input
                className="intel-price-input"
                type="number"
                placeholder="Enter Potassium"
                min="0"
              />
            </div>
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
