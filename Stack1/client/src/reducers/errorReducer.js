import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

// create initial state

const initialState = {
    msg: {}, // json object that comes from server
    status: null, // same as msg
    id: null
}

export default function (state = initialState, action) {
    switch (action.type) { // evaluating the action type

        case GET_ERRORS:
            return {
                msg: action.payload.msg, // comes from action payload has a message attached from server
                status: action.payload.status,
                id: action.payload.id

            }


        case CLEAR_ERRORS:
            // basically want to set everything back to default 
            return {
                msg: {},
                status: null,
                id: null
            }

        default:
            return state;

    }
}