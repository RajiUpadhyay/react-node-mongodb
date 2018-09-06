import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
const history = createHistory();

class CategorySideBarBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    applyBrandFilter(event) {
        this.props.addQueryStringToUrl({ 'product_brand': event.target.value }, { add: event.target.checked });
    }

    clearBrandFilter(event) {
        event.preventDefault();
        this.props.addQueryStringToUrl({ 'product_brand': event.target.value }, { clear: true });
        this.brandFilterForm.reset();
    }

    submitBrandFilter(event) {
        event.preventDefault();
        event.target.reset();
    }

    render() {
        return (
            <div className="panel panel-default sidebar-menu sidebar-brand-filter">
                <div className="panel-heading">
                    <h3 className="panel-title">Brands <a className="btn btn-xs btn-danger pull-right" onClick={(event) => this.clearBrandFilter(event)}><i className="fa fa-times-circle"></i> Clear</a></h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.submitBrandFilter} ref={(el) => this.brandFilterForm = el}>
                        <div className="form-group scroll-container">
                            {(this.props.brandList.list || []).map((brand, index) => {
                                return <div className="checkbox" key={`${brand.brand_name}-${index}`}>
                                    <label><input onChange={(event) => this.applyBrandFilter(event)} value={brand.brand_name} type="checkbox" />{brand.brand_name}</label>
                                </div>
                            })}
                        </div>

                        <button type="submit" className="btn btn-default btn-sm btn-primary"><i className="fa fa-pencil"></i> Apply</button>

                    </form>

                </div>
            </div>
        );
    };
}

export default CategorySideBarBrand;