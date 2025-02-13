import React, { useEffect, useState } from "react";
import axios from "axios";

const Temp = ({ sourceTaluka, sourceDistrict, destinationDistrict, onDataUpdate }) => {
  const [dieselPrice, setDieselPrice] = useState(null);
  const [transportationCosts, setTransportationCosts] = useState([]);
  const [error, setError] = useState("");

  // Market locations (Taluka, District)
  const districts = {
    Kolhapur: ["Kolhapur", "Vadgaonpeth"],
    Pune: ["Pune", "Pimpri", "Junnar(Otur)", "Moshi", "Manchar", "Junnar", "Shirur", "Baramati"],
    Sangli: ["Sangli", "Vita", "Islampur", "Tasgaon"],
    Satara: ["Satara", "Phaltan", "Karad", "Lonand"],
    Solapur: ["Solapur", "Pandharpur", "Barshi", "Mohol"],
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      if (!sourceTaluka || !sourceDistrict || !destinationDistrict) {
        setError("Missing source taluka, source district, or destination district.");
        return;
      }

      setError("");
      setTransportationCosts([]);

      try {
        let fuelPrice = await getFuelPrice(sourceDistrict);
        setDieselPrice(fuelPrice);

        if (!fuelPrice || fuelPrice === "Not Available") {
          setError("Failed to fetch diesel price.");
          return;
        }

        await delay(2000); // Add delay before making more API requests

        const sourceCoords = await getCoordinates(sourceTaluka, sourceDistrict);
        if (!sourceCoords) {
          setError("Could not find coordinates for source location.");
          return;
        }

        // Fetch destination coordinates only for the selected destination district
        const destinationTalukas = districts[destinationDistrict] || [];
        const destinations = [];

        for (const taluka of destinationTalukas) {
          const destinationCoords = await getCoordinates(taluka, destinationDistrict);
          if (destinationCoords) {
            destinations.push({ taluka, district: destinationDistrict, lat: destinationCoords.lat, lon: destinationCoords.lon });
          }
          await delay(1000); // Delay to prevent API rate limits
        }

        const distances = await getDistancesFromBackend(sourceCoords, destinations);
        const mileage = 18; // Assume mileage of the vehicle
        const costResults = distances.map(({ taluka, distance }) => ({
          taluka,
          price: `₹${((distance / mileage) * fuelPrice).toFixed(2)}`,
        }));

        setTransportationCosts(costResults);
        onDataUpdate(costResults);
      } catch (error) {
        console.error("Error in fetching data:", error);
        setError("An error occurred while fetching transportation costs.");
      }
    };

    fetchData();
  }, [sourceTaluka, sourceDistrict, destinationDistrict]);

  // **Function to Get Coordinates from OpenStreetMap**
  const getCoordinates = async (taluka, district) => {
    try {
      const query = `${taluka}, ${district}, Maharashtra, India`;
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      if (response.data.length > 0) {
        return { lat: parseFloat(response.data[0].lat), lon: parseFloat(response.data[0].lon) };
      }
      return null;
    } catch (error) {
      console.error("Error getting coordinates:", error);
      return null;
    }
  };

  // **Function to Fetch Fuel Price**
  const getFuelPrice = async (district) => {
    try {
      const state = "maharashtra";
      let cachedPrice = sessionStorage.getItem(`fuelPrice-${district}`);

      if (cachedPrice) {
        console.log(`Using cached fuel price for ${district}: ₹${cachedPrice}`);
        return cachedPrice;
      }

      console.log("Fetching new fuel price for:", district);
      
      const response = await axios.get(
        `https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/${state}/${district.toLowerCase()}`,
        {
          headers: {
            "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
            "X-RapidAPI-Host": "daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com",
          },
        }
      );

      let fuelPrice = response.data?.fuel?.diesel?.retailPrice || "Not Available";

      sessionStorage.setItem(`fuelPrice-${district}`, fuelPrice);
      return fuelPrice;
    } catch (error) {
      console.error("Error fetching fuel price:", error.response?.data || error.message);
      return "Not Available";
    }
  };

  // **Function to Fetch Distances from Backend**
  const getDistancesFromBackend = async (sourceCoords, destinations) => {
    try {
      const requestData = {
        locations: [
          [sourceCoords.lon, sourceCoords.lat],
          ...destinations.map(dest => [dest.lon, dest.lat]),
        ],
        metrics: ["distance"],
      };

      const response = await axios.post("http://localhost:5000/api/distance", requestData);
      const distances = response.data.distances[0].slice(1); // Remove source-to-source distance

      return destinations.map((dest, index) => ({
        taluka: dest.taluka,
        distance: (distances[index] / 1000).toFixed(2), // Convert meters to kilometers
      }));
    } catch (error) {
      console.error("Error fetching distances from backend:", error);
      return [];
    }
  };

  return (
    <div>
      {/* <h2>Transportation Costs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {dieselPrice && <p>Diesel Price (for {sourceDistrict}): ₹{dieselPrice}</p>}
      {transportationCosts.length > 0 ? (
        <ul>
          {transportationCosts.map(({ taluka, price }) => (
            <li key={taluka}>{taluka}: {price}</li>
          ))}
        </ul>
      ) : (
        <p>Calculating transportation costs...</p>
      )} */}
    </div>
  );
};

export default Temp;
