import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row products">
        {(this.props.categoryProductList.list || []).map((product, index) => {
          return <div className="col-md-4 col-sm-6" key={index}>
            <div className="product">
              <div className="flip-container">
                <div className="flipper">
                  <div className="front category-image-front">
                    <NavLink className="" exact to={`/product/${product._id}`}>
                      <img src={`../product-images/main/${product.sku}-0.jpeg`} alt="" className="img-responsive" />
                    </NavLink>
                  </div>
                  <div className="back category-image-back">
                    <NavLink className="" exact to={`/product/${product._id}`}>
                      <img src={`../product-images/main/${product.sku}-0.jpeg`} alt="" className="img-responsive" />
                    </NavLink>
                  </div>
                </div>
              </div>
              <a className="invisible">
                {/* <img src={`../lproduct-images/main/${product.sku}-0.jpeg`} alt="" className="img-responsive" /> */}
                <img src="../img/product1.jpg" alt="" className="img-responsive" />
              </a>
              <div className="text">
                <h3><a href="detail.html">{product.product_name}</a></h3>
                <p className="price">Rs. {product.product_price}</p>
                <p className="buttons">
                  <NavLink className="btn btn-default" exact to={`/product/${product._id}`}>View detail</NavLink>
                  <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                </p>
              </div>
            </div>
          </div>;
        })}
      </div>
    );
  };
}

export default Description;