import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategoryList } from '../../actions/DashboardAction';

import AddCategoryComponent from './AddCategoryComponent';
import AddProductComponent from './AddProductComponent';
import AddColorComponent from './AddColorComponent';
import AddSizeComponent from './AddSizeComponent';
import AddCountryComponent from './AddCountryComponent';
import AddStateComponent from './AddStateComponent';
import AddCityComponent from './AddCityComponent';
import AddBrandComponent from './AddBrandComponent';
import AddProductTypeComponent from './AddProductTypeComponent';
import ViewListComponent from './ViewListComponent';


class AddMainComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
        return (
            <div className="dashboard-container">
                <ul className="nav nav-pills nav-justified dashboard-links">
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/category`} >Category</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/product-type`} >Product Type</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/product`}>Product</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/color`}>Color</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/size`}>Size</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/brand`}>Brand</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/country`}>Country</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/state`}>State</NavLink></li>
                    <li><NavLink activeClassName="active" to={`${this.props.match.url}/city`}>City</NavLink></li>
                </ul>
                <div className="dashboard-content">
                    {/* <Redirect to={`${this.props.match.path}/category`} /> */}
                    <Route path={`${this.props.match.path}/category`} exact name="category" component={AddCategoryComponent} />
                    <Route path={`${this.props.match.path}/product-type`} exact name="product type" component={AddProductTypeComponent} />
                    <Route path={`${this.props.match.path}/product`} exact name="product" component={AddProductComponent} />
                    <Route path={`${this.props.match.path}/color`} exact name="color" component={AddColorComponent} />
                    <Route path={`${this.props.match.path}/size`} exact name="size" component={AddSizeComponent} />
                    <Route path={`${this.props.match.path}/brand`} exact name="brand" component={AddBrandComponent} />
                    <Route path={`${this.props.match.path}/country`} exact name="country" component={AddCountryComponent} />
                    <Route path={`${this.props.match.path}/state`} exact name="state" component={AddStateComponent} />
                    <Route path={`${this.props.match.path}/city`} exact name="city" component={AddCityComponent} />

                    <Route path={`${this.props.match.path}/category/list`} exact name="category"
                        render={(props) => {
                            return <ViewListComponent params={{ 
                                method: 'getCategoryList', stateName: 'categoryList', api: 'category'
                            }} {...props} />;
                        }} />
                    
                    <Route path={`${this.props.match.path}/product-type/list`} exact name="product type" render={(props) => {
                        return <ViewListComponent params={{
                            method: 'getProductTypeList', stateName: 'productTypeList', api: 'product-type'
                        }} {...props} />;
                    }} />

                    <Route path={`${this.props.match.path}/product/list`} exact name="product" render={(props) => {
                        return <ViewListComponent params={{ 
                            method: 'getProductList', stateName: 'productList', api: 'product' 
                        }} {...props} />;
                    }} />
                    
                    <Route path={`${this.props.match.path}/color/list`} exact name="color" render={(props) => {
                        return <ViewListComponent params={{
                             method: 'getColorList', stateName: 'colorList', api: 'color' 
                            }} {...props} />;
                    }} />
                    
                    <Route path={`${this.props.match.path}/size/list`} exact name="size" render={(props) => {
                        return <ViewListComponent params={{ 
                            method: 'getSizeList', stateName: 'sizeList', api: 'size'
                        }} {...props} />;
                    }} />
                    
                    <Route path={`${this.props.match.path}/brand/list`} exact name="brand" render={(props) => {
                        return <ViewListComponent params={{
                             method: 'getBrandList', stateName: 'brandList', api: 'brand' 
                            }} {...props} />;
                    }} />
                    
                    <Route path={`${this.props.match.path}/country/list`} exact name="country" render={(props) => {
                        return <ViewListComponent params={{ 
                            method: 'getCountryList', stateName: 'countryList', api: 'country' 
                        }} {...props} />;
                    }} />
                    
                    <Route path={`${this.props.match.path}/state/list`} exact name="state" render={(props) => {
                        return <ViewListComponent params={{ 
                            method: 'getStateList', stateName: 'stateList', api: 'state' 
                        }} {...props} />;
                    }} />
                    
                    <Route path={`${this.props.match.path}/city/list`} exact name="city" render={(props) => {
                        return <ViewListComponent params={{ 
                            method: 'getCityList', stateName: 'cityList', api: 'city' 
                        }} {...props} />;
                    }} />
                </div>
            </div>
        );
    };
}

AddMainComponent.propTypes = {
    getCategoryList: PropTypes.func.isRequired,
    categoryList: PropTypes.object
};

const mapStateToProps = state => {
    return {
        categoryList: state.categoryList
    };
}

export default connect(mapStateToProps, { getCategoryList })(AddMainComponent);