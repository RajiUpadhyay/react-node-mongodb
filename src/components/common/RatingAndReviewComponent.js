import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

class RatingAndReviewComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">

                <div className="row">
                    <div className="col-sm-3">
                        <div className="rating-block">
                            <h4>Average user rating</h4>
                            <h2 className="bold padding-bottom-7">4.3 <small>/ 5</small></h2>
                            <Rating readonly emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={3.5} />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <h4>Rating breakdown</h4>
                        <div className="pull-left">
                            <div className="pull-left inline-style-1">
                                <div style={{ height: "9px", margin: "5px 0" }}>5 <i className="fa fa-star" aria-hidden="true"></i></div>
                            </div>
                            <div className="pull-left" style={{ width: "180px" }}>
                                <div className="progress" style={{ height: "9px", margin: "8px 0" }}>
                                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{ width: '1000%' }}>
                                        <span className="fa fa-star-o" data-rating="1"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right" style={{ marginLeft: '10px' }}>1</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left inline-style-1">
                                <div style={{ height: '9px', margin: '5px 0' }}>4 <i className="fa fa-star" aria-hidden="true"></i></div>
                            </div>
                            <div className="pull-left" style={{ width: '180px' }}>
                                <div className="progress" style={{ height: '9px', margin: '8px 0' }}>
                                    <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" style={{ width: '80%' }}>
                                        <span className="sr-only">80% Complete (danger)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right" style={{ 'marginLeft': '10px' }}>1</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left inline-style-1">
                                <div style={{ height: "9px", margin: "5px 0" }}>3 <i className="fa fa-star" aria-hidden="true"></i></div>
                            </div>
                            <div className="pull-left" style={{ width: '180px' }}>
                                <div className="progress" style={{ height: '9px', margin: '8px 0' }}>
                                    <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5" style={{ width: '60%' }}>
                                        <span className="sr-only">80% Complete (danger)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right" style={{ 'marginLeft': '10px' }}>0</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left inline-style-1">
                                <div style={{ height: "9px", margin: "5px 0" }}>2 <i className="fa fa-star" aria-hidden="true"></i></div>
                            </div>
                            <div className="pull-left" style={{ width: '180px' }}>
                                <div className="progress" style={{ height: '9px', margin: '8px 0' }}>
                                    <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="5" style={{ width: '40%' }}>
                                        <span className="sr-only">80% Complete (danger)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right" style={{ 'marginLeft': '10px' }}>0</div>
                        </div>
                        <div className="pull-left">
                            <div className="pull-left inline-style-1">
                                <div style={{ height: "9px", margin: "5px 0" }}>1 <i className="fa fa-star" aria-hidden="true"></i></div>
                            </div>
                            <div className="pull-left" style={{ width: '180px' }}>
                                <div className="progress" style={{ height: '9px', margin: '8px 0' }}>
                                    <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style={{ width: '20%' }}>
                                        <span className="sr-only">80% Complete (danger)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right" style={{ 'marginLeft': '10px' }}>0</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-7">
                        <hr />
                        <div className="review-block">
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" className="img-rounded" />
                                    <div className="review-block-name"><a href="#">nktailor</a></div>
                                    <div className="review-block-date">January 29, 2016<br />1 day ago</div>
                                </div>
                                <div className="col-sm-9">
                                    <div className="review-block-rate">
                                        <Rating readonly emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={3.5} />
                                    </div>
                                    <div className="review-block-title">this was nice in buy</div>
                                    <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" className="img-rounded" />
                                    <div className="review-block-name"><a href="#">nktailor</a></div>
                                    <div className="review-block-date">January 29, 2016<br />1 day ago</div>
                                </div>
                                <div className="col-sm-9">
                                    <div className="review-block-rate">
                                        <Rating readonly emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={3.5} />
                                    </div>
                                    <div className="review-block-title">this was nice in buy</div>
                                    <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" className="img-rounded" />
                                    <div className="review-block-name"><a href="#">nktailor</a></div>
                                    <div className="review-block-date">January 29, 2016<br />1 day ago</div>
                                </div>
                                <div className="col-sm-9">
                                    <div className="review-block-rate">
                                        <Rating readonly emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={3.5} />
                                    </div>
                                    <div className="review-block-title">this was nice in buy</div>
                                    <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    };
}

RatingAndReviewComponent.propTypes = {
};

const mapStateToProps = state => {
    return {};
}

export default connect(mapStateToProps, {})(RatingAndReviewComponent);