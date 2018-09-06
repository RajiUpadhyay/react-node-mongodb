import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'query-string';

import SideBarMenu from './SideBarMenuComponent';
import SideBarBrand from './SideBarBrandComponent';
import SideBarColors from './SideBarColorsComponent';
import SideBarBanner from './SideBarBannerComponent';
import Description from './DescriptionComponent';
import Information from './InformationComponent';
import ProductList from './ProductListComponent';
import Pagination from './PaginationComponent';

import {
  getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getProductTypeListWithParams
} from '../../actions/DashboardAction';
import { addQueryStringToUrl, getProductCount, getCategoryProductList } from '../../actions/CategoryAction';

class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: []
    };
  }

  componentDidMount(prevProps, prevState, snapshot) {
    const categoryId = this.props.match.params.categoryId;
    const queryString = qs.parse(this.props.location.search);
    const query = { product_type: queryString.product_type, category_type: categoryId };
    this.props.addQueryStringToUrl(query, { add: true });
    this.props.getProductCount();
    this.props.getCategoryList();
    this.props.getCategoryProductList({ category_type: categoryId, limit: this.props.productPerPage });
    this.props.getColorList();
    this.props.getBrandList({ distinct: true, category_type: categoryId, product_type: queryString.product_type || '' });
  }

  categoryQuery(object) {
    const query = {};
    for (const prop in object) {
      const property = object[prop];
      if (((property || '').join ? property.length : property) && object.hasOwnProperty(prop)) {
        query[prop] = property
      }
    }
    return query;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const categoryId = this.props.match.params.categoryId;
    const queryString = qs.parse(this.props.location.search);

    if (prevProps.match.params !== this.props.match.params) {
      this.props.addQueryStringToUrl({ category_type: categoryId, product_type: '' }, { add: true });
      this.props.getBrandList({ distinct: true, category_type: categoryId, product_type: queryString.product_type || '' });
    }

    if (prevProps.location.search !== this.props.location.search) {
      this.props.getBrandList({ distinct: true, category_type: categoryId, product_type: queryString.product_type || '' });
      this.props.addQueryStringToUrl({ ...queryString, category_type: categoryId }, { add: true });
    }

    if (prevProps.categoryFilterQuery !== this.props.categoryFilterQuery) {
      const query = this.categoryQuery(this.props.categoryFilterQuery);
      this.props.getCategoryProductList({ ...query, limit: this.props.productPerPage });
    }

    if (prevProps.brandList !== this.props.brandList) {
      this.props.addQueryStringToUrl({ product_brand: '' }, { clear: true });
    }

    if (prevProps.productPerPage !== this.props.productPerPage) {
      const query = this.categoryQuery(this.props.categoryFilterQuery);
      this.props.getCategoryProductList({ ...query, limit: this.props.productPerPage });
      console.log('TEST', this.props.productPerPage)
    }
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li><NavLink to='/' exact>Home</NavLink></li>
            <li><NavLink to='/category/men' exact>Men</NavLink></li>
            <li>T-Shirts</li>
          </ul>
        </div>

        <div className="col-md-3">
          <SideBarMenu {...this.props} />
          <SideBarBrand {...this.props} />
          <SideBarColors {...this.props} />
          <SideBarBanner {...this.props} />
        </div>

        <div className="col-md-9">
          <Description {...this.props} />
          <Information {...this.props} />
          <ProductList {...this.props} />
          <Pagination {...this.props} />
        </div>
      </div>
    );
  };
}

CategoryComponent.propTypes = {
  getCategoryProductList: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  getSizeList: PropTypes.func.isRequired,
  getColorList: PropTypes.func.isRequired,
  getBrandList: PropTypes.func.isRequired,
  getProductTypeList: PropTypes.func.isRequired,
  getProductTypeListWithParams: PropTypes.func.isRequired,
  addQueryStringToUrl: PropTypes.func.isRequired,
  addQueryStringToUrl: PropTypes.func.isRequired,

  productCount: PropTypes.object,
  productPerPage: PropTypes.number,
  categoryList: PropTypes.object,
  categoryProductList: PropTypes.object,
  sizeList: PropTypes.object,
  colorList: PropTypes.object,
  brandList: PropTypes.object,
  productTypeList: PropTypes.object,
  productTypeListWithParams: PropTypes.object,
  categoryFilterQuery: PropTypes.object
};

const mapStateToProps = state => {
  return {
    productCount: state.productCount,
    productPerPage: state.productPerPage,
    categoryList: state.categoryList,
    sizeList: state.sizeList,
    colorList: state.colorList,
    brandList: state.brandList,
    productTypeList: state.productTypeList,
    productTypeListWithParams: state.productTypeListWithParams,
    categoryFilterQuery: state.categoryFilterQuery,
    categoryProductList: state.categoryProductList
  };
}

export default connect(mapStateToProps, {
  getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getCategoryProductList, getProductTypeListWithParams, addQueryStringToUrl, getProductCount
})(CategoryComponent);