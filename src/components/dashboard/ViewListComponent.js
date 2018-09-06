import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';

import {
    getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getProductTypeListWithParams, getProductList, getStateList, getCityList, getCountryList, deleteDocument
} from '../../actions/DashboardAction';

class AddProductTypeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excludeFields: ['_id', '__v', 'productTypes', 'sku', 'created_by', 'created_at', 'updated_at', 'sale_or_new', 'product_gender', 'product_price', 'rating', 'product_discount']
        };
    }

    componentDidMount() {
        this.props[this.props.params.method]();
    }

    editDocument(event, item) {
        console.log('edit, item', event, item)
    }

    deleteDocument(event, item) {
        alertify.confirm(`Delete ${this.props.params.api}`, `Are you sure to remove ${this.props.params.api}?`, () => {
            this.props.deleteDocument({_id: item._id, ...this.props.params}, (response) => {
                if(response.success) {
                    alertify.success(`${response.success.message}`);
                } else {
                    alertify.error(`${response.failure.message}`);
                }
            });
		}, () => {});
    }

    getColumnValue(item) {
        return Object.keys(item).map((key, index) => {
            if(this.state.excludeFields.indexOf(key) > -1) return;
            return <td key={key + index}>{
                (item[key]).constructor.name === 'Array' ? item[key].map(o => o.value).join(', ') : item[key].toString()
            }</td>;
        })
    }

    render() {
        let headerFields = [];
        let fieldValues = '';
        if (this.props[this.props.params.stateName].list[0]) {
            headerFields = Object.keys(this.props[[this.props.params.stateName]].list[0]);
            fieldValues = this.props[this.props.params.stateName].list;
        }

        if(!fieldValues.length) return (<h3>No data found!</h3>);
        return (
            <div>
                <h3></h3>
                {(this.props.lastDeletedDocument.failure || this.props.lastDeletedDocument.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastDeletedDocument || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastDeletedDocument || {}).success || {}).message}</span>
                </div>}
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="mytable" className="table table-bordred table-striped">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="checkall" /></th>
                                        {(headerFields || []).map(key => {
                                            if(this.state.excludeFields.indexOf(key) > -1) return;
                                            return <th key={key}>{key}</th>;
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(fieldValues || []).map((item, index) => {
                                        return <tr key={Date.now() + index}>
                                            <td width="30"><input type="checkbox" className="checkthis" /></td>
                                            {this.getColumnValue(item)}
                                            <td width="60">
                                                <button onClick={(event) => this.editDocument(event, item)} className="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit"><i className="fa fa-edit" aria-hidden="true"></i></button>
                                            </td>
                                            <td width="60">
                                                <button onClick={(event) => this.deleteDocument(event, item)} className="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete"><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>;
                                    })}
                                </tbody>
                            </table>
                            <div className="clearfix"></div>
                            <ul className="pagination pull-right">
                                <li className="disabled"><a href="#"><i className="fa fa-arrow-left" aria-hidden="true"></i></a></li>
                                <li className="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#"><i className="fa fa-arrow-right" aria-hidden="true"></i></a></li>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>
        );
    };
}

AddProductTypeComponent.propTypes = {
    getCategoryList: PropTypes.func.isRequired,
    
    categoryList: PropTypes.object,
    sizeList: PropTypes.object,
    productList: PropTypes.object,
    cityList: PropTypes.object,
    stateList: PropTypes.object,
    countryList: PropTypes.object,
    colorList: PropTypes.object,
    brandList: PropTypes.object,
    productTypeList: PropTypes.object,
    productTypeListWithParams: PropTypes.object,
    lastDeletedDocument: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        categoryList: state.categoryList,
        sizeList: state.sizeList,
        productList: state.productList,
        cityList: state.cityList,
        stateList: state.stateList,
        countryList: state.countryList,
        colorList: state.colorList,
        brandList: state.brandList,
        productTypeList: state.productTypeList,
        productTypeListWithParams: state.productTypeListWithParams,
        lastDeletedDocument: state.lastDeletedDocument
        
    };
}

export default connect(mapStateToProps, {
    getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getProductTypeListWithParams, getProductList, getStateList, getCityList, getCountryList, deleteDocument
})(AddProductTypeComponent);