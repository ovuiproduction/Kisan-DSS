import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import jowarLogo from "../static/Images/jowarlogo.webp"

import "../static/css/intel-price-result.css";

export default function IntelPriceResult() {
  const [data, setData] = useState({
    month: "",
    year: "",
    cropface: "",
    prediction: false,
    avg_value: 0,
    min_value: 0,
    max_value: 0,
    goldmonth: "",
    maxlow: 0,
    maxhigh: 0,
    silvermonth: "",
    minlow: 0,
    minhigh: 0,
    mspyear: [],
    minPriceYear: [],
    mspnextyear: [],
    minPriceNextYear: [],
    NextYear: "",
  });

  // Simulating data fetch (replace with actual API call)
  useEffect(() => {
    setData({
      month: "February",
      year: "2025",
      cropface: "https://via.placeholder.com/150",
      prediction: true,
      avg_value: 2500,
      min_value: 2200,
      max_value: 2800,
      goldmonth: "June",
      maxlow: 2700,
      maxhigh: 2900,
      silvermonth: "January",
      minlow: 2000,
      minhigh: 2300,
      mspyear: [2300, 2400, 2500, 2700, 2800, 2600, 2500, 2400, 2300, 2200, 2100, 2000],
      minPriceYear: [2000, 2100, 2200, 2300, 2400, 2300, 2200, 2100, 2000, 1900, 1800, 1700],
      mspnextyear: [2500, 2600, 2700, 2800, 2900, 2700, 2600, 2500, 2400, 2300, 2200, 2100],
      minPriceNextYear: [2200, 2300, 2400, 2500, 2600, 2400, 2300, 2200, 2100, 2000, 1900, 1800],
      NextYear: "2026",
    });
  }, []);

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
      <div className="date">{data.month} / {data.year}</div>
      <div className="commoditycontainer">
        <div id="cropimg" className="commodityimg">
          <img src={jowarLogo} alt="Crop" />
        </div>
        <div className="currcommoditystatistics">
          {data.prediction && (
            <>
            <h2>Price Statistics</h2>
              <div className="currAvgprice">
                <p>Average Price  : {data.avg_value} /quintal</p>
              </div>
              <div className="minprice">
                <p>Min Price :  {data.min_value} /quintal</p>
              </div>
              <div className="maxprice">
                <p>Max Price :  {data.max_value} /quintal</p>
              </div>
            </>
          )}
        </div>
        <div className="maxminyear">
          <p className="type">Maximum Price</p>
          <div className="max">
            <p>Month : {data.goldmonth}</p>
            <p>Price : {data.maxlow} - {data.maxhigh} /quintal</p>
            <p>Expected rainfall : Medium</p>
          </div>
          <p className="type">Minimum Price</p>
          <div className="min">
            <p>Month : {data.silvermonth}</p>
            <p>Price : {data.minlow} - {data.minhigh} /quintal</p>
            <p>Expected rainfall : Medium</p>
          </div>
          <p className="condition">
            If there is variation in actual rainfall and expected rainfall then prediction may go wrong
          </p>
        </div>
      </div>

      <div className="prevyeargraph">
        <h2>Price Analysis of Current Year - {data.year}</h2>
        <div  className="graph-canvas" >
        <Line data={chartData(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], data.mspyear, data.minPriceYear)} options={options} />
        </div>
      </div>

      <div className="prevyeargraph">
        <h2>Price Analysis of Upcoming Year - {data.NextYear}</h2>
        <div  className="graph-canvas" >
        <Line data={chartData(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], data.mspnextyear, data.minPriceNextYear)} options={options} />
        </div>
      </div>

      <footer className="price-result-footer">
        Kisan-DSS 2025
      </footer>
    </div>
  );
}
