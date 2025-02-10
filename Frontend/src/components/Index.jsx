import React from "react";
import { Link } from "react-router-dom";

import "../static/css/index.css";

export default function Index() {
  return (
    <div className="index-root text-center bodycover">
      <div class=" d-flex h-100 p-4 mx-auto flex-column">
        <header class="masthead mb-auto">
          <div class="inner">
            <h3 class="masthead-brand">Kisan-DSS</h3>
            <nav class="nav nav-masthead justify-content-center">
              <a class="nav-link" href="#">
                Service
              </a>
              <a class="nav-link" href="#">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <main role="main" class="inner cover">
          <h1 class="cover-heading">“अन्नदाता सुखी भव”</h1>
          <p class="lead">
            जय किसान , जय विज्ञान
          </p>

          <p class="lead">
            <Link to="/home" class="btn btn-lg btn-secondary">
              Explore
            </Link>
          </p>
        </main>

        <footer class="mastfoot mt-auto">
          <div class="inner">
            <p>&copy; created with Love & Respect</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
