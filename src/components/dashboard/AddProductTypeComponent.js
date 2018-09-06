import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { insertProductType, getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList } from '../../actions/DashboardAction';

class AddProductTypeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { category_type: '', product_type: '' },
            errors: {}
        };
    }

    componentDidMount() {
        this.props.getCategoryList();
        this.props.getColorList();
        this.props.getSizeList();
        this.props.getProductTypeList();
        this.props.getBrandList();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;

        for (const prop in fields) {
            const isFilled = fields[prop].join ? fields[prop].length : fields[prop];
            !isFilled ? (isValid = false, errors[prop] = 'Cannot be empty') : errors[prop] = '';
        }

        this.setState({ errors: errors });
        return isValid;
    }

    handleChange(event, field) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
    }

    insertProductType = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertProductType(this.state.fields);
            this.setState({ fields: { category_type: '', product_type: '' }, });
        }
    }

    render() {
        return (
            <div>
                <h3>Create Product Type</h3>
                {(this.props.lastAddedProductType.failure || this.props.lastAddedProductType.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedProductType || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedProductType || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertProductType}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="category_type">Select Category</label>
                                <select onChange={(event) => this.handleChange(event, 'category_type')} value={this.state.fields['category_type']} id="category_type" name="category_type" className="form-control">
                                    <option value="">Select</option>
                                    {(this.props.categoryList.list || []).map(item => {
                                        return <option
                                            value={item._id}
                                            key={item._id}
                                        >{item.category_type}</option>
                                    })}
                                </select>

                                <span style={{ color: "red" }}>{this.state.errors['category_type']}</span>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="product_type">Product type in selected category</label>
                                <input onChange={(event) => this.handleChange(event, 'product_type')} value={this.state.fields['product_type']} id="product_type" name="product_type" className="form-control" />

                                <span style={{ color: "red" }}>{this.state.errors['product_type']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add Product Type</button>
                        <NavLink className="btn btn-success view-list" exact to={`${this.props.location.pathname}/list`}>
                            <i className="fa fa-eye" aria-hidden="true"></i> View List
                        </NavLink>
                    </div>
                    <div className="clear"></div>
                </form>
            </div>
        );
    };
}

AddProductTypeComponent.propTypes = {
    insertProductType: PropTypes.func.isRequired,
    lastAddedProductType: PropTypes.object,
    categoryList: PropTypes.object,
    sizeList: PropTypes.object,
    colorList: PropTypes.object,
    brandList: PropTypes.object,
    productTypeList: PropTypes.object
};

const mapStateToProps = state => {
    return {
        lastAddedProductType: state.lastAddedProductType,
        categoryList: state.categoryList,
        sizeList: state.sizeList,
        colorList: state.colorList,
        brandList: state.brandList,
        productTypeList: state.productTypeList
    };
}

export default connect(mapStateToProps, { insertProductType, getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList })(AddProductTypeComponent);