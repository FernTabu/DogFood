const freshHeaders = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
};

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
  freshHeaders: freshHeaders,
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject("Error");
};

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._freshHeaders = data.freshHeaders;
  }
  getProductList(page = 1) {
    return fetch(`${this._baseUrl}/products?page=${page}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }
  getProductById(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }
  addProduct(data) { 
    return fetch(`${this._baseUrl}/products`, {
      ...this._freshHeaders(),
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }
  updateUserInfo(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(body),
    }).then((res) => onResponse(res));
  }
  getUsers() {
    return fetch(`${this._baseUrl}/users`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/v2/group-10/users/me/avatar`, {
      ...this._freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(avatar),
    }).then((res) => onResponse(res));
  }
  searchProducts(query) {
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }
  // like - true / false
  changeLikeProductStatus(productId, like) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      ...this._freshHeaders(),
      method: like ? "PUT" : "DELETE",
    }).then((res) => onResponse(res));
  }
  deleteLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      ...this._freshHeaders(),
      method: "DELETE",
    }).then((res) => onResponse(res));
  }
  addLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      ...this._freshHeaders(),
      method: "PUT",
    }).then((res) => onResponse(res));
  }
  addReview(productId, body) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      ...this._freshHeaders(),
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => onResponse(res));
  }
  // https://api.react-learning.ru/products/review/:productId/:reviewId
  deleteReview(productId, reviewId) {
    return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
      ...this._freshHeaders(),
      method: "DELETE",
    }).then((res) => onResponse(res));
  }
}

export const api = new Api(config);

// api.getProductList();

export const getProductList = () => {
  return fetch(`${config.baseUrl}/products`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

export const searchProducts = (query) => {
  return fetch(`${config.baseUrl}/products/search?query=${query}`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

// export const funct = () => {
//  return fetch().then(onResponse)
// }

export const getProductById = (id) => {
  return fetch(`${config.baseUrl}/products/${id}`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};
