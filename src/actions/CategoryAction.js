import {
    CATEGORY_FILTER_QUERY, GET_PRODUCT_COUNT, CHANGE_PRODUCT_DISPLAY_COUNT, GET_CATEGORY_PRODUCT_LIST,
    SORT_BY_CATEGORY_PRODUCTS
} from '../constants/ActionCommands';

import store from '../store/IndexStore';

const API_BASE_URL = 'http://localhost:8081/api/category';
const serialize = function (obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

/***************************************************************************
 * SERVICE METHODS
 * ***************************************************************************/
export const addQueryStringToUrl = (filter = {}, options = {}) => {
    return dispatch => {
        const oldState = store.getState().categoryFilterQuery;
        for (const prop in filter) {
            const isArray = (oldState[prop] || '').join;
            if (options.clear) {
                oldState[prop] = isArray ? [] : '';
            } else if (options.add) {
                if (isArray) {
                    oldState[prop].push(filter[prop]);
                } else {
                    oldState[prop] = filter[prop];
                }
            } else {
                if (isArray) {
                    oldState[prop].splice(oldState[prop].indexOf(filter[prop]), 1);
                } else {
                    oldState[prop] = '';
                }
            }

        }
        return dispatch({ type: CATEGORY_FILTER_QUERY, payload: Object.assign({}, oldState) })
    }
}

export const changeProductDisplayCount = (limit = 3) => {
    return dispatch => {
        return dispatch({ type: CHANGE_PRODUCT_DISPLAY_COUNT, payload: limit })
    }
}

export const sortCategoryProducts = ({sortBy = ''}) => {
    return dispatch => {
        const oldState = store.getState().categoryProductList;
        oldState.list

        oldState.list.sort((lhs, rhs) => {
            return lhs[sortBy] > rhs[sortBy];
        });
        return dispatch({ type: SORT_BY_CATEGORY_PRODUCTS, payload: Object.assign({}, oldState) })
    }
}


/***************************************************************************
 * POST ACTIONS
 * ***************************************************************************/


/***************************************************************************
 * GET ACTIONS
 * ***************************************************************************/
export const getProductCount = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/count?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => {
            dispatch({ type: GET_PRODUCT_COUNT, payload: response })
        })
    }
}

export const getCategoryProductList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/product/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => {
            dispatch({ type: GET_CATEGORY_PRODUCT_LIST, payload: response })
        })
    }
}
