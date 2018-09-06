import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/UsersAction';

class AllOrders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="box">
                <h1>My orders</h1>

                <p className="lead">Your orders on one place.</p>
                <p className="text-muted">If you have any questions, please feel free to <a href="contact.html">contact us</a>, our customer service center is working for you 24/7.</p>

                <hr />

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th># 1735</th>
                                <td>22/06/2013</td>
                                <td>$ 150.00</td>
                                <td><span className="label label-info">Being prepared</span>
                                </td>
                                <td><NavLink className="btn btn-primary btn-sm" exact to={`/account/orders/1735`}>View</NavLink></td>
                            </tr>
                            <tr>
                                <th># 1735</th>
                                <td>22/06/2013</td>
                                <td>$ 150.00</td>
                                <td><span className="label label-info">Being prepared</span>
                                </td>
                                <td><a href="customer-order.html" className="btn btn-primary btn-sm">View</a>
                                </td>
                            </tr>
                            <tr>
                                <th># 1735</th>
                                <td>22/06/2013</td>
                                <td>$ 150.00</td>
                                <td><span className="label label-success">Received</span>
                                </td>
                                <td><a href="customer-order.html" className="btn btn-primary btn-sm">View</a>
                                </td>
                            </tr>
                            <tr>
                                <th># 1735</th>
                                <td>22/06/2013</td>
                                <td>$ 150.00</td>
                                <td><span className="label label-danger">Cancelled</span>
                                </td>
                                <td><a href="customer-order.html" className="btn btn-primary btn-sm">View</a>
                                </td>
                            </tr>
                            <tr>
                                <th># 1735</th>
                                <td>22/06/2013</td>
                                <td>$ 150.00</td>
                                <td><span className="label label-warning">On hold</span>
                                </td>
                                <td><a href="customer-order.html" className="btn btn-primary btn-sm">View</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}

AllOrders.propTypes = {
    login: PropTypes.func.isRequired,
    loginCredentials: PropTypes.object
};

const mapStateToProps = state => {
    return { loginCredentials: state.loginCredentials };
}

export default connect(mapStateToProps, { login })(AllOrders);