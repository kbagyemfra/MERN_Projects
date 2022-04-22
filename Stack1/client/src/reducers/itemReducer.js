// Where the state will go and check our actions 

// Bringing the types into the ItemReducer
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [], // we want the array to be empty now for connecting the backend
    loading: false // adding to the state a loading value that will false by default
                // Why? = When we fetch data it could take some milisecs to get but once we make the request we want it set to true and when we get the data back we want it set to false

}

// state = initialState from above, action will have a type
export default function (state = initialState, action) {
    // create a switch 
    switch (action.type) {
        // when the action comes in we want to run a test on the type
        // b/c its an object we can attain it by action.type

        // check for Get Items and return the state which is an object
        case GET_ITEMS:
            return {
                ...state, // in addition now to getting the state we want to
                // also get the items from the action.payload
                items: action.payload,
                // make sure to set loadings back to false
                loading: false
            }


        case ADD_ITEM:
            return {
                ...state, 
                // action.payload = the new item coming in
                    // ...state.items = adding
                items: [action.payload, ...state.items]
            }


        // case to Check for deleteItem
        // needs to know the ID, so we add payload to the itemAction
        case DELETE_ITEM:
            return { // we want to return exactly what we returned in the compinent for delete 
                // so we return the state 
                ...state,
                items: state.items.filter(item => item._id !== action.payload) // instead of !== _id we need to change it to action.payload 
            } 
        

        
        case ITEMS_LOADING: // This case will return the loading from false to true
            return {
                
                ...state, // intital state
                loading: true
            }

        default:
            return state; // returns the initialState w/ eggs milk....
    }
}