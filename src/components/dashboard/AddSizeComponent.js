import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    insertSize, getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getProductTypeListWithParams
} from '../../actions/DashboardAction';

class AddSizeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { size_name: '', product_type: '', category_type: '' },
            errors: {},
            productTypeDisabled: true
        };
    }

    componentWillMount() {
        this.props.getCategoryList();
        this.props.getColorList();
        this.props.getSizeList();
        this.props.getProductTypeList({ distinct: true });
        this.props.getProductTypeListWithParams();
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
        if (field === 'category_type') {
            this.setState({ fields, productTypeDisabled: !(event.target.value || '').length });
            this.props.getProductTypeListWithParams({ category_type: event.target.value });
        } else {
            this.setState({ fields });
        }
    }

    insertSize = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertSize(this.state.fields);
            this.setState({ fields: { size_name: '', product_type: '', category_type: '' }, });
        }
    }

    render() {
        return (
            <div>
                <h3>Create Size</h3>
                {(this.props.lastAddedSize.failure || this.props.lastAddedSize.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedSize || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedSize || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertSize}>
                    <div className="row">

                        <div className='col-sm-3'>
                            <div className='form-group'>
                                <label htmlFor='category_type'>Category Name</label>
                                <select onChange={(event) => this.handleChange(event, 'category_type')} value={this.state.fields['category_type']} id='category_type' name='category_type' className='form-control'>
                                    <option value=''>Select</option>
                                    {(this.props.categoryList.list || []).map(item => {
                                        return <option
                                            value={item._id}
                                            key={item._id}
                                        >{item.category_type}</option>
                                    })}
                                </select>
                                <span style={{ color: 'red' }}>{this.state.errors['category_type']}</span>
                            </div>
                        </div>

                        <div className='col-sm-3'>
                            <div className='form-group'>
                                <label htmlFor='product_type'>Product Type</label>
                                <select disabled={this.state.productTypeDisabled ? true : null} onChange={(event) => this.handleChange(event, 'product_type')} value={this.state.fields['product_type']} id='product_type' name='product_type' className='form-control'>
                                    <option value=''>Select</option>
                                    {(this.props.productTypeListWithParams.list || []).map(item => {
                                        return <option
                                            value={item._id}
                                            key={item._id}
                                        >{item.product_type}</option>
                                    })}
                                </select>

                                <span style={{ color: 'red' }}>{this.state.errors['product_type']}</span>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="size_name">Size Name</label>
                                <input onChange={(event) => this.handleChange(event, 'size_name')} value={this.state.fields['size_name']} id="size_name" name="size_name" className="form-control" />
                                <span style={{ color: "red" }}>{this.state.errors['size_name']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add Size</button>
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

AddSizeComponent.propTypes = {
    insertSize: PropTypes.func.isRequired,
    lastAddedSize: PropTypes.object,
    categoryList: PropTypes.object,
    sizeList: PropTypes.object,
    colorList: PropTypes.object,
    brandList: PropTypes.object,
    productTypeList: PropTypes.object,
    productTypeListWithParams: PropTypes.object

};

const mapStateToProps = state => {
    return {
        lastAddedSize: state.lastAddedSize,
        categoryList: state.categoryList,
        sizeList: state.sizeList,
        colorList: state.colorList,
        brandList: state.brandList,
        productTypeList: state.productTypeList,
        productTypeListWithParams: state.productTypeListWithParams
    };
}

export default connect(mapStateToProps, { insertSize, getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getProductTypeListWithParams })(AddSizeComponent);