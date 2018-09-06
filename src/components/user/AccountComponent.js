import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/UsersAction';
import ChangePassword from './ChangePasswordComponent';
import UpdatePersonalDetails from './AddressManagementComponent';

class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="box">
                <h1>My account</h1>
                <p className="lead">Change your personal details or your password here.</p>
                <p className="text-muted">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

                <ChangePassword />
                <hr />
                <UpdatePersonalDetails />
            </div>
        );
    };
}

Account.propTypes = {
    login: PropTypes.func.isRequired,
    loginCredentials: PropTypes.object
};

const mapStateToProps = state => {
    return { loginCredentials: state.loginCredentials };
}

export default connect(mapStateToProps, { login })(Account);