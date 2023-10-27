
const API_URL = 'https://norma.nomoreparties.space/api';
const API_URL_SOCKET = "wss://norma.nomoreparties.space/orders";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// Универсальная функция запроса с проверкой ответа
// (чтобы не дублировать эту проверку в каждом запросе)
function request(url, options) {
  // принимает два аргумента: урл и объект опций, каки `fetch`
  return fetch(url, options).then(checkResponse)
}



export const getIngredients = () => {
  return request(`${API_URL}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
};


export const getOrderDetails = (idArray) => {
  return request(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "ingredients": idArray
    })
  })
};


// Запрос для получения заказов всех покупателей 
export const getAllOrders = () => {
  return request(`${API_URL_SOCKET}/all`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
};


// Запрос для получения истории заказов пользователя:
// Добавить токен при подключении к URL в query-параметр: ?token=${accessToken}
export const getUserOrders = () => {
  const accessToken = localStorage.getItem("accessToken");

  return request(`${API_URL_SOCKET}?token=${accessToken}`, { 
      headers: {
        "Content-Type": "application/json"
      }
    })
};

///// ЗАПРОСЫ, СВЯЗАННЫЕ С РОУТИНГОМ /////

// Запрос для авторизации пользователя
// Это неавторизованный запрос (без передачи на сервер токена)
export const loginUser = (email, password) => {
  return request(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email, 
      "password": password
   })
  })
};


// Запрос для регистрации
// Это неавторизованный запрос (без передачи на сервер токена)
export const registerUser = (name, email, password) => {
  return request(`${API_URL}/auth/register`, {
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
}


// Запрос для опознания пользователя, забывшего пароль, по его мейлу
// Это неавторизованный запрос (без передачи на сервер токена)
export const recognizeUser = (email) => {
  return request(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": email
    })
  })
}


// Запрос для reset password
// Это неавторизованный запрос (без передачи на сервер токена)?
export const resetPassword = (password, token) => {
  return request(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
}



// Запрос для выхода из системы
// (авторизованный запрос)
export const logoutUser = () => {
  return fetchWithRefresh(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "token": localStorage.getItem('refreshToken')
   })
  })
};


// Авторизованный запрос на получение данных пользователя
export const getUser = () => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  });
};


// Авторизованный запрос на редактирование данных пользователя
export const patchUser = (name, email, password) => {
  return fetchWithRefresh(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
   })
  });
}



export const refreshToken = () => {
  return request(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};


// Универсальная функция, внутри которой автоматически срабатывает обновление токена,
// если он протух
// Вызывать ее вместо fetch в других запросах, где есть токен авторизации
// Это универсальная функция: как для запроса данных user, так и для 
// других запросов, которые требуют авторизации
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
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
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

