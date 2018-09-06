import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentUser } from '../../actions/UsersAction';

import Account from './AccountComponent';
import Wishlist from './WishlistComponent';
import Orders from './OrdersComponent';

class MyAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false
        }
    }

    componentWillMount() {
        const authDetails = JSON.parse(localStorage.getItem('AUTH_DETAILS') || '{}');
        if (authDetails.email) this.props.currentUser(authDetails.email, () => {});
    }

    render() {
        if (this.state.loggedOut) {
            localStorage.clear();
            return <Redirect to="/login" push={true} />
        }
        return (
            <div>
                <div className="col-md-12">
                    <ul className="breadcrumb">
                        <li><NavLink to='/' exact>Home</NavLink></li>
                        <li>My account</li>
                    </ul>
                </div>

                <div className="col-md-3">
                    <div className="panel panel-default sidebar-menu">

                        <div className="panel-heading">
                            <h3 className="panel-title">Customer section</h3>
                        </div>

                        <div className="panel-body">
                            <ul className="nav nav-pills nav-stacked">
                                <li><NavLink activeClassName="active" exact to={`${this.props.match.url}/orders`}><i className="fa fa-list"></i> My orders</NavLink></li>
                                <li><NavLink activeClassName="active" exact to={`${this.props.match.url}/wishlist`}><i className="fa fa-heart"></i> My wishlist</NavLink></li>
                                <li><NavLink activeClassName="active" exact to={`${this.props.match.url}/details`}><i className="fa fa-user"></i> My account</NavLink></li>
                                <li><NavLink onClick={() => this.setState({ loggedOut: true })} activeClassName="active" exact to={`${this.props.match.url}`}><i className="fa fa-sign-out"></i> Logout</NavLink></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="col-md-9">
                    <Route path={`${this.props.match.path}/details`} exact name="details" component={Account} />
                    <Route path={`${this.props.match.path}/orders`} exact name="Orders" component={Orders} />
                    <Route path={`${this.props.match.path}/wishlist`} exact name="Wishlist" component={Wishlist} />
                </div>
            </div>
        );
    };
}

MyAccountComponent.propTypes = {
    currentUser: PropTypes.func.isRequired,
    loginCredentials: PropTypes.object,
    activeUser: PropTypes.object
};

const mapStateToProps = state => {
    return { loginCredentials: state.loginCredentials, activeUser: state.activeUser };
}

export default connect(mapStateToProps, { currentUser })(MyAccountComponent);