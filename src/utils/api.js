import { AUTH, BASE_URL } from "./constants";
import { generateHash } from "./hash";

const hashedAuth = generateHash(AUTH); // итог на 22.02: 15fd1b722761a45265adeb7ae99335fe
console.log(hashedAuth);

export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  //передаем смещение с начала списка и лимит (сколько делаем)
  getIds(start, lim) {
    return fetch(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        action: "get_ids",
        params: { offset: start, limit: lim }, //смещение с начала списка 0, лимит 50
      }),
    })
    .then(this._response)
    .catch(() => console.log('не так айди вбила'))
  }

  //получаем айдишки и по ним будем смотреть инфу о товарах
  getItems(state) {
    return fetch(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        action: "get_items",
        params: { ids: state },
      }),
    }).then(this._response)
  }
}

export const MainApi = new Api({
  url: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth': hashedAuth
  },
});