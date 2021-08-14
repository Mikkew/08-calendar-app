import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const serviceAPI = ( method, endpoint, data = {}) => {

  const headers = {"Content-Type":"application/json; charset=utf-8"};
  const url = `${baseURL}/${endpoint}`;
  const token = localStorage.getItem('token');
  
  headers.token = ( !!token ) ? token : '';

  try {

    switch (method) {
      case "POST":
        return axios.post(url, data, {headers});
  
      case "PUT":
        return axios.put(url, data, {headers});
  
      case "DELETE":
        return axios.delete(url, {headers});
    
      default:
        return axios.get(url, {headers});
    }
    
  } catch (error) {
    console.log(error)
  }


}
