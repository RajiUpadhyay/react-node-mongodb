import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class CheckoutDeliveryMethod extends Component {

    render() {
        return (
            <div>
                <div className="content">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="box shipping-method">

                                <h4>USPS Next Day</h4>

                                <p>Get it right on next day - fastest option possible.</p>

                                <div className="box-footer text-center">

                                    <input type="radio" name="delivery" value="delivery1" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="box shipping-method">

                                <h4>USPS Next Day</h4>

                                <p>Get it right on next day - fastest option possible.</p>

                                <div className="box-footer text-center">

                                    <input type="radio" name="delivery" value="delivery2" />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="box shipping-method">

                                <h4>USPS Next Day</h4>

                                <p>Get it right on next day - fastest option possible.</p>

                                <div className="box-footer text-center">

                                    <input type="radio" name="delivery" value="delivery3" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="box-footer">
                    <div className="pull-left">
                        <NavLink to="/checkout/address" className="btn btn-default"><i className="fa fa-chevron-left"></i>Back to Addresses</NavLink>
                    </div>
                    <div className="pull-right">
                        <NavLink to="/checkout/payment-method" className="btn btn-primary">Continue to Payment Method<i className="fa fa-chevron-right"></i></NavLink>
                    </div>
                </div>
            </div>
        );
    };
}

export default CheckoutDeliveryMethod;