import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';

import { getQueryObject } from '../../services/UtilityService'
import { getCategoryList, getProductTypeListWithParams } from '../../actions/DashboardAction';

class MainNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getCategoryList();
    }

    renderProductTypes(category) {
        if (this.state[category._id] && this.state[category._id].length)
            return (this.state[category._id] || []).map(productType => {
                return <li key={`${category._id}-${productType.product_type}`} >
                    <NavLink exact
                        to={`/category/${category._id}?product_type=${productType._id}`}>{productType.product_type}
                    </NavLink>
                </li>;
            });
    }

    urlstring(str) {
        return (str || '').replace(/\s+/g, '-').toLowerCase();
    }

    addCategoryProducts(category, list) {
        this.setState({ [category]: list });
    }

    render() {
        const categoryId = (getQueryObject('/category/:categoryId', this.props.history.location.pathname) || {}).categoryId;

        return (
            <div>
                <div className="navbar navbar-default yamm" role="navigation" id="navbar">
                    <div className="container">
                        <div className="navbar-header">

                            <a className="navbar-brand home" href="/" data-animate-hover="bounce">
                                <img src="/../img/logo.png" alt="Obaju logo" className="hidden-xs" />
                                <img src="/img/logo-small.png" alt="Obaju logo" className="visible-xs" /><span className="sr-only">Obaju - go to homepage</span>
                            </a>
                            <div className="navbar-buttons">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                                    <span className="sr-only">Toggle navigation</span>
                                    <i className="fa fa-align-justify"></i>
                                </button>
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#search">
                                    <span className="sr-only">Toggle search</span>
                                    <i className="fa fa-search"></i>
                                </button>
                                <a className="btn btn-default navbar-toggle" href="/basket">
                                    <i className="fa fa-shopping-cart"></i> <span className="hidden-xs">3 items in cart</span>
                                </a>
                            </div>
                        </div>

                        <div className="navbar-collapse collapse" id="navigation">
                            <ul className="nav navbar-nav navbar-left">
                                {(this.props.categoryList.list || []).map(category => {
                                    if (!category.productTypes) {
                                        this.props.getProductTypeListWithParams(
                                            { category_type: category._id },
                                            data => this.addCategoryProducts(category._id, data.list)
                                        );
                                        category.productTypes = 'done';
                                    }
                                    return <li className={`dropdown yamm-fw ${ categoryId === category._id ? 'navlink-active' : ''}`} key={category._id}>
                                        <NavLink activeClassName="navlink-active" exact to={'/category/' + category._id}>{category.category_type} <b className="caret"></b></NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <div className="yamm-content">
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <ul>
                                                                {this.renderProductTypes(category)}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                })}
                            </ul>
                        </div>

                        <div className="navbar-buttons">
                            <div className="navbar-collapse collapse right" id="basket-overview">
                                <a href="/basket" className="btn btn-primary navbar-btn"><i className="fa fa-shopping-cart"></i><span className="hidden-sm">3 items in cart</span></a>
                            </div>

                            <div className="navbar-collapse collapse right" id="search-not-mobile">
                                <button type="button" className="btn navbar-btn btn-primary" data-toggle="collapse" data-target="#search">
                                    <span className="sr-only">Toggle search</span>
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>

                        <div className="collapse clearfix" id="search">
                            <form className="navbar-form" role="search">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                    </span>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        );
    };
}


MainNavBar.propTypes = {
    categoryList: PropTypes.object,
    productTypeListWithParams: PropTypes.object
};

const mapStateToProps = state => {
    return {
        categoryList: state.categoryList,
        productTypeListWithParams: state.productTypeListWithParams
    };
}

export default connect(mapStateToProps, { getCategoryList, getProductTypeListWithParams })(MainNavBar);