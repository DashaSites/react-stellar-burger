// Экшены для двух редьюсеров: общей ленты заказов и истории заказов пользователя

// ЛЕНТА ЗАКАЗОВ
// для подключения к серверу (послать из компонентов) - идет в мидлвар
export const LOAD_ALL_ORDERS_WS_CONNECT = 'LOAD_ALL_ORDERS_CONNECT';
// для отключения от сервера (послать из компонентов) - идет в мидлвар
export const LOAD_ALL_ORDERS_WS_DISCONNECT = 'LOAD_ALL_ORDERS_DISCONNECT'; 

// а эти экшены сам мидлвар посылает в стор
export const LOAD_ALL_ORDERS_WS_CONNECTING = 'LOAD_ALL_ORDERS_WS_CONNECTING';
export const LOAD_ALL_ORDERS_WS_OPEN = 'LOAD_ALL_ORDERS_WS_OPEN';
export const LOAD_ALL_ORDERS_WS_CLOSE = 'LOAD_ALL_ORDERS_WS_CLOSE';
export const LOAD_ALL_ORDERS_WS_MESSAGE = 'LOAD_ALL_ORDERS_WS_MESSAGE';
export const LOAD_ALL_ORDERS_WS_ERROR = 'LOAD_ALL_ORDERS_WS_ERROR';



// ИСТОРИЯ ЗАКАЗОВ
// для подключения к серверу (послать из компонентов) - идет в мидлвар
export const LOAD_USERS_ORDERS_WS_CONNECT = 'LOAD_USERS_ORDERS_WS_CONNECT';
// для отключения от сервера (послать из компонентов) - идет в мидлвар
export const LOAD_USERS_ORDERS_WS_DISCONNECT = 'LOAD_USERS_ORDERS_WS_DISCONNECT'; 

// а эти экшены мидлвар сам мидлвар посылает в стор
export const LOAD_USERS_ORDERS_WS_CONNECTING = 'LOAD_USERS_ORDERS_WS_CONNECTING';
export const LOAD_USERS_ORDERS_WS_OPEN = 'LOAD_USERS_ORDERS_WS_OPEN';
export const LOAD_USERS_ORDERS_WS_CLOSE = 'LOAD_USERS_ORDERS_WS_CLOSE';
export const LOAD_USERS_ORDERS_WS_MESSAGE = 'LOAD_USERS_ORDERS_WS_MESSAGE';
export const LOAD_USERS_ORDERS_WS_ERROR = 'LOAD_USERS_ORDERS_WS_ERROR';



