import Swal from "sweetalert2";
import { serviceAPI } from "../../utils/Axios";
import { types } from "../types/Types";
import { eventLogoutEvent } from "./Events";

export const startLogin = (email, password) => {
  return async (dispatch) => {

    const data = { email, password };
    const response = await serviceAPI('POST', 'auth', data);
    const body = response.data;

    // console.log(response);

    if(body.ok) {

      localStorage.setItem('token', body.token);
      localStorage.setItem('tokenInitTime', new Date().getTime().toString() );
    
      const { uid, name, email, lastName, username } = body;

      dispatch( login({ uid, name, email, lastName, username }) );

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${body.msg}`
      });

    }
  }
}


const login = (user) => ({
  type: types.authLogin,
  payload: user,
});



export const startRegister = (name, lastName, username, email, password) => {
  return async(dispatch) => {
    
    const data = { name, lastName, username, email, password };
    const response = await serviceAPI('POST', 'auth/new', data)
    const body = response.data;

    if(body.ok) {

      localStorage.setItem('token', body.token);
      localStorage.setItem('tokenInitTime', new Date().getTime().toString() );
    
      const { uid, name, email, lastName, username } = body;

      dispatch( register({ uid, name, email, lastName, username  }) );

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${body.msg}`
      });

    }
  }
}


const register = (user) => ({
  type: types.authStartRegister,
  payload: user
})


export const startChecking = () => {
  return async(dispatch) => {
    const response = await serviceAPI('GET', 'auth/renew');
    const body = response.data;

    if(body.ok){

      localStorage.setItem('token', body.token);
      localStorage.setItem('tokenInitTime', new Date().getTime().toString() );
    
      const { uid, name, email, lastName, username } = body;
      dispatch( login({ uid, name, email, lastName, username }) );
    
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${body.msg}`
      });

      dispatch( checkingFinish() );

    }

  }
}


const checkingFinish = () => ({ 
  type: types.authCheckingFinish 
});


export const startLogout = () => {
  return async(dispatch) => {

    localStorage.clear();
    dispatch( eventLogoutEvent() );
    dispatch( logout() );
  }
}


const logout = () => ({
  type: types.authLogout
})