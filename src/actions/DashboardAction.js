import {
    DB_ADD_PRODUCT, DB_ADD_CATEGORY, DB_ADD_COLOR, DB_ADD_SIZE, DB_ADD_COUNTRY, DB_ADD_STATE, DB_ADD_CITY,
    GET_CATEGORY_LIST, GET_CITY_LIST, GET_STATE_LIST, GET_COUNTRY_LIST, GET_SIZE_LIST, GET_COLOR_LIST,
    GET_PRODUCT_TYPE_LIST, DB_ADD_BRAND, DB_ADD_PRODUCT_TYPE, GET_BRAND_LIST, GET_PRODUCT_TYPE_LIST_WITH_PARAMS,
    GET_PRODUCT_LIST, LAST_DETELED_DOCUMENT
} from '../constants/ActionCommands';
/***************************************************************************
 * API_BASE_URL => http://localhost:8081/api/db-admin
 * ***************************************************************************/
const API_BASE_URL = 'http://localhost:8081/api/db-admin';
const serialize = function (obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

/***************************************************************************
 * POST ACTIONS
 * ***************************************************************************/
export const insertCategory = category => {
    return dispatch => {
        fetch(`${API_BASE_URL}/category/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(category)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_CATEGORY, payload: response }))
    }
}

export const insertColor = color => {
    return dispatch => {
        fetch(`${API_BASE_URL}/color/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(color)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_COLOR, payload: response }))
    }
}

export const insertSize = size => {
    return dispatch => {
        fetch(`${API_BASE_URL}/size/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(size)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_SIZE, payload: response }))
    }
}

export const insertCountry = country => {
    return dispatch => {
        fetch(`${API_BASE_URL}/country/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(country)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_COUNTRY, payload: response }))
    }
}

export const insertState = state => {
    return dispatch => {
        fetch(`${API_BASE_URL}/state/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(state)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_STATE, payload: response }))
    }
}

export const insertCity = city => {
    return dispatch => {
        fetch(`${API_BASE_URL}/city/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(city)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_CITY, payload: response }))
    }
}

export const insertProduct = product => {
    console.log('Add product:', product)
    product.product_color = JSON.stringify(product.product_color);
    product.product_size = JSON.stringify(product.product_size);
    product.product_brand = JSON.stringify(product.product_brand);
    const formData = new FormData();
    product.created_by = JSON.parse(localStorage.getItem('AUTH_DETAILS') || '{}').email;
    for (let field in product) {
        if (field === 'thumb_images') {
            product.thumb_images.forEach((element, index) => formData.append(`thumb_image_${index}`, element));
        } else if (field === 'product_images') {
            product.product_images.forEach((element, index) => formData.append(`product_image_${index}`, element));
        } else {
            formData.append(field, product[field]);
        }
    }
    return dispatch => {
        fetch(`${API_BASE_URL}/product/create`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: formData
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_PRODUCT, payload: response }))
    }
}

export const insertBrand = brand => {
    return dispatch => {
        fetch(`${API_BASE_URL}/brand/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(brand)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_BRAND, payload: response }))
    }
}

export const insertProductType = productType => {
    return dispatch => {
        fetch(`${API_BASE_URL}/product-type/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(productType)
        }).then(response => response.json()).then(response => dispatch({ type: DB_ADD_PRODUCT_TYPE, payload: response }))
    }
}

/***************************************************************************
 * DELETE ACTIONS
 * ***************************************************************************/
export const deleteDocument = (options, callback) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/${(options.api || '').toLowerCase()}/delete`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify({_id: options._id, model: options.api})
        }).then(response => response.json()).then(response => {
            callback && callback(response);
            dispatch({ type: LAST_DETELED_DOCUMENT, payload: {response, options} })
        });
    }
}

/***************************************************************************
 * GET ACTIONS
 * ***************************************************************************/
export const getCategoryList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/category/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_CATEGORY_LIST, payload: response }))
    }
}

export const getSizeList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/size/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_SIZE_LIST, payload: response }))
    }
}

export const getColorList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/color/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_COLOR_LIST, payload: response }))
    }
}

export const getCountryList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/country/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_COUNTRY_LIST, payload: response }))
    }
}

export const getProductTypeList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/product-type/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_PRODUCT_TYPE_LIST, payload: response }));
    }
}

export const getProductTypeListWithParams = (object = {}, callback) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/product-type/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => {
            callback && callback(response);
            return dispatch({ type: GET_PRODUCT_TYPE_LIST_WITH_PARAMS, payload: response });
        })
    }
}

export const getStateList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/state/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_STATE_LIST, payload: response }))
    }
}

export const getCityList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/city/list`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_CITY_LIST, payload: response }))
    }
}

export const getBrandList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/brand/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_BRAND_LIST, payload: response }))
    }
}

export const getProductList = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/product/list?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({ type: GET_PRODUCT_LIST, payload: response }))
    }
}