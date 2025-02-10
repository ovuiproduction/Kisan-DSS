import React from "react";
import { useLocation } from "react-router-dom";
import "../static/css/intel-yield-result.css";

import CropImages from "./CropImages";

export default function IntelYieldResult() {
  const location = useLocation();
  const { state } = location;
  // const CropImages = {
  //   Bajra: require("../static/CropImages/Bajra.jpg"),
  //   Barley: require("../static/CropImages/Barley.jpg"),
  //   Cotton: require("../static/CropImages/Cotton.jpg"),
  //   Gram: require("../static/CropImages/Gram.jpg"),
  //   Groundnut: require("../static/CropImages/Groundnut.jpg"),
  //   Jowar: require("../static/CropImages/Jowar.jpg"),
  //   Maize: require("../static/CropImages/Maize.jpg"),
  //   Masoor: require("../static/CropImages/Masoor.jpg"),
  //   Moong: require("../static/CropImages/Moong.jpg"),
  //   Soyabean: require("../static/CropImages/Soyabean.jpg"),
  //   Sugarcane: require("../static/CropImages/Sugarcane.jpg"),
  //   Tur: require("../static/CropImages/Tur.jpg"),
  //   Urad: require("../static/CropImages/Urad.jpg"),
  //   Wheat: require("../static/CropImages/Wheat.jpg"),
  // };

  if (!state) {
    return <div>No data received!</div>;
  }

  console.log(state);

  return (
    <div className="intel-yield-result-root">
      {/* Navigation Bar */}
      <div className="intel-yield-result-nav">
        <a href="/home">Home</a>
      </div>

      {/* Date Section */}
      <div className="section-header">
        <h2>{state.year}</h2>
      </div>

      {/* Main Container */}
      <div className="commodity-container">
        <div id="cropimg" className="commodity-img">
          <img src={CropImages[state.commodity]} alt="Crop" />
        </div>

        <div className="form-details-block">
          <div className="cropname-block">{state.commodity}</div>
          <div className="info-block">
            <InfoItem label="Dist" value={state.state} />
            <InfoItem label="Dist" value={state.district} />
            <InfoItem label="Rainfall" value={`${state.rainfall} mm`} />
            <InfoItem label="Temperature" value={`${state.temperature}°C`} />
            <InfoItem label="Area" value={`${state.area} hectares`} />
           
          </div>
        </div>

        <div className="statistics-container">
          {state.yieldPrediction && (
            <StatCard label={`Predicted Yield (${state.year})`} value={state.yieldPrediction} unit="Quintal/hec" />
          )}
          {state.yieldPredictionTonnes && (
            <StatCard label={`Predicted Yield (${state.year})`} value={state.yieldPredictionTonnes} unit="tonne/hec" />
          )}
        </div>
      </div>

      {state.marketData.length > 0 && (
        <>
          <div className="section-header">
            <h2>Market Guide</h2>
          </div>
          <div className="market-guide-container">
            <ul className="market-list">
              {state.marketData.map((market, index) => (
                <MarketBlock key={index} market={market} />
              ))}
            </ul>
          </div>
        </>
      )}

      {state.governmentData.length > 0 && (
        <>
          <div className="section-header">
            <h2>Government Schemes</h2>
          </div>
          <div className="market-guide-container">
            <ul className="market-list">
              {state.governmentData.map((scheme, index) => (
                <SchemeBlock key={index} scheme={scheme} />
              ))}
            </ul>
          </div>
        </>
      )}

      <footer className="intel-yield-result-footer">
        <p>© 2025 Kisan-DSS &dash; Intelligent Decision Support System</p>
      </footer>
    </div>
  );
}

// Reusable Info Block
const InfoItem = ({ label, value }) => (
  <div className="info-item">
    <p>{label}</p>
    <div className="value-div">
      <span className="value">{value}</span>
    </div>
  </div>
);

// Reusable Statistic Card
const StatCard = ({ label, value, unit }) => (
  <div className="stat-card">
    <p>{label}</p>
    <div className="value-div">
      <span className="yield-value">{value}</span>
      <span className="unit">{unit}</span>
    </div>
  </div>
);

// Reusable Market Block
const MarketBlock = ({ market }) => (
  <li className="market-block">
    <article>
      <h3>{market.market_name}</h3>
      <ul>
        {market.strengths.map((strength, index) => (
          <li key={index}>{strength}</li>
        ))}
      </ul>
      <p>{market.best_for}</p>
    </article>
  </li>
);

// Reusable Scheme Block
const SchemeBlock = ({ scheme }) => (
  <li className="market-block">
    <article>
      <h3>{scheme.scheme_name}</h3>
      <ul>
        {scheme.benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
      <p>{scheme.purpose}</p>
    </article>
  </li>
);
