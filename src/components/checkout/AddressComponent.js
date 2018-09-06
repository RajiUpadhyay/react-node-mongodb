import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class Address extends Component {
    render() {
        return (
            <div>
                <div className="content">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="firstname">Firstname</label>
                                <input type="text" className="form-control" id="firstname" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text" className="form-control" id="lastname" />
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.row --> */}

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input type="text" className="form-control" id="company" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <input type="text" className="form-control" id="street" />
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.row --> */}

                    <div className="row">
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="city">Company</label>
                                <input type="text" className="form-control" id="city" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="zip">ZIP</label>
                                <input type="text" className="form-control" id="zip" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <select className="form-control" id="state"></select>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <select className="form-control" id="country"></select>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="phone">Telephone</label>
                                <input type="text" className="form-control" id="phone" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="email" />
                            </div>
                        </div>

                    </div>
                    {/* <!-- /.row --> */}
                </div>

                <div className="box-footer">
                    <div className="pull-left">
                        <NavLink to="/basket" className="btn btn-default"><i className="fa fa-chevron-left"></i>Back to basket</NavLink>
                    </div>
                    <div className="pull-right">
                        <NavLink to="/checkout/delivery-method" className="btn btn-primary">Continue to Delivery Method<i className="fa fa-chevron-right"></i></NavLink>
                    </div>
                </div>
            </div>
        );
    };
}

export default Address;