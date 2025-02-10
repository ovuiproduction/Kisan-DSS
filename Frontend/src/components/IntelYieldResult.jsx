import React, { useState, useEffect } from "react";
import "../static/css/intel-yield-result.css";

import jowarLogo from "../static/Images/jowarlogo.webp"

export default function IntelYieldResult(){
  // Initial empty state
  const [data, setData] = useState({
    year: "",
    season: "",
    cropFace: "",
    cropName: "",
    dist: "",
    subdivision: "",
    averageRainfall: "",
    temperature: "",
    area: "",
    fpPerUnitArea: "",
    currYearPrediction: "",
    currYearPredictionTonnes: "",
    marketData: [],
    governmentData: []
  });


  useEffect(() => {
    const fetchedData = {
      year: "2025",
      season: "Rabi",
      cropFace: jowarLogo,
      cropName: "Wheat",
      dist: "Pune",
      subdivision: "Western Maharashtra",
      averageRainfall: 500,
      temperature: 28,
      area: 10,
      fpPerUnitArea: 2,
      currYearPrediction: 3200,
      currYearPredictionTonnes: 3.2,
      marketData: [
        { market_name: "Local Market", strengths: ["High demand", "Good prices"], best_for: "Retail sales" },
        { market_name: "Wholesale Market", strengths: ["Bulk sales", "Lower commission"], best_for: "Large-scale selling" }
      ],
      governmentData: [
        { scheme_name: "PM Kisan", benefits: ["Financial support", "Direct transfers"], purpose: "Supporting farmers" },
        { scheme_name: "Soil Health Card", benefits: ["Soil testing", "Fertilizer guidance"], purpose: "Improving soil health" }
      ]
    };
    
    setData(fetchedData);
  }, []);

  return (
    <div className="intel-yield-result-root">
      {/* Navigation Bar */}
      <div className="intel-yield-result-nav">
        <a href="/home">Home</a>
      </div>

      {/* Date Section */}
      <div className="section-header">
        <h2>{data.year} - {data.season}</h2>
      </div>

      {/* Main Container */}
      <div className="commodity-container">
        <div id="cropimg" className="commodity-img">
          <img src={data.cropFace} alt="Crop" />
        </div>

        <div className="form-details-block">
          <div className="cropname-block">{data.cropName}</div>
          <div className="info-block">
            <InfoItem label="Dist" value={data.dist} />
            <InfoItem label="Sub-Division" value={data.subdivision} />
            <InfoItem label="Rainfall" value={`${data.averageRainfall} mm`} />
            <InfoItem label="Temperature" value={`${data.temperature}°C`} />
            <InfoItem label="Area" value={`${data.area} hectares`} />
            <InfoItem label="Pesticides/Fertilizer" value={`${data.fpPerUnitArea} tonnes/hectare`} />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="statistics-container">
          {data.currYearPrediction && (
            <StatCard label={`Predicted Yield (${data.year})`} value={data.currYearPrediction} unit="Kg/hec" />
          )}
          {data.currYearPredictionTonnes && (
            <StatCard label={`Predicted Yield (${data.year})`} value={data.currYearPredictionTonnes} unit="tonne/hec" />
          )}
        </div>
      </div>

      {/* Market Guide */}
      {data.marketData.length > 0 && (
        <>
          <div className="section-header">
            <h2>Market Guide</h2>
          </div>
          <div className="market-guide-container">
            <ul className="market-list">
              {data.marketData.map((market, index) => (
                <MarketBlock key={index} market={market} />
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Government Schemes */}
      {data.governmentData.length > 0 && (
        <>
          <div className="section-header">
            <h2>Government Schemes</h2>
          </div>
          <div className="market-guide-container">
            <ul className="market-list">
              {data.governmentData.map((scheme, index) => (
                <SchemeBlock key={index} scheme={scheme} />
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="intel-yield-result-footer">
        <p>© 2025 Kisan-DSS &dash; Intelligent Decision Support System</p>
      </footer>
    </div>
  );
};

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
