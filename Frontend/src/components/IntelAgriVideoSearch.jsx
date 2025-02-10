import React, { useState } from "react";
import "../static/css/intel-agri-video-search.css";  // Import the CSS file

const apiKey = "AIzaSyBuHtMMUbBl9C_RjbjBI9_kmA4ZX6yCEzg"; // Replace with your actual API key

export default function IntelAgriVideoSearch() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const crops = ["Wheat", "Rice", "Maize", "Sugarcane", "Cotton"];

  const selectCrop = (crop, index) => {
    setSelectedCrop(crop);
    setSelectedButton(index);
  };

  const searchVideos = async () => {
    if (!selectedCrop) {
      alert("Please select a crop first!");
      return;
    }
    if (!query) {
      alert("Please enter a search term!");
      return;
    }

    const searchQuery = `${selectedCrop} ${query}`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
      searchQuery
    )}&key=${apiKey}&type=video`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="text-center p-5 youtube-search-root">
      <h2>AgriTube: Smart Farming Through Video Insights</h2>

      {/* Crop Selection Buttons */}
      <div className="crop-buttons">
        {crops.map((crop, index) => (
          <button
            key={crop}
            className={`crop-button ${selectedButton === index ? "selected" : ""}`}
            onClick={() => selectCrop(crop, index)}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter your search term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={searchVideos}>
          Search
        </button>
      </div>

      {/* Video Results */}
      <div className="video-container">
        {videos.map((video) => (
          <iframe
            key={video.id.videoId}
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            className="video-frame"
            title={video.snippet.title}
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </div>
  );
};
