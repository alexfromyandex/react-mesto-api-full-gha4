import checkResponse from "./CheckResponse";
//export const BASE_URL = 'http://localhost:3000'
//export const BASE_URL = 'https://mesto.lyudmila.nomoredomainsmonster.ru/api';
export const BASE_URL = process.env.REACT_APP_API_URL;

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => console.log(err))
}; 

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    }
  })
  .then(checkResponse)
  .then(data => data)
  .catch(err => console.log(err))
} 