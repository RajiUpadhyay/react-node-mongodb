import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TopLinks extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {}
    render() {
        return (
            <div id="top">
                <div className="container">
                    <div className="col-md-6 offer" data-animate="fadeInDown">
                        {/* <a href="#" className="btn btn-success btn-sm" data-animate-hover="shake">Offer of the day</a>  <a href="#">Get flat 35% off on orders over $50!</a> */}
                    </div>
                    <div className="col-md-6" data-animate="fadeInDown">
                        <ul className="menu">
                            {!localStorage.getItem('ACCESS_TOKEN') && <li><NavLink to="/login" exact activeStyle={{ fontWeight: 'bold' }}>Login</NavLink></li>}
                            {!localStorage.getItem('ACCESS_TOKEN') && <li><NavLink to="/register" exact activeStyle={{ fontWeight: 'bold' }}>Register</NavLink></li>}
                            {localStorage.getItem('ACCESS_TOKEN') && <li><NavLink to="/account/orders" exact activeStyle={{ fontWeight: 'bold' }}>My Account</NavLink></li>}
                            {localStorage.getItem('ACCESS_TOKEN') && <li><NavLink to="/dashboard/category" exact activeStyle={{ fontWeight: 'bold' }}>Dashboard</NavLink></li>}
                            <li><NavLink to="/recently-viewed" exact activeStyle={{ fontWeight: 'bold' }}>Rrecently Viewed</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">
                    <div className="modal-dialog modal-sm">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title" id="Login">Customer login</h4>
                            </div>
                            <div className="modal-body">
                                <form action="customer-orders.html" method="post">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="email-modal" placeholder="email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password-modal" placeholder="password" />
                                    </div>

                                    <p className="text-center">
                                        <button className="btn btn-primary"><i className="fa fa-sign-in"></i> Log in</button>
                                    </p>

                                </form>

                                <p className="text-center text-muted">Not registered yet?</p>
                                <p className="text-center text-muted"><a href="register.html"><strong>Register now</strong></a>! It is easy and done in 1&nbsp;minute and gives you access to special discounts and much more!</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

TopLinks.propTypes = {
    loginCredentials: PropTypes.object
};

const mapStateToProps = state => {
    return { loginCredentials: state.loginCredentials };
}

export default connect(mapStateToProps, {})(TopLinks);