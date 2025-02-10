// import React, { useState, useEffect } from "react";
// import "../static/css/intel-crop-rec-result.css";

// import { useLocation } from "react-router-dom";

// export default function IntelMarketResult() {
//   const location = useLocation()
//   const {state} = location;
//   console.log(state);
//   return (
//     <div className="intel-yield-result-root">
//       {/* Navigation Bar */}
//       <div className="intel-yield-result-nav">
//         <a href="/home">Home</a>
//       </div>

//       {/* Date Section */}
//       <div className="section-header">
//         <h2>
//           Market Selection
//         </h2>
//       </div>

//       <div className="commodity-container">
//       {state && (
//       <div className="crop-selection-main-block">
//             <table class="table table-hover">
//               <thead>
//                 <tr>
//                   <th scope="col">Market</th>
//                   <th scope="col">Price(pre Quintal)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(state.data).map(([market, price]) => (
//                   <tr className="md-2" scope="row" key={market}>
//                     <td>{market}</td>
//                     <td>{price}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//          {state?.conclusion && (
//           <div className="conclusion">
//             <h3>Recommended Crop: {state.conclusion.suggested_market}</h3>
//             <p>{state.conclusion.reasoning}</p>
//           </div>
//         )}
//         </div>
//       <footer className="intel-yield-result-footer">
//         <p>© 2025 Kisan-DSS &dash; Intelligent Decision Support System</p>
//       </footer>
//     </div>
//   );
// }

import React from "react";
import { useLocation } from "react-router-dom";
import "../static/css/intel-crop-rec-result.css";

// Import Chart.js components
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IntelMarketResult() {
  const location = useLocation();
  const { state } = location;

  console.log(state); // Debugging

  // Extract data for the chart
  const markets = state?.data ? Object.keys(state.data) : [];
  const prices = state?.data ? Object.values(state.data) : [];

  // Chart.js Data
  const chartData = {
    labels: markets, // X-axis (Market names)
    datasets: [
      {
        label: "Market Price (₹ per Quintal)",
        data: prices, // Y-axis (Prices)
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Chart.js Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Market",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (₹ per Quintal)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="intel-yield-result-root">
      {/* Navigation Bar */}
      <div className="intel-yield-result-nav">
        <a href="/home">Home</a>
      </div>

      {/* Section Header */}
      <div className="section-header">
        <h2>Market Selection</h2>
      </div>

      <div className="commodity-container">
        {/* Table for Market Data */}
        {state?.data && (
          <div className="crop-selection-main-block">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Market</th>
                  <th scope="col">Price (₹ per Quintal)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(state.data).map(([market, price]) => (
                  <tr key={market}>
                    <td>{market}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Conclusion Section */}
        {state?.conclusion && (
          <div className="conclusion">
            <h3>Recommended Market: {state.conclusion.suggested_market}</h3>
            <p>{state.conclusion.reasoning}</p>
          </div>
        )}
      </div>
      
      <div className="section-header">
        <h2>Market Prices Comparison</h2>
      </div>

      {/* Chart Section */}
      <div className="commodity-container">
       
        <div style={{ height: "450px", width: "100%" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Footer */}
      <footer className="intel-yield-result-footer">
        <p>© 2025 Kisan-DSS &dash; Intelligent Decision Support System</p>
      </footer>
    </div>
  );
}
