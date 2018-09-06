import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/UsersAction';

class Wishlist extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wishlist">
                <ul className="breadcrumb">
                    <li><a href="#">Home</a>
                    </li>
                    <li>Ladies</li>
                </ul>

                <div className="box">
                    <h1>My wishlist</h1>
                    <p className="lead">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                </div>

                <div className="row products">

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">Fur coat with very but very very long name</a></h3>
                                <p className="price">$143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">White Blouse Armani</a></h3>
                                <p className="price"><del>$280</del> $143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>
                            </div>

                            <div className="ribbon sale">
                                <div className="theribbon">SALE</div>
                                <div className="ribbon-background"></div>
                            </div>

                            <div className="ribbon new">
                                <div className="theribbon">NEW</div>
                                <div className="ribbon-background"></div>
                            </div>

                            <div className="ribbon gift">
                                <div className="theribbon">GIFT</div>
                                <div className="ribbon-background"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">Black Blouse Versace</a></h3>
                                <p className="price">$143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>

                            </div>
                            {/* <!-- /.text --> */}
                        </div>
                        {/* <!-- /.product --> */}
                    </div>

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">Black Blouse Versace</a></h3>
                                <p className="price">$143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">White Blouse Versace</a></h3>
                                <p className="price">$143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>

                            </div>

                            <div className="ribbon new">
                                <div className="theribbon">NEW</div>
                                <div className="ribbon-background"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">Fur coat</a></h3>
                                <p className="price">$143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>

                            </div>

                            <div className="ribbon gift">
                                <div className="theribbon">GIFT</div>
                                <div className="ribbon-background"></div>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">White Blouse Armani</a></h3>
                                <p className="price"><del>$280</del> $143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>
                            </div>

                            <div className="ribbon sale">
                                <div className="theribbon">SALE</div>
                                <div className="ribbon-background"></div>
                            </div>

                            <div className="ribbon new">
                                <div className="theribbon">NEW</div>
                                <div className="ribbon-background"></div>
                            </div>

                            <div className="ribbon gift">
                                <div className="theribbon">GIFT</div>
                                <div className="ribbon-background"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4">
                        <div className="product">
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
                                <h3><a href="detail.html">Black Blouse Versace</a></h3>
                                <p className="price">$143.00</p>
                                <p className="buttons">
                                    <a href="detail.html" className="btn btn-default">View detail</a>
                                    <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                </p>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    };
}

Wishlist.propTypes = {
    login: PropTypes.func.isRequired,
    loginCredentials: PropTypes.object
};

const mapStateToProps = state => {
    return { loginCredentials: state.loginCredentials };
}

export default connect(mapStateToProps, { login })(Wishlist);