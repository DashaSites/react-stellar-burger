
// Результат проверки: авторизован ли данный пользователь?
// (селектор обращается к стейту и вытаскивает из него нужный кусок)
export function isUserAuthorizedSelector(state) {
  const isUserAuthorized = state.authorizationState.isAuthorized;
  return isUserAuthorized;
}

// Имя текущего (авторизованного) пользователя
export function userNameSelector(state) {
  const userName = state.authorizationState.userName;
  return userName;
}

// Имейл текущего (авторизованного) пользователя
export function userEmailSelector(state) {
  return state.authorizationState.userEmail;
}






