import { 
    GET_USER, CREATE_USER, USER_SIGNIN, UPDATE_USER, DELETE_USER, CHANGE_PASSWORD, 
    CREATE_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS, GET_CURRENT_USER
} from '../constants/ActionCommands';

const API_BASE_URL = 'http://localhost:8081/api/users'
export const currentUser = (email, callback) => {
    return dispatch => {
        fetch(`${API_BASE_URL}/current-user?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => {
            if(!response.status) {
                localStorage.clear();
            }
            return dispatch({type: GET_CURRENT_USER, payload: response})
        });
    }
}

export const createUser = user => {
    return dispatch => {
        fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(user)
        }).then(response => response.json()).then(response => dispatch({type: CREATE_USER, payload: response}))
    }
}

export const createAddress = address => {
    return dispatch => {
        fetch(`${API_BASE_URL}/address/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(address)
        }).then(response => response.json()).then(response => dispatch({type: CREATE_ADDRESS, payload: response}));
    }
}

export const deleteUser = userName => {
    return dispatch => {
        fetch(`${API_BASE_URL}/delete/${userName}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
        }).then(response => response.json()).then(response => dispatch({type: DELETE_USER, payload: response}));
    }
}

export const login = user => {
    return dispatch => {
        fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(user)
        }).then(response => response.json()).then(response => {
            console.log('USER_SIGNIN==>', response);
            if(response.token) {
                localStorage.setItem('AUTH_DETAILS', JSON.stringify(response.user));
                localStorage.setItem('ACCESS_TOKEN', response.token);
            }
            return dispatch({type: USER_SIGNIN, payload: response});
        });
    }
}

export const changePassword = user => {
    return dispatch => {
        fetch(`${API_BASE_URL}/change-password`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` },
            body: JSON.stringify(user)
        }).then(response => response.json()).then(response => dispatch({type: CHANGE_PASSWORD, payload: response}));
    }
}
