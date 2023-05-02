import * as actionTypes from "../constants/cartConstants";

export const counterReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case 'ADD':
            return { value: state.value + 1 + action.someValue }
        default:
            return state
    }
}