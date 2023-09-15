
// Результат проверки: авторизован ли данный пользователь?
// (селектор обращается к стейту и вытаскивает из него нужный кусок)
export function isUserAuthorizedSelector(state) {
  const isUserAuthorized = state.authorizationState.isAuthorized;
  return isUserAuthorized;
}




