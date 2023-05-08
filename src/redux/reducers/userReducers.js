import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";


export const UserRegisterLoginReducer = (state = {}, action) =>{
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        case LOGOUT_USER: 
            return {}
        default:
            return state;
   }
}