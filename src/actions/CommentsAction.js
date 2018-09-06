import { FETCH_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from '../constants/ActionCommands'

const API_BASE_URL = 'http://localhost:8081/api/comments'
export const fetchComments = () => {
    return dispatch => {
        fetch(API_BASE_URL)
        .then(response => {
          
          return response.json();
        })
        .then(response => {
            return dispatch({type: FETCH_COMMENTS, payload: response.data})
        })
    }
}

export const addCommentToDB = comment => {
    return dispatch => {
        fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(comment)
        })
        .then(response => response.json())
        .then(response => {
            return dispatch({type: ADD_COMMENT, payload: response.comment})
        })
    }
}

export const deleteComment = commentId => {
    return dispatch => {
        fetch(`${API_BASE_URL}/delete/${commentId}`, {
            method: 'DELETE'
        }).then(response => response.json()).then(response => {
            return dispatch({type: DELETE_COMMENT, payload: response.comment})
        })
    }
}
