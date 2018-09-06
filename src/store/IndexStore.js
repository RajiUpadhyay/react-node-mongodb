import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from '../reducers/IndexReducers';

const initialState = {
    comments: [],
    comment: {},
    activeUser: {},
    /***************************************************************************
     * POST & PUT
     * ***************************************************************************/
    lastUserCreated: {},
    loginCredentials: {},
    passwordChanged: {},
    lastAddressCreated: {},
    lastAddedCategory: {},
    lastAddedColor: {},
    lastAddedBrand: {},
    lastAddedSize: {},
    lastAddedCountry: {},
    lastAddedState: {},
    lastAddedCity: {},
    lastAddedProduct: {},
    lastAddedProductType: {},

    /***************************************************************************
     * GET
     * ***************************************************************************/
    categoryList: {list: []},
    colorList: {list: []},
    sizeList: {list: []},
    countryList: {list: []},
    stateList: {list: []},
    cityList: {list: []},
    brandList: {list: []},
    productList: {list: []},
    productTypeList: {list: []},
    productTypeListWithParams: {list: []},

    /***************************************************************************
     * CATEGORY
     * ***************************************************************************/
    categoryFilterQuery: {
        category_type: '',
        product_type: '',
        product_brand: [],
        product_color: []
    },
    productCount: {},
    productPerPage: 3,
    categoryProductList: {list: []},

    /***************************************************************************
     * PRODUCT
     * ***************************************************************************/
    singleProduct: {},

    /***************************************************************************
     * DELETE
     * ***************************************************************************/
    lastDeletedDocument: {}
};

const store = createStore(rootReducers, initialState, applyMiddleware(thunkMiddleware));

export default store;