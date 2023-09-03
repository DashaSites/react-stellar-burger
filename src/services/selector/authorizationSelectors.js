
// Результат проверки: авторизован ли данный пользователь?
// (селектор обращается к стейту и вытаскивает определенный кусок стейта)
export function isUserAuthorizedSelector(state) {
  const isUserAuthorized = state.authorizationState.isAuthorized;
  return isUserAuthorized;
}




