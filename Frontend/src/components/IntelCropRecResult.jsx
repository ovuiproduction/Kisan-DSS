import React, { useState, useEffect } from "react";
import "../static/css/intel-crop-rec-result.css";

import jowarLogo from "../static/Images/jowarlogo.webp";

export default function IntelCropRecResult() {
  return (
    <div className="intel-yield-result-root">
      {/* Navigation Bar */}
      <div className="intel-yield-result-nav">
        <a href="/home">Home</a>
      </div>

      {/* Date Section */}
      <div className="section-header">
        <h2>
          Crop Selection
        </h2>
      </div>

      <div className="commodity-container"></div>

      <div className="commodity-container"></div>

      <div className="commodity-container"></div>

      <footer className="intel-yield-result-footer">
        <p>© 2025 Kisan-DSS &dash; Intelligent Decision Support System</p>
      </footer>
    </div>
  );
}
