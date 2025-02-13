import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../static/css/intel-crop-rec-result.css";
import Temp from "./Temp";

// Import Chart.js components
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IntelMarketResult() {
  const location = useLocation();
  const { state } = location;

  // const [transportationData, setTransportationData] = useState([]);

  // const handleTransportationData = (data) => {
  //   setTransportationData(data);
  // };

  // const [fuelPrice,setFuelPrice] = useState()

  // const getFuelPrice = async (district) => {
  //   try {
  //     const state = "maharashtra";
  //     let cachedPrice = sessionStorage.getItem(`fuelPrice-${district}`);

  //     if (cachedPrice) {
  //       console.log(`Using cached fuel price for ${district}: ₹${cachedPrice}`);
  //       return cachedPrice;
  //     }

  //     console.log("Fetching new fuel price for:", district);
      
  //     const response = await axios.get(
  //       `https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/${state}/${district.toLowerCase()}`,
  //       {
  //         headers: {
  //           "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
  //           "X-RapidAPI-Host": "daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com",
  //         },
  //       }
  //     );

  //     let fuelPrice = response.data?.fuel?.diesel?.retailPrice || "Not Available";
  //     setFuelPrice(fuelPrice);
  //     sessionStorage.setItem(`fuelPrice-${district}`, fuelPrice);
  //     return fuelPrice;
  //   } catch (error) {
  //     console.error("Error fetching fuel price:", error.response?.data || error.message);
  //     return "Not Available";
  //   }
  // };

  // // **Function to Fetch Distances from Backend**
  // const getDistancesFromBackend = async (sourceCoords, destinations) => {
  //   try {
  //     const requestData = {
  //       locations: [
  //         [sourceCoords.lon, sourceCoords.lat],
  //         ...destinations.map(dest => [dest.lon, dest.lat]),
  //       ],
  //       metrics: ["distance"],
  //     };

  //     const response = await axios.post("http://localhost:5000/api/distance", requestData);
  //     const distances = response.data.distances[0].slice(1); // Remove source-to-source distance

  //     return destinations.map((dest, index) => ({
  //       taluka: dest.taluka,
  //       distance: (distances[index] / 1000).toFixed(2), // Convert meters to kilometers
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching distances from backend:", error);
  //     return [];
  //   }
  // };

  // useEffect(()=>{
  //   let fuelPrice = getFuelPrice();
  //   let transportation = getDistancesFromBackend()
  // },[state])
 
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

      {/* <Temp 
        sourceTaluka="Naigaon" 
        sourceDistrict="Nanded" 
        destinationDistrict="Kolhapur" // Pass destination district
        onDataUpdate={handleTransportationData} 
      /> */}

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
      <h2>Transportation Costs</h2>
      </div>

      {/* <div className="commodity-container">
      {transportationData.length > 0 ? (
        <ul>
          {transportationData.map(({ taluka, price }) => (
            <li key={taluka}>{taluka}: {price} INR</li>
          ))}
        </ul>
      ) : (
        <p>Loading transportation costs...</p>
      )}
      </div> */}
      
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
