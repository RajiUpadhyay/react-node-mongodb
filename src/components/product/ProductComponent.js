import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

import RecentlyViewed from './RecentlyViewedComponent';
import YouMayAlsoLike from './YouMayAlsoLikeComponent';
import RatingAndReviewComponent from '../common/RatingAndReviewComponent';

import { getSizeList, getColorList } from '../../actions/DashboardAction';
import {getSingleProduct} from '../../actions/ProductAction';

const initialState = {
    product_id: '',
    product_color: '',
    product_size: '',
    quantity: 1
}

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            formValidationInit: false,
            fields: Object.assign({}, initialState)
        };
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
        this.state.formValidationInit && this.handleValidation();
    }

    insertProductType = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertProductType(this.state.fields);
            this.setState({ fields: { category_type: '', product_type: '' }, });
        } else {
            this.setState({ formValidationInit: true });
        }
    }

    componentDidMount() {
        this.props.getSingleProduct({ _id: this.props.match.params.productId });
        this.props.getColorList();
    }

    displayColorName(color_code) {
        const color = this.props.colorList.list.filter(cl => cl.color_code === color_code)[0] || {};
        return color.color_name;
    }

    handleRating(event) {
        console.log('===>', event);
    }

    render() {
        const product = this.props.singleProduct || {};
        if (!product.product_name) return <span>Wait...</span>;
        return (
            <div className="col-md-12">
                <div className="row" id="productMain">
                    <div className="col-sm-6">
                        <div id="mainImage">
                            <img src={`../product-images/main/${product.sku}-0.jpeg`} alt="" className="img-responsive" />
                        </div>

                        {product.sale_or_new === 's' && <div className="ribbon sale">
                            <div className="theribbon">SALE</div>
                            <div className="ribbon-background"></div>
                        </div>}

                        {product.sale_or_new === 'n' && <div className="ribbon new">
                            <div className="theribbon">NEW</div>
                            <div className="ribbon-background"></div>
                        </div>}

                    </div>
                    <div className="col-sm-6">
                        <div className="box">
                            <h1 className="text-center remove-padding">{product.product_name}</h1>
                            <Rating onChange={(event) => this.handleRating(event)} fractions={2} emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={3.5} />
                            {product.product_discount > 0 && <p className="price original-price">Original MRP:- <span>Rs. {product.product_price + product.product_discount}.00</span></p>}
                            <p className="price">Price:- <span>Rs. {product.product_price}.00</span></p>
                            {product.product_discount > 0 && <p className="price money-saving">Saving:- <span>Rs. {product.product_discount}.00</span></p>}

                            <div className='form-group col-md-4 remove-padding'>
                                <select className='form-control'>
                                    <option value=''>Select Size</option>
                                    {(product.product_size || []).map(item => {
                                        return <option value={item.value} key={item.value}>{(item.value || '').toUpperCase()}</option>
                                    })}
                                </select>
                            </div>

                            <div className='form-group col-md-4'>
                                <select className='form-control'>
                                    <option value=''>Select Color</option>
                                    {(product.product_color || []).map(item => {
                                        return <option value={item.value} key={item.value}>{(this.displayColorName(item.value) || '').toUpperCase()}</option>
                                    })}
                                </select>
                            </div>

                            <div className='col-md-4'>
                                <div className="form-group">
                                    {/* <label htmlFor="quantity">Quantity</label> */}
                                    {/* <input type="number" onChange={(event) => this.handleChange(event, 'quantity')} value={this.state.fields['quantity']} id="quantity" name="quantity" className="form-control" /> */}

                                    <div className="input-group">
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-danger btn-number">
                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                        </span>
                                        <input onChange={(event) => this.handleChange(event, 'quantity')} value={this.state.fields['quantity']} type="text" id="quantity" name="quantity" className="form-control input-number" value="10" min="1" max="100" />
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-success btn-number">
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </span>
                                    </div>

                                    <span style={{ color: "red" }}>{this.state.errors['quantity']}</span>
                                </div>
                            </div>

                            <div className="clear"></div>

                            <p className="text-center buttons">
                                <a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart"></i> Add to cart</a>
                                <a href="basket.html" className="btn btn-default"><i className="fa fa-heart"></i> Add to wishlist</a>
                            </p>
                        </div>

                        <div className="row" id="thumbs">
                            <div className="col-xs-3">
                                <a href="img/detailbig1.jpg" className="thumb">
                                    <img src={`../product-images/thumbs/${product.sku}-0.jpeg`} alt="" className="img-responsive" />
                                </a>
                            </div>
                            <div className="col-xs-3">
                                <a href="img/detailbig2.jpg" className="thumb">
                                    <img src={`../product-images/main/${product.sku}-1.jpeg`} alt="" className="img-responsive" />
                                </a>
                            </div>
                            <div className="col-xs-3">
                                <a href="img/detailbig3.jpg" className="thumb">
                                    <img src={`../product-images/main/${product.sku}-2.jpeg`} alt="" className="img-responsive" />
                                </a>
                            </div>
                            <div className="col-xs-3">
                                <a href="img/detailbig3.jpg" className="thumb">
                                    <img src={`../product-images/main/${product.sku}-3.jpeg`} alt="" className="img-responsive" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="clear"></div>

                    <RatingAndReviewComponent {...this.props} />

                    <div className="clear"></div>

                <YouMayAlsoLike />
                <RecentlyViewed />

            </div>
        );
    };
}

ProductComponent.propTypes = {
    getSingleProduct: PropTypes.func.isRequired,
    sizeList: PropTypes.object,
    colorList: PropTypes.object,
    singleProduct: PropTypes.object
};

const mapStateToProps = state => {
    return {
        sizeList: state.sizeList,
        colorList: state.colorList,
        singleProduct: state.singleProduct
    };
}

export default connect(mapStateToProps, {
    getSizeList, getColorList, getSingleProduct
})(ProductComponent);