import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class RecentlyViewed extends Component {

  render() {
    return (
      <div className="row same-height-row">
        <div className="col-md-12 col-sm-12">
          <div className="box same-height">
            <h3>Products viewed recently</h3>
          </div>
        </div>


        <div className="col-md-3 col-sm-6">
          <div className="product same-height">
            <div className="flip-container">
              <div className="flipper">
                <div className="front">
                  <a href="detail.html">
                    <img src="../img/product2.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
                <div className="back">
                  <a href="detail.html">
                    <img src="../img/product2_2.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
              </div>
            </div>
            <a href="detail.html" className="invisible">
              <img src="../img/product2.jpg" alt="" className="img-responsive" />
            </a>
            <div className="text">
              <h3>Fur coat</h3>
              <p className="price">$143</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="product same-height">
            <div className="flip-container">
              <div className="flipper">
                <div className="front">
                  <a href="detail.html">
                    <img src="../img/product2.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
                <div className="back">
                  <a href="detail.html">
                    <img src="../img/product2_2.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
              </div>
            </div>
            <a href="detail.html" className="invisible">
              <img src="../img/product2.jpg" alt="" className="img-responsive" />
            </a>
            <div className="text">
              <h3>Fur coat</h3>
              <p className="price">$143</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="product same-height">
            <div className="flip-container">
              <div className="flipper">
                <div className="front">
                  <a href="detail.html">
                    <img src="../img/product1.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
                <div className="back">
                  <a href="detail.html">
                    <img src="../img/product1_2.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
              </div>
            </div>
            <a href="detail.html" className="invisible">
              <img src="../img/product1.jpg" alt="" className="img-responsive" />
            </a>
            <div className="text">
              <h3>Fur coat</h3>
              <p className="price">$143</p>
            </div>
          </div>
        </div>


        <div className="col-md-3 col-sm-6">
          <div className="product same-height">
            <div className="flip-container">
              <div className="flipper">
                <div className="front">
                  <a href="detail.html">
                    <img src="../img/product3.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
                <div className="back">
                  <a href="detail.html">
                    <img src="../img/product3_2.jpg" alt="" className="img-responsive" />
                  </a>
                </div>
              </div>
            </div>
            <a href="detail.html" className="invisible">
              <img src="../img/product3.jpg" alt="" className="img-responsive" />
            </a>
            <div className="text">
              <h3>Fur coat</h3>
              <p className="price">$143</p>

            </div>
          </div>
        </div>

      </div>
    );
  };
}

export default RecentlyViewed;