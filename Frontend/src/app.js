// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./components/Index";
import Home from "./components/Home";
import IntelCropRec from './components/IntelCropRec';
import IntelPrice from './components/IntelPrice';
import IntelYield from './components/IntelYield';
import IntelMarketPrice from './components/IntelMarketPrice';
import IntelPriceResult from "./components/IntelPriceResult";
import IntelYieldResult from "./components/IntelYieldResult";
import IntelCropRecResult from './components/IntelCropRecResult';
import IntelMarketResult from './components/IntelMarketResult';
import IntelAgriVideoSearch from './components/IntelAgriVideoSearch';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/intel-crop-price" element={<IntelPrice />} />
        <Route path="/intel-price-result" element={<IntelPriceResult />} />
        <Route path="/intel-crop-yield" element={<IntelYield />} />
        <Route path="/intel-yield-result" element={<IntelYieldResult />} />
        <Route path="/intel-crop-recommendation" element={<IntelCropRec />} />
        <Route path="/intel-crop-rec-result" element={<IntelCropRecResult />} />
        <Route path="/intel-market-selection" element={<IntelMarketPrice />} />
        <Route path="/intel-market-selection-result" element={<IntelMarketResult />} />
        <Route path="/intel-agri-video-search" element={<IntelAgriVideoSearch />} />
      </Routes>
    </Router>
  );
}