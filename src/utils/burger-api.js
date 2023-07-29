
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