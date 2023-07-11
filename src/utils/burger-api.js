
const url = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredients = () => {
  return fetch(`${url}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => checkReponse(res))
  };

export default getIngredients;