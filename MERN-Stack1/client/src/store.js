import {
    createStore, // 
    applyMiddleware, // we are using thunk so we need to wrap it 
}
    from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}; // variable representing our initial state which
// in our case is an empty object

const middleware = [thunk] // variable for middleware for any middle ware we will use

const composedEnhancer = composeWithDevTools( 
    applyMiddleware(...middleware) // Because of redux tools we pass the middleware in the compose fxn
    //destructuring^^
    // below to use redux dev tools in browser
)

// variable store and set it to createStore brought in above
// takes in 3 arguments 
// rootReducer, initialState, Any middleware 
const store = createStore(rootReducer, initialState, composedEnhancer)

export default store