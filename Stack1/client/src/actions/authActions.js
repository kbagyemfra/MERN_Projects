import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from "./types"

// Check token & load user
// we use getState to get the token from the state
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING }) // calling the USER_LOADING case


    axios.get('/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Register User
export const register = ({ name, email, password }) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body 
    const body = JSON.stringify({ name, email, password })

    axios.post('/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login User
export const login = ({ email, password }) => dispatch => {
    // Headers 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body 
    const body = JSON.stringify({ email, password })

    axios
        .post('/auth', body, config)
        .then(res => dispatch({ // if everthing good call LOGIN_SUCCESS
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        // if everyhing is not good call LOGIN_FAIL
        ).catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
            )
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


// We use this for any request to send the token along
export const tokenConfig = getState => {

    // Get token from local storage
    const token = getState().auth.token // <---- this will look into the token in initialState in the authReducer.js file

    // to set Headers in axios we set an object and then add a headers object inside
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token then add to headers
    if (token) {
        config.headers['x-auth-token'] = token // token in local storage
    }

    return config;
}