import { types } from "../types/Types";

const initialState = {
  checking: false,
}


export const authReducer = ( state = initialState, action) => {
  switch (action.type) {

    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload,
      }

    case types.authStartRegister:
      return {
        ...state,
        checking: false,
        ...action.payload
      }

    case types.authCheckingFinish: 
      return{
        ...state,
        checking: false
      }

    case types.authLogout:
      return initialState;
  
    default:
      return state;
  }
}
