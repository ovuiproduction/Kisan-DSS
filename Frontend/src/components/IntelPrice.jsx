import React from "react";

import "../static/css/intel-price.css";

export default function IntelPrice() {
  return (
    <div className="intel-price-root">
      <nav className="intel-price-nav">
        <div class="intel-header-logotext">Kisan Dhan &ndash; <i>Data driven crop price prediction engine</i></div>
        <div class="intel-header-content">
            <a href="/home">Home</a>
            <a href="/home">Kisan Guide</a>
            <a href="/home">Help</a>
            <a href="">contact</a>
        </div>
      </nav>
      <div class="outer_form_block">
        <form>
          <div class="form-block">
            <div class="formcontent">
              <label>Commodity : </label>
              <select className="intel-price-input" name="commodity">
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

            <div class="formcontent">
              <label for="year">Year : </label>
              <input
                className="intel-price-input"
                name="year"
                type="text"
                placeholder="Enter year"
              />
            </div>

            <div class="formcontent">
              <label for="month">Select Month : </label>
              <select className="intel-price-input" id="month" name="month">
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
