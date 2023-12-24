class Api {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers; 
  }

  _request(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      throw new Error(`Ошибка: ${res.status}`)
      })
  }
    
  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  patchUserInfo({name, about}) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  postNewCard({name, link}) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  likeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  unlikeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      }
    })
  }

  patchUserAvatar({link}) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers : {
        'Content-Type': "application/json",
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        avatar: link
      })
    })
  }
  } 

const optionsApi = {
  //url: 'http://localhost:3000'
  //url: 'https://mesto.lyudmila.nomoredomainsmonster.ru/api',
  url: process.env.REACT_APP_API_URL,
} 

const api = new Api(optionsApi)

export default api;