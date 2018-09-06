import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import qs from 'query-string';

class CategorySideBarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderProductTypes(category) {
        if (this.state[category._id] && this.state[category._id].length) {
            return (this.state[category._id] || []).map(productType => {
                const queryString = qs.parse(this.props.location.search);
                return <li
                    className={`${productType._id === queryString.product_type ? 'product-type-active' : ''}`}
                    key={`${category._id}-${productType.product_type}`}>
                    <NavLink exact
                        to={`/category/${category._id}?product_type=${this.urlstring(productType._id)}`}>{productType.product_type}
                    </NavLink>
                </li>;
            });
        }
    }

    urlstring(str) {
        return (str || '').toLowerCase();
    }

    addCategoryProducts(category, list) {
        this.setState({ [category]: list });
    }

    render() {
        const categoryId = this.props.match.params.categoryId;
        return (
            <div className="panel panel-default sidebar-menu">
                <div className="panel-heading">
                    <h3 className="panel-title">Categories</h3>
                </div>

                <div className="panel-body category-sidebar-menu">
                    <ul className="nav nav-pills nav-stacked category-menu">
                        {(this.props.categoryList.list || []).map(category => {
                            if (!category.productTypesSideBar) {
                                this.props.getProductTypeListWithParams({ category_type: category._id }, data => {
                                    return this.addCategoryProducts(category._id, data.list);
                                });
                                category.productTypesSideBar = 'done';
                            }
                            return <li key={category._id} className={categoryId === category._id ? 'extend-sub-menu' : 'collapse-sub-menu'}>
                                <NavLink activeClassName="navlink-active" exact to={'/category/' + category._id}>{category.category_type}
                                    <span className="badge pull-right">{this.props.productCount[category._id]}</span>
                                </NavLink>
                                <ul className="product-type">{this.renderProductTypes(category)}</ul>
                            </li>
                        })}
                    </ul>

                </div>
            </div>
        );
    };
}

export default CategorySideBarMenu;