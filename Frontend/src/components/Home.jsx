import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../static/css/home.css";

import pmPensionYojana from "../static/Images/PM-kisan-pension-yojana.webp";
import farmerLogo from "../static/Images/farmerlogo.avif";
import pradhanMantriFasalBimaYojana from "../static/Images/pradhanmantrifasalbimayojana.webp";
import kisanManDhan from "../static/Images/kisansanmmannidhi.webp";
import pashudhanBima from "../static/Images/Pashudhan Bima Yojana Benefits.jpg";
import sinchanYojana from "../static/Images/irrigation-pradhanmantri-sinchan-yojna-800x445.jpg";
import growingPlant from "../static/Images/plantgrowing.jpg";
import wheatFarm from "../static/Images/farmwheat.jpg";
import grassBackground from "../static/Images/grassbackgroundimg.jpg";
import intelPrice from "../static/Images/intel-price.jpg";
import intelCropRec from "../static/Images/intel-crop-rec.png";
import intelMarket from "../static/Images/market-analysis.png";
import intelYield from "../static/Images/yield-prediction.png";

export default function Home() {
  const [count, setCount] = useState(0);
  const govSchemesRef = useRef(null);

  const scrollToSchemes = () => {
    if (govSchemesRef.current) {
      govSchemesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const backgroundImagestore = [grassBackground, growingPlant, wheatFarm];

  const handlePrev = () => {
    setCount(
      (prevCount) =>
        (prevCount - 1 + backgroundImagestore.length) %
        backgroundImagestore.length
    );
  };

  const handleNext = () => {
    setCount((prevCount) => (prevCount + 1) % backgroundImagestore.length);
  };
  return (
    <div className="home-root">
      <div class="logo">
        <div class="logoimg">
          <img src={farmerLogo} alt="" />
        </div>
        <div class="logotext">
          Kisan-DSS<i> &ndash; Intelligent Decision Support System</i>
        </div>
      </div>

      <nav className="home-nav">
        <div className="nav-1">
          <a href="#">Kisan-DSS</a>
        </div>
        <div className="nav-2">
          <a href="/home">Home</a>
        </div>
        <div className="nav-2">
          <a onClick={scrollToSchemes} href="#">
            Goverment Schemes
          </a>
        </div>
        <div className="nav-2">
          <a href="#">Farm Guide</a>
        </div>
        <div className="nav-2">
          <a href="">contact</a>
        </div>
        <div className="nav-3">
          <a href="/">Log out</a>
        </div>
      </nav>

      <main>
        <div
          id="mycarousel"
          className="mycarousel"
          style={{ backgroundImage: `url(${backgroundImagestore[count]})` }}
        >
          <div className="next_prevbtn">
            <div className="prev">
              <button onClick={handlePrev}>
                <i className="fa-solid fa-2xl fa-chevron-left"></i>
              </button>
            </div>
            <div className="next">
              <button onClick={handleNext}>
                <i className="fa-solid fa-2xl fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="container marketing">
          <div className="middle">
            <div className="features">
              <Link to="/intel-crop-price" className="feature-link">
                {" "}
                <img src={intelPrice} alt="" />{" "}
                <label htmlFor="">kisan Dhan</label>{" "}
              </Link>
              <Link to="/intel-crop-yield" className="feature-link">
                {" "}
                <img src={intelYield} alt="" />{" "}
                <label htmlFor="">Kisan Utpann</label>{" "}
              </Link>
              <Link to="/intel-crop-recommendation" className="feature-link">
                {" "}
                <img src={intelCropRec} alt="" />{" "}
                <label htmlFor="">Intel CropRec</label>{" "}
              </Link>
              <Link to='/intel-market-selection' className="feature-link">
                {" "}
                <img src={intelMarket} alt="" />{" "}
                <label htmlFor="">Market Price</label>{" "}
              </Link>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div ref={govSchemesRef} className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">
                Pradhan Mantri Kisan Maandhan Yojana
                <span className="text-body-secondary"></span>
              </h2>
              <p className="lead">
                Government has launched the Pradhan Mantri Kisan Maan DhanYojana
                (PM-KMY) on 12.9.2019 with a view to provide social security to
                Small and Marginal Farmers in their old age when they have no
                means of livelihood and minimal or no savings to take care of
                their expenses.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="bd-placeholder-img img-fluid mx-auto"
                width="500"
                height="500"
                src={pmPensionYojana}
                alt=""
                srcSet=""
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">
                Pradhan Mantri Fasal Bima Yojana - Crop Insurance
                <span className="text-body-secondary"></span>
              </h2>
              <p className="lead">
                प्रधानमंत्री फसल विमा योजना 18 फेब्रुवारी 2016 रोजी पंतप्रधान
                नरेंद्र मोदी यांच्या हस्ते सुरू करण्यात आली. नैसर्गिक आपत्ती,
                कीड आणि रोगांमुळे पिकांचे नुकसान झाल्यास शेतकऱ्यांना मदत
                करण्यासाठी त्यांना आर्थिक सहाय्य प्रदान करणे हा या योजनेचा
                उद्देश आहे.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                className="bd-placeholder-img img-fluid mx-auto"
                width="500"
                height="500"
                src={pradhanMantriFasalBimaYojana}
                alt=""
                srcSet=""
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">
                PM-Kisan Samman Nidhi
                <span className="text-body-secondary"></span>
              </h2>
              <p className="lead">
                या योजनेअंतर्गत 2 हेक्टरपर्यंत शेती करणाऱ्या शेतकरी मालकांना या
                योजनेचा लाभ मिळतो. पीएम किसान सन्मान निधी अंतर्गत शेतकऱ्यांना
                वार्षिक हप्त्यांमध्ये निधी दिला जातो. एका वर्षात 6 हजार रुपये
                मिळतात. प्रत्येक हप्त्यात 2000 रुपये उपलब्ध आहेत.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="bd-placeholder-img img-fluid mx-auto"
                width="500"
                height="500"
                src={kisanManDhan}
                alt=""
                srcSet=""
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1">
                Pashudhan Bima Yojana
                <span className="text-body-secondary"></span>
              </h2>
              <p className="lead">
                पशुधनाचा विमा म्हणजेच पशूंना होणारे आजार किंवा अपघात यामुळे
                होणाऱ्या मृत्यूसाठी केला जातो (नुकसान भरपाई मिळावी). या
                दृष्टीकोनातून पशुधन विमा काढणे आजची गरज बनली आहे.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="bd-placeholder-img img-fluid mx-auto"
                width="500"
                height="500"
                src={pashudhanBima}
                alt=""
                srcSet=""
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1">
                Pradhan Mantri Krishi Sinchan Yojana
                <span className="text-body-secondary"></span>
              </h2>
              <p className="lead">
                प्रधानमंत्री कृषी सिंचाई योजना हे एक राष्ट्रीय ध्येय आहे. याचा
                उद्देश शेतकी उत्पादन वाढविणे व देशातील विविध स्रोतांचा वापर होतो
                आहे याची खात्री करणे असा आहे.येत्या ५ वर्षात याची अंदाजपत्रकीय
                तरतूद रु. ५0,000 करोड इतकी आहे.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="bd-placeholder-img img-fluid mx-auto"
                width="500"
                height="500"
                src={sinchanYojana}
                alt=""
                srcSet=""
              />
            </div>
          </div>

          <hr className="featurette-divider" />
        </div>

        <footer className="home-footer text-center text-white">
          <div className="footerblock">
            <img src={wheatFarm} alt="" srcSet="" />
            <img src={sinchanYojana} alt="" srcSet="" />
            <img src={growingPlant} alt="" srcSet="" />
            <img src={farmerLogo} alt="" srcSet="" />
            <img src={growingPlant} alt="" srcSet="" />
            <img src={sinchanYojana} alt="" srcSet="" />
          </div>

          <div className="container  p-4">
            <section className="mb-4">
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-github"></i>
              </a>
            </section>

            <section className="mb-4">
              <p>कृषि प्रधान भारत</p>
            </section>
          </div>

          <div className="copyright text-center p-3">
            © Copyright:
            <a className="text-white" href="">
              @Yield Signal
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
