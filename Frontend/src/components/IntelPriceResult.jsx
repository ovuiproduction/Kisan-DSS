import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import "chart.js/auto";

import "../static/css/intel-price-result.css";

import Bajra from "../static/CropImages/Bajra.jpg";
import Barley from "../static/CropImages/Barley.jpg";
import Cotton from "../static/CropImages/Cotton.jpg";
import Gram from "../static/CropImages/Gram.jpg";
import Groundnut from "../static/CropImages/Groundnut.jpg";
import Jowar from "../static/CropImages/Jowar.jpg";
import Maize from "../static/CropImages/Maize.jpg";
import Masoor from "../static/CropImages/Masoor.jpg";
import Moong from "../static/CropImages/Moong.jpg";
import Soyabean from "../static/CropImages/Soyabean.jpg";
import Sugarcane from "../static/CropImages/Sugarcane.jpg";
import Tur from "../static/CropImages/Tur.jpg";
import Urad from "../static/CropImages/Urad.jpg";
import Wheat from "../static/CropImages/Wheat.jpg";

export default function IntelPriceResult() {
  const location = useLocation()
  const {state} = location;
  console.log(state)

  const commodityImages = {
    Bajra: Bajra,
    Barley: Barley,
    Cotton: Cotton,
    Gram: Gram,
    Groundnut: Groundnut,
    Jowar: Jowar,
    Maize: Maize,
    Masoor: Masoor,
    Moong: Moong,
    Soyabean: Soyabean,
    Sugarcane: Sugarcane,
    Tur: Tur,
    Urad: Urad,
    Wheat: Wheat,
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
          <img src={commodityImages[state.commodity]} alt="Crop" />
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
        <h2>Price Analysis of Upcoming Year - {state.year+1}</h2>
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
