// This is the root Reducer file
// Main point of the file is to bring together all the other reducers

import { combineReducers } from "redux"; 
import itemReducer from './itemReducer' 
import errorReducer from './errorReducer' // we will make it soon
import authReducer from './authReducer' // we will make it soon



export default combineReducers({
    // object with different reducers

    // how we ID from within components 
    item: itemReducer,
    er: errorReducer,
    auth: authReducer 
})