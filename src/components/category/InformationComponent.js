import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createHistory from "history/createBrowserHistory";

import { changeProductDisplayCount, sortCategoryProducts } from '../../actions/CategoryAction';
const history = createHistory();


class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSet1: 3,
      viewSet2: 6,
      fields: {
        sort_by: ''
      }
    };
  }

  changeProductPerPage(event, limit) {
    this.props.changeProductDisplayCount(limit);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const categoryId = this.props.match.params.categoryId;
    if (prevProps.productList !== this.props.productList) {
      this.setState({ totalProductCount: this.props.productCount[categoryId] })
    }
  }

  handleSortByProducts(event, field) {
    let fields = this.state.fields;
    fields[field] = event.target.value;

    // this.props.categoryProductList.list = this.props.categoryProductList.list.sort((lhs, rhs) => {
    //   return lhs[event.target.value] > rhs[event.target.value];
    // });

    this.props.sortCategoryProducts({sortBy: event.target.value});
    console.log('====>', fields[field], this.props.categoryProductList.list)
    
    this.setState({ fields });
  }

  render() {
    const categoryId = this.props.match.params.categoryId;
    return (
      <div className="box info-bar">
        <div className="row">
          <div className="col-sm-12 col-md-4 products-showing">Showing <strong>{this.props.productPerPage}</strong> of <strong>{this.props.productCount[categoryId] < 1 ? <i className="fa fa-wrench" aria-hidden="true"></i> : this.props.productCount[categoryId]}</strong> products</div>

          <div className="col-sm-12 col-md-8  products-number-sort">
            <div className="row">
              <form className="form-inline">
                <div className="col-md-6 col-sm-6">
                  <div className="products-number">
                    <strong>Show</strong>
                    <a onClick={(event) => this.changeProductPerPage(event, this.state.viewSet1)}
                      className={`btn btn-default btn-sm ${this.props.productPerPage === this.state.viewSet1 ? 'btn-primary' : ''}`}>{this.state.viewSet1}</a>
                    <a onClick={(event) => this.changeProductPerPage(event, this.state.viewSet2)}
                      className={`btn btn-default btn-sm ${this.props.productPerPage === this.state.viewSet2 ? 'btn-primary' : ''}`}>{this.state.viewSet2}</a>
                    <a onClick={(event) => this.changeProductPerPage(event, this.props.productCount[categoryId])}
                      className={`btn btn-default btn-sm ${this.props.productPerPage === this.props.productCount[categoryId] ? 'btn-primary' : ''}`}>All</a> products
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="products-sort-by">
                    <strong>Sort by</strong>
                    <select onChange={(event) => this.handleSortByProducts(event, 'sort_by')} value={this.state.fields['sort_by']} id='sort_by' name='sort_by' className='form-control'>
                      <option value="">Sort</option>
                      <option value="product_price">Price</option>
                      <option value="product_name">Name</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

Description.propTypes = {
  // singleProduct: PropTypes.object
};

const mapStateToProps = state => {
  return {
    // singleProduct: state.singleProduct
  };
}

export default connect(mapStateToProps, {
  changeProductDisplayCount, sortCategoryProducts
})(Description);