import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="pt-5">
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-3">
              <h6>EMBECA</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Contribute</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>HELP</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Customer Service</a>
                </li>
                <li>
                  <a href="#">{`Return & Exchanges`}</a>
                </li>
                <li>
                  <a href="#">Store Locations</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Shipping</a>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>My EMBECA</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Order Status</a>
                </li>
                <li>
                  <a href="#">Purchase History</a>
                </li>
                <li>
                  <a href="#">Loves</a>
                </li>
              </ul>
            </div>
          </div>
          <hr></hr>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2021 All Rights Reserved by CA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
