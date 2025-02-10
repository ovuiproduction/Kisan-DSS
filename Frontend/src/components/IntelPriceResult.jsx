import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import "chart.js/auto";

import "../static/css/intel-price-result.css";

// import CropImages from "./CropImages";

export default function IntelPriceResult() {
  const location = useLocation()
  const {state} = location;
  console.log(state)

  const CropImages = {
    Bajra: require("../static/CropImages/Bajra.jpg"),
    Barley: require("../static/CropImages/Barley.jpg"),
    Cotton: require("../static/CropImages/Cotton.jpg"),
    Gram: require("../static/CropImages/Gram.jpg"),
    Groundnut: require("../static/CropImages/Groundnut.jpg"),
    Jowar: require("../static/CropImages/Jowar.jpg"),
    Maize: require("../static/CropImages/Maize.jpg"),
    Masoor: require("../static/CropImages/Masoor.jpg"),
    Moong: require("../static/CropImages/Moong.jpg"),
    Soyabean: require("../static/CropImages/Soyabean.jpg"),
    Sugarcane: require("../static/CropImages/Sugarcane.jpg"),
    Tur: require("../static/CropImages/Tur.jpg"),
    Urad: require("../static/CropImages/Urad.jpg"),
    Wheat: require("../static/CropImages/Wheat.jpg"),
  };
  

  const chartData = (labels, maxData, minData) => ({
    labels,
    datasets: [
      {
        label: "Max crop price per quintal",
        data: maxData,
        borderColor: "#36A2EB",
        backgroundColor: "#9BD0F5",
        borderWidth: 1,
      },
      {
        label: "Min crop price per quintal",
        data: minData,
        borderColor: "#FF6384",
        backgroundColor: "#FFB1C1",
        borderWidth: 1,
      },
    ],
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="intel-price-result-root">
      <div className="intel-price-result-nav">
        <a href="/home">Home</a>
      </div>
      <div className="date">{state.month} / {state.year}</div>
      <div className="commoditycontainer">
        <div id="cropimg" className="commodityimg">
          <img src={CropImages[state.commodity]} alt="Crop" />
        </div>
        <div className="currcommoditystatistics">
          {state.avgPrice && state.minPrice && state.maxPrice && (
            <>
            <h2>Price Statistics</h2>
              <div className="currAvgprice">
                <p>Average Price  : {state.avgPrice} /quintal</p>
              </div>
              <div className="minprice">
                <p>Min Price :  {state.minPrice} /quintal</p>
              </div>
              <div className="maxprice">
                <p>Max Price :  {state.maxPrice} /quintal</p>
              </div>
            </>
          )}
        </div>
        <div className="maxminyear">
          <p className="type">Maximum Price</p>
          <div className="max">
            <p>Month : {state.goldMonthIndex}</p>
            <p>Price : {state.maxMSPPrice} - {state.minMSPPrice} /quintal</p>
            <p>Expected rainfall : Medium</p>
          </div>
          <p className="type">Minimum Price</p>
          <div className="min">
            <p>Month : {state.silverMonthIndex}</p>
            <p>Price : {state.maxAvgPrice} - {state.minAvgPrice} /quintal</p>
            <p>Expected rainfall : Medium</p>
          </div>
          <p className="condition">
            If there is variation in actual rainfall and expected rainfall then prediction may go wrong
          </p>
        </div>
      </div>

      <div className="prevyeargraph">
        <h2>Price Analysis of Current Year - {state.year}</h2>
        <div  className="graph-canvas" >
        <Line data={chartData(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], state.maxPriceCurrSeries, state.minPriceCurrSeries)} options={options} />
        </div>
      </div>

      <div className="prevyeargraph">
        <h2>Price Analysis of Upcoming Year - {state.NextYear}</h2>
        <div  className="graph-canvas" >
        <Line data={chartData(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], state.maxPriceNextSeries, state.minPriceNextSeries)} options={options} />
        </div>
      </div>

      <footer className="price-result-footer">
        Kisan-DSS 2025
      </footer>
    </div>
  );
}
