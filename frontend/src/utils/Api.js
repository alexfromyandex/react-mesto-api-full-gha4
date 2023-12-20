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
      headers: this._headers,
    })
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    })
  }

  patchUserInfo({name, about}) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  postNewCard({name, link}) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  likeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
  }

  unlikeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  patchUserAvatar({link}) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }
  }

const jwt = localStorage.getItem('token'); 
console.log(jwt);

const optionsApi = {
  url: 'http://localhost:3000',
  headers : {
    //authorization: ,
    'Content-Type': "application/json",
    'Authorization': jwt,
  }
}

const api = new Api(optionsApi)

export default api;