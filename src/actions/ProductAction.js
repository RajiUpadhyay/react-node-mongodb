import {
    GET_SINGLE_PRODUCT
} from '../constants/ActionCommands';

const API_BASE_URL = 'http://localhost:8081/api/product';
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


/***************************************************************************
 * GET ACTIONS
 * ***************************************************************************/
export const getSingleProduct = (object = {}) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/single?${serialize(object)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => {
            console.log('tesponse', response)
            dispatch({ type: GET_SINGLE_PRODUCT, payload: response })
        })
    }
}
