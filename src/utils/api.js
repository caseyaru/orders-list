import { AUTH, BASE_URL } from "./constants";
import { generateHash } from "./hash";

const hashedAuth = generateHash(AUTH);
//console.log(hashedAuth); //проверка захешированности

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
        params: { offset: start, limit: lim },
      }),
    }).then(this._response)
  }

  getItems(state) {
    return fetch(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        action: "get_items",
        params: { ids: state },
      }),
    }).then(this._response);
  }

  getFields(value) {
    return fetch(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        action: "get_fields",
        params: { "field": `${value}` },
      }),
    }).then(this._response)
  }

  getFilteredItems(field, value) {
  const params = {};
  params[field] = field === "price" ? Number(value) : value;
    return fetch(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        action: "filter",
        params: params
      }),
    }).then(this._response)
  }
}

export const MainApi = new Api({
  url: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Auth": hashedAuth,
  },
});
