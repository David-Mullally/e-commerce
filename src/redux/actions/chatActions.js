import * as actionTypes from "../constants/chatConstants";

export const setChatRooms = (user, message) => async (dispatch) => {
    dispatch({
        type: actionTypes.SET_CHATROOMS,
        payload: {
            user: user,
            message: message,
        }
    })
}


export const setSocket = (socket) => async (dispatch) => {
    dispatch({
        type: actionTypes.SET_SOCKET,
        payload: {
            socket: socket,
        }
    })
}

export const setMessageRecieved = (value) => async (dispatch) => {
    dispatch({
        type: actionTypes.MESSAGE_RECIEVED,
        payload: {
            value: value,
        }
    })
}