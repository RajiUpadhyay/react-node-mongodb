import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class CheckoutPaymentMethod extends Component {

    render() {
        return (
            <div>
                <div className="content">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="box payment-method">

                                <h4>Paypal</h4>

                                <p>We like it all.</p>

                                <div className="box-footer text-center">

                                    <input type="radio" name="payment" value="payment1" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="box payment-method">

                                <h4>Payment gateway</h4>

                                <p>VISA and Mastercard only.</p>

                                <div className="box-footer text-center">

                                    <input type="radio" name="payment" value="payment2" />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="box payment-method">

                                <h4>Cash on delivery</h4>

                                <p>You pay when you get it.</p>

                                <div className="box-footer text-center">

                                    <input type="radio" name="payment" value="payment3" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.row --> */}

                </div>
                {/* <!-- /.content --> */}

                <div className="box-footer">
                    <div className="pull-left">
                        <NavLink to="/checkout/delivery-method" className="btn btn-default"><i className="fa fa-chevron-left"></i>Back to Shipping method</NavLink>
                    </div>
                    <div className="pull-right">
                        <NavLink to="/checkout/order-review" className="btn btn-primary">Continue to Order review<i className="fa fa-chevron-right"></i></NavLink>
                    </div>
                </div>
            </div>
        );
    };
}

export default CheckoutPaymentMethod;