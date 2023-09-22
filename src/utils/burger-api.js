
const url = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${url}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => checkReponse(res))
  };


export const getOrderDetails = (idArray) => {
  return fetch(`${url}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "ingredients": idArray
    })
  })
  .then(res => checkReponse(res))
};


export const loginUser = (email, password) => {
  return fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password
   })
  })
  .then(res => checkReponse(res))
  .catch(res => alert('Неправильные данные. Проверьте или зарегистрируйтесь'))
}


export const refreshToken = () => {
  return fetch(`${url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};


// Использовать эту функцию для всех запросов, где нужно посылать токен, вместо фетча
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

