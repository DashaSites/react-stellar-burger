
export const socketMiddleware = (wsUrl, wsActions, isAuthRequired) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { 
        wsConnect,
        wsDisconnect,
        onOpen, 
        onClose, 
        onError, 
        onMessage,
        wsSendMessage
      } = wsActions;
      
      /*
      const { user } = getState().user;
      */


      if (type === wsConnect) {
        if (isAuthRequired) {

          const accessToken = localStorage.getItem('accessToken');
          const tokenNumber = accessToken.split(" ")[1];
          socket = new WebSocket(`${wsUrl}?token=${tokenNumber}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (type === wsDisconnect) {
        socket.close();
      }




      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Прозошла какая-то ошибка" });
        };

        socket.onmessage = event => {

          const parsedData = JSON.parse(event.data);
  
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };









        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        /*
        if (type === wsSendMessage) {
          const message = { ...payload, token: user.token };
          socket.send(JSON.stringify(message));
        }
        */

      }

      next(action);
    };
  };
};



















/*


compose(applyMiddleware(thunkMiddleware), applyMiddleware(socketMiddleware('wss://norma.nomoreparties.space/chat', wsActions))) // Ваш код здесь


const socketMiddleware = (wsUrl, wsActions) => {
// параметр wsActions позволяет передать разные наборы экшенов.
// есть два вебсокет-соединения, и каждый работает со своим редьюсером.
// поэтому нужно передавать сюда 2 набора экшенов, чтобы они шли каждый в свой редьюсер
  return (dispatch) => {
  
      const { 
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect
      } = wsActions; // из wsActions вытаскиваем набор полей 
       // (это экшен-криейторы, в которых уже хранятся соответствующие экшены) 


        const socket = new Websocket(wsUrl);
        // когда я диспатчу экшен на подключение, я в payload должна передать нужный url
        dispatch(wsConnecting());
       
     
        // подключение случилось, и мы диспатчим экшен, что установилось соединение
        socket.onopen = () => { 
          dispatch(onOpen());
        }

        // произошла ошибка, и мы диспатчим текст об ошибке
        socket.onerror = () => {
          dispatch(onError("Прозошла какая-то ошибка"));
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data); // парсим пришедшие данные из JSON'а
        
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        } 

        // если соединение закрывается, то мы диспатчим экшен onClose
        socket.onclose = () => {
          dispatch(onClose());
        }
    }
  }

  */