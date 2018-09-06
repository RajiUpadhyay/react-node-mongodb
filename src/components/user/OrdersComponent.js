import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/UsersAction';
import SingleOrderDetails from './SingleOrderDetailsComponent';
import AllOrders from './AllOrdersComponent';

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="customer-order">
                <Route path={`${this.props.match.path}`} name="All Orders" component={AllOrders} />
                <Route path={`${this.props.match.path}/orderNumber`} name="Order Details" component={SingleOrderDetails} />
            </div>
        );
    };
}

Orders.propTypes = {
    login: PropTypes.func.isRequired,
    loginCredentials: PropTypes.object
};

const mapStateToProps = state => {
    return { loginCredentials: state.loginCredentials };
}

export default connect(mapStateToProps, { login })(Orders);