// this is where we will make our request to the backend
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// dispatch is possible with thunk which lets us make an async request
export const getItems = () => dispatch => {
    // to call the actions we do that by using dispatch()
    dispatch(setItemsLoading()); // <-------- to call setItemsLoading action
    axios // <------- to make our request
        .get('/paths') // <--- making a get request to backend @ /paths
        // ^ the request above returns a promise so we continue below with the argument response(res)
        .then(res => // return dispatch()
            dispatch({
                type: GET_ITEMS, // were we send our type = GET_ITEMS
                payload: res.data // send the payload = res.data ; the data from the Backend from the path in "get('')"
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}



export const addItem = (item) => (dispatch, getState) => { // details of dispatch in get above
    axios
        .post('/paths', item, tokenConfig(getState)) // we want to pass some data; this data will be from the modal which is the argument item
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data // <----- what is res.data; the new item that will be sent to the reducer
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


// Getting the action delete to work in ShoppingList.js
// takes id because it needs to know what item to delete
export const deleteItem = (id) => (dispatch, getState) => {

    axios
        .delete(`/paths/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
    
}




// setting another fxn setItemsLoading to dispatch that ITEMS_LOADING

export const setItemsLoading = () => {
    // It returns the type of ITEMS_LOADING
    return {
        type: ITEMS_LOADING
    }
}