import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    insertProduct, getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getProductTypeListWithParams
} from '../../actions/DashboardAction';

const initialFieldState = {
    product_name: '',
    product_price: '',
    product_discount: '',
    product_type: '',
    category_type: '',
    product_color: [],
    product_size: [],
    product_brand: [],
    product_images: [],
    thumb_images: [],
    rating: '0',
    quantity: '1',
    product_gender: 'FM',
    sale_or_new: 'N'
};

const initialOtherFieldState = {
    productTypeDisabled: true,
    productColorDisabled: true,
    productSizeDisabled: true,
    productBrandDisabled: true,
    formValidationInit: false,
    productThumbImage: 1,
    productMainImage: 1
}

const allowedSkuFields = [
    'product_name', 'product_type', 'product_gender', 'category_type', 'product_color', 'product_size', 'product_brand'
];

class AddProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: Object.assign({}, initialFieldState),
            errors: {},
            ...Object.assign({}, initialOtherFieldState)
        };
    }

    componentDidMount() {
        this.props.getCategoryList();
        this.props.getProductTypeList();
        this.props.getProductTypeListWithParams();
    }

    productColorCheckbox(item) {
        return this.state.fields.product_color.filter(object => object.value === item.color_code).length;
    }

    productSizeCheckbox(item) {
        return this.state.fields.product_size.filter(object => object.value === item.size_name).length;
    }

    productBrandCheckbox(item) {
        return this.state.fields.product_brand.filter(object => object.value === item.brand_name).length;
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

        const pushValue = () => {
            if (event.target.checked) {
                fields[field].push({ value: event.target.value });
            } else {
                const position = fields[field].map(item => item.vaule).indexOf(event.target.value);
                fields[field].splice(position, 1);
            }
            this.setState({ fields });
        }

        switch (field) {
            case 'category_type':
                fields[field] = event.target.value;
                this.setState({ fields, productTypeDisabled: !(event.target.value || '').length });
                this.props.getProductTypeListWithParams({ category_type: event.target.value });
                break;
            case 'product_type':
                fields[field] = event.target.value;
                this.props.getColorList();
                this.props.getSizeList({ product_type: event.target.value });
                this.props.getBrandList({ product_type: event.target.value });
                this.setState({
                    fields: fields,
                    productSizeDisabled: !(event.target.value || '').length,
                    productColorDisabled: !(event.target.value || '').length,
                    productBrandDisabled: !(event.target.value || '').length
                });
                break;
            case 'product_color': pushValue(); break;
            case 'product_brand': pushValue(); break;
            case 'product_size': pushValue(); break;
            case 'product_images': fields[field].push(event.target.files[0]); this.setState({ fields }); break;
            case 'thumb_images': fields[field].push(event.target.files[0]); this.setState({ fields }); break;
            default: fields[field] = event.target.value; this.setState({ fields });
        }
        this.state.formValidationInit && this.handleValidation();
    }

    generateSku() {
        const sku = [];
        for (let i = 0; i < allowedSkuFields.length; i++) {
            if (!this.state.fields[allowedSkuFields[i]].join) {
                sku.push(this.state.fields[allowedSkuFields[i]]);
            }
        }
        return sku.join('-').trim().replace(/\s+/g, '-').toUpperCase();
    }

    removeProductImage(event) {
        this.setState({
            productThumbImage: this.state.productThumbImage > 1 ? this.state.productThumbImage - 1 : 1,
            productMainImage: this.state.productMainImage > 1 ? this.state.productMainImage - 1 : 1
        })
    }

    addProductImage(event) {
        this.setState({
            productThumbImage: this.state.productThumbImage + 1,
            productMainImage: this.state.productMainImage + 1
        })
    }

    printProductThumbImages() {
        let thumbs = [];
        for (let i = 0; i < this.state.productThumbImage; i++) {
            thumbs.push(
                <div className="col-md-3" key={`${i}`}>
                    <div className="form-group">
                        <label>Alternate {i + 1}</label>
                        <div className="input-group">
                            <input type="file" onChange={(event) => this.handleChange(event, 'thumb_images')} />
                            <span style={{ color: 'red' }}>{this.state.errors['thumb_images']}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return thumbs;
    }

    printProductMainImages() {
        let main = [];
        for (let i = 0; i < this.state.productMainImage; i++) {
            main.push(
                <div className="col-md-3" key={`${i}`}>
                    <div className="form-group">
                        <label>Upload product main image {i + 1}</label>
                        <div className="input-group">
                            <input type="file" onChange={(event) => this.handleChange(event, 'product_images')} />
                            <span style={{ color: 'red' }}>{this.state.errors['product_images']}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return main;
    }

    insertProduct = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertProduct({ ...this.state.fields, sku: this.generateSku() });
            this.setState({fields: Object.assign({}, initialFieldState), ...Object.assign({}, initialOtherFieldState)});
        } else {
            this.setState({ formValidationInit: true });
        }
        event.target.reset();
    }

    render() {
        return (
            <div>
                <h3>Create Product</h3>
                {(this.props.lastAddedProduct.failure || this.props.lastAddedProduct.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedProduct || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedProduct || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertProduct} ref={(el) => this.insertProductForm = el}>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='category_type'>Category Name</label>
                                <select onChange={(event) => this.handleChange(event, 'category_type')} value={this.state.fields['category_type']} id='category_type' name='category_type' className='form-control'>
                                    <option value=''>Select</option>
                                    {(this.props.categoryList.list || []).map(item => {
                                        return <option value={item._id} key={item._id}>{item.category_type}</option>
                                    })}
                                </select>
                                <span style={{ color: 'red' }}>{this.state.errors['category_type']}</span>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='product_type'>Product Type</label>
                                <select 
                                    disabled={this.state.productTypeDisabled ? true : null} 
                                    onChange={(event) => this.handleChange(event, 'product_type')} 
                                    value={this.state.fields['product_type']} 
                                    id='product_type' 
                                    name='product_type' 
                                    className='form-control'>
                                    <option value=''>Select</option>
                                    {(this.props.productTypeListWithParams.list || []).map(item => {
                                        return <option value={item._id} key={item._id}>{item.product_type}</option>
                                    })}
                                </select>

                                <span style={{ color: 'red' }}>{this.state.errors['product_type']}</span>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='product_name'>Name</label>
                                <input onChange={(event) => this.handleChange(event, 'product_name')} value={this.state.fields['product_name']} id='product_name' name='product_name' className='form-control' />
                                <span style={{ color: 'red' }}>{this.state.errors['product_name']}</span>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='product_price'>Price</label>
                                <input onChange={(event) => this.handleChange(event, 'product_price')} value={this.state.fields['product_price']} id='product_price' name='product_price' className='form-control' type='number' />
                                <span style={{ color: 'red' }}>{this.state.errors['product_price']}</span>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='product_discount'>Discount</label>
                                <input onChange={(event) => this.handleChange(event, 'product_discount')} value={this.state.fields['product_discount']} id='product_discount' name='product_discount' className='form-control' type='number' />
                                <span style={{ color: 'red' }}>{this.state.errors['product_discount']}</span>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='product_gender'>Gender</label>
                                <select onChange={(event) => this.handleChange(event, 'product_gender')} value={this.state.fields['product_gender']} id='product_gender' name='product_gender' className='form-control'>
                                    <option value='FM'>All</option>
                                    <option value='M'>Men</option>
                                    <option value='F'>Women</option>
                                </select>
                                {/* <span style={{ color: 'red' }}>{this.state.errors['product_gender']}</span> */}
                            </div>
                        </div>
                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='sale_or_new'>Sale or New?</label>
                                <select onChange={(event) => this.handleChange(event, 'sale_or_new')} value={this.state.fields['sale_or_new']} id='sale_or_new' name='sale_or_new' className='form-control'>
                                    <option value='N'>New</option>
                                    <option value='S'>Sale</option>
                                </select>
                                {/* <span style={{ color: 'red' }}>{this.state.errors['sale_or_new']}</span> */}
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='rating'>Rating</label>
                                <input type="number" onChange={(event) => this.handleChange(event, 'rating')} value={this.state.fields['rating']} id='rating' name='rating' className='form-control' />
                                <span style={{ color: 'red' }}>{this.state.errors['rating']}</span>
                            </div>
                        </div>

                        <div className='col-sm-2'>
                            <div className='form-group'>
                                <label htmlFor='quantity'>Quantity</label>
                                <input type="text" onChange={(event) => this.handleChange(event, 'quantity')} value={this.state.fields['quantity']} id='quantity' name='quantity' className='form-control' />
                                <span style={{ color: 'red' }}>{this.state.errors['quantity']}</span>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-4'>
                            <label>Select Color</label>
                            <div className='form-group checkobox-group-boxes'>
                                {(this.props.colorList.list || []).map((item, index) => {
                                    return <div className='checkbox' key={item._id}>
                                        <label>
                                            <input
                                                checked={this.productColorCheckbox(item)}
                                                disabled={this.state.productColorDisabled ? true : null}
                                                onChange={(event) => this.handleChange(event, 'product_color')}
                                                name={item.color_code} id={item.color_code} value={item.color_code}
                                                type='checkbox' />
                                            <span className='colour white'></span> {item.color_name.toUpperCase()}
                                        </label>
                                    </div>
                                })}
                                {!(this.props.colorList.list || []).length && <span className='empty-list-message'>Empty List!</span>}
                            </div>
                            <span style={{ color: 'red' }}>{this.state.errors['product_color']}</span>
                        </div>

                        <div className='col-sm-4'>
                            <label>Select Size</label>
                            <div className='form-group checkobox-group-boxes'>
                                {(this.props.sizeList.list || [])
                                    .sort((a, b) => a.size_name - b.size_name)
                                    .map((item, index) => {
                                        return <div className='checkbox' key={item._id}>
                                            <label>
                                                <input
                                                    checked={this.productSizeCheckbox(item)}
                                                    disabled={this.state.productSizeDisabled ? true : null}
                                                    onChange={(event) => this.handleChange(event, 'product_size')}
                                                    name={item.size_name} value={item.size_name}
                                                    type='checkbox' />
                                                <span className='colour white'></span> {item.size_name.toUpperCase()}
                                            </label>
                                        </div>
                                    })}
                                {!(this.props.sizeList.list || []).length && <span className='empty-list-message'>Empty List!</span>}
                            </div>
                            <span style={{ color: 'red' }}>{this.state.errors['product_size']}</span>
                        </div>

                        <div className='col-sm-4'>
                            <label>Select Brand</label>
                            <div className='form-group checkobox-group-boxes'>
                                {(this.props.brandList.list || []).map((item, index) => {
                                    return <div className='checkbox' key={item._id + '-' + index}>
                                        <label>
                                            <input
                                                // checked={this.productBrandCheckbox(item)}
                                                disabled={this.state.productBrandDisabled ? true : null}
                                                onChange={(event) => this.handleChange(event, 'product_brand')}
                                                name='product_brand' value={item.brand_name}
                                                type='radio' />
                                            <span className='colour white'></span> {item.brand_name.toUpperCase()}
                                        </label>
                                    </div>
                                })}
                                {!(this.props.brandList.list || []).length && <span className='empty-list-message'>Empty List!</span>}
                            </div>
                            <span style={{ color: 'red' }}>{this.state.errors['product_brand']}</span>
                        </div>
                    </div>

                    <div className='row upload-images'>
                        {this.printProductMainImages()}
                        <div className='clear'></div>

                        {this.printProductThumbImages()}
                        <div className='clear'></div>
                    </div>

                    <div className='row upload-images'>
                        <div className="col-md-12 upload-image-box">
                            {this.state.productThumbImage < 4 && <button className="btn btn-primary" disabled={this.state.productThumbImage > 3 ? true : null} type="button" onClick={(event) => this.addProductImage(event)}>Add<i className="fa fa-remove" aria-hidden="true"></i></button>}

                            <button className="btn btn-danger" disabled={this.state.productThumbImage < 2 ? true : null} type="button" onClick={(event) => this.removeProductImage(event)}>Delete<i className="fa fa-remove" aria-hidden="true"></i></button>
                        </div>
                    </div>

                    <div className='col-sm-12 text-center addinto-db-button'>
                        <button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Add Product</button>
                        <NavLink className="btn btn-success view-list" exact to={`${this.props.location.pathname}/list`}>
                            <i className="fa fa-eye" aria-hidden="true"></i> View List
                        </NavLink>
                    </div>
                    <div className='clear'></div>
                </form>
            </div>
        );
    };
}

AddProductComponent.propTypes = {
    insertProduct: PropTypes.func.isRequired,
    productTypeListWithParams: PropTypes.func.isRequired,
    lastAddedProduct: PropTypes.object,
    categoryList: PropTypes.object,
    sizeList: PropTypes.object,
    colorList: PropTypes.object,
    brandList: PropTypes.object,
    productTypeList: PropTypes.object,
    productTypeListWithParams: PropTypes.object
};

const mapStateToProps = state => {
    return {
        lastAddedProduct: state.lastAddedProduct,
        categoryList: state.categoryList,
        sizeList: state.sizeList,
        colorList: state.colorList,
        brandList: state.brandList,
        productTypeList: state.productTypeList,
        productTypeListWithParams: state.productTypeListWithParams
    };
}

export default connect(mapStateToProps, {
    insertProduct, getCategoryList, getSizeList, getColorList, getBrandList, getProductTypeList, getProductTypeListWithParams
})(AddProductComponent);