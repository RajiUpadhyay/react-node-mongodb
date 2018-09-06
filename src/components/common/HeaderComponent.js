import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopLinks from './TopLinksComponent';
import MainNavBar from './MainNavBarComponent';

import { 
  getCategoryList, getProductTypeList, getProductTypeListWithParams
} from '../../actions/DashboardAction';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
          <TopLinks {...this.props} />
          <MainNavBar {...this.props} />
      </div>
    );
  };
}


Header.propTypes = {
  getCategoryList: PropTypes.func.isRequired,
  getProductTypeList: PropTypes.func.isRequired,
  getProductTypeListWithParams: PropTypes.func.isRequired,

  categoryList: PropTypes.object,
  productTypeList: PropTypes.object,
  productTypeListWithParams: PropTypes.object
};

const mapStateToProps = state => {
  return {
      categoryList: state.categoryList,
      productTypeList: state.productTypeList,
      productTypeListWithParams: state.productTypeListWithParams
  };
}

export default connect(mapStateToProps, { getCategoryList, getProductTypeList, getProductTypeListWithParams })(Header);