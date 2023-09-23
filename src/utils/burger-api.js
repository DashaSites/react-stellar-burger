
const API_URL = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${API_URL}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => checkReponse(res))
};


export const getOrderDetails = (idArray) => {
  return fetch(`${API_URL}/orders`, {
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


//////////

// Запрос для авторизации пользователя
// Это неавторизованный запрос (без передачи на сервер токена)
export const loginUser = (email, password) => {
  return fetch(`${API_URL}/auth/login`, {
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
  //.catch(err => alert('Неправильные данные. Проверьте или зарегистрируйтесь'))
};


// Запрос для регистрации
// Это неавторизованный запрос (без передачи на сервер токена)
export const registerUser = (name, email, password) => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name 
    })
  })
  .then(res => checkReponse(res))
  // НИЖЕ - НОЧНОЙ ЭКСПЕРИМЕНТ
  .then(res => {
    return {
      "success": true,
      "user": {
          "email": res.email,
          "name": res.name
      },
      "accessToken": `Bearer ${res.accessToken}`,
      "refreshToken": res.refreshToken
    }
  })
  .catch(err => console.log(err))
}


// Запрос на получение данных пользователя
// Он авторизованный (с передачей на сервер токена)
export const getUser = () => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') // КАК-ТО ТАК
    }
  });
};

// getUser()
//   .then(() => {})
//   .catch(() => ());


export const refreshToken = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};


// Универсальная функция, внутри которой автоматически срабатывает обновление токена,
// если он протух
// Вызывать ее вместо fetch в других запросах, где есть токен авторизации
// Это универсальная функция: как для запроса данных user, так и для 
// других запросов, которые требуют авторизации
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

