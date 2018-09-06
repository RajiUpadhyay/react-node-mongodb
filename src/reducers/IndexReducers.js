import {
    ADD_COMMENT, FETCH_COMMENTS, DELETE_COMMENT, GET_USER, CREATE_USER, USER_SIGNIN, GET_CURRENT_USER,
    UPDATE_USER, DELETE_USER, CHANGE_PASSWORD, CREATE_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS, DB_ADD_PRODUCT,
    DB_ADD_CATEGORY, DB_ADD_SIZE, DB_ADD_COLOR, DB_ADD_COUNTRY, DB_ADD_CITY, DB_ADD_STATE, GET_CATEGORY_LIST,
    GET_SIZE_LIST, GET_COLOR_LIST, GET_COUNTRY_LIST, GET_STATE_LIST, GET_CITY_LIST, GET_PRODUCT_TYPE_LIST,
    DB_ADD_BRAND, DB_ADD_PRODUCT_TYPE, GET_PRODUCT_TYPE_LIST_WITH_PARAMS, GET_BRAND_LIST, GET_PRODUCT_LIST,
    LAST_DETELED_DOCUMENT, GET_SINGLE_PRODUCT, CATEGORY_FILTER_QUERY, GET_PRODUCT_COUNT, CHANGE_PRODUCT_DISPLAY_COUNT,
    GET_CATEGORY_PRODUCT_LIST, SORT_BY_CATEGORY_PRODUCTS
} from '../constants/ActionCommands';

import { stat } from 'fs';

export default (state = {}, action) => {
    switch (action.type) {
        /***************************************************************************
         * POST AND PUT REDUCERS
         * ***************************************************************************/
        case FETCH_COMMENTS: return { ...state, comments: action.payload };
        case ADD_COMMENT: return { ...state, comment: action.payload, comments: state.comments.concat(action.payload) };
        case DELETE_COMMENT: return { ...state, comments: state.comments.filter(item => (item._id !== action.payload._id)) };
        case CREATE_USER: return { ...state, lastUserCreated: action.payload };
        case CREATE_ADDRESS: return { ...state, lastAddressCreated: action.payload };
        case CHANGE_PASSWORD: return { ...state, passwordChanged: action.payload };
        case USER_SIGNIN: return { ...state, loginCredentials: action.payload };
        case GET_CURRENT_USER: return { ...state, activeUser: action.payload };
        case DB_ADD_CATEGORY: return { ...state, lastAddedCategory: action.payload };
        case DB_ADD_COLOR: return { ...state, lastAddedColor: action.payload };
        case DB_ADD_SIZE: return { ...state, lastAddedSize: action.payload };
        case DB_ADD_COUNTRY: return { ...state, lastAddedCountry: action.payload };
        case DB_ADD_STATE: return { ...state, lastAddedState: action.payload };
        case DB_ADD_CITY: return { ...state, lastAddedCity: action.payload };
        case DB_ADD_PRODUCT: return { ...state, lastAddedProduct: action.payload };
        case DB_ADD_BRAND: return { ...state, lastAddedBrand: action.payload };
        case DB_ADD_PRODUCT_TYPE: return { ...state, lastAddedProductType: action.payload };

        /***************************************************************************
         * GET REDUCERS
         * ***************************************************************************/
        case GET_CATEGORY_LIST: return { ...state, categoryList: action.payload };
        case GET_COLOR_LIST: return { ...state, colorList: action.payload };
        case GET_SIZE_LIST: return { ...state, sizeList: action.payload };
        case GET_COUNTRY_LIST: return { ...state, countryList: action.payload };
        case GET_STATE_LIST: return { ...state, stateList: action.payload };
        case GET_CITY_LIST: return { ...state, cityList: action.payload };
        case GET_BRAND_LIST: return { ...state, brandList: action.payload };
        case GET_PRODUCT_TYPE_LIST: return { ...state, productTypeList: action.payload };
        case GET_PRODUCT_LIST: return { ...state, productList: action.payload };
        case GET_PRODUCT_TYPE_LIST_WITH_PARAMS: return { ...state, productTypeListWithParams: action.payload };

        /***************************************************************************
         * PRODUCT PAGE REDUCERS
         * ***************************************************************************/
        case GET_SINGLE_PRODUCT: return { ...state, singleProduct: action.payload };

        /***************************************************************************
         * CATEGORY REDUCERS
         * ***************************************************************************/
        case CATEGORY_FILTER_QUERY: return { ...state, categoryFilterQuery: action.payload };
        case GET_PRODUCT_COUNT: return { ...state, productCount: action.payload };
        case CHANGE_PRODUCT_DISPLAY_COUNT: return { ...state, productPerPage: action.payload };
        case GET_CATEGORY_PRODUCT_LIST: return { ...state, categoryProductList: action.payload };
        case SORT_BY_CATEGORY_PRODUCTS: return { ...state, categoryProductList: action.payload };

        /***************************************************************************
         * DELETE REDUCERS
         * ***************************************************************************/
        case LAST_DETELED_DOCUMENT:
        console.log(action.payload.options)
            return {
                ...state,
                lastDeletedDocument: action.payload.response,
                [action.payload.options.stateName]: {
                    list: state[action.payload.options.stateName].list.filter(el => el._id !== action.payload.options._id)
                }
            };

        default: return state;
    }
};