const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { 
        WEBSOCKET_CONNECT,
        WEBSOCKET_DISCONNECT,
        WEBSOCKET_SEND_MESSAGE,
        WEBSOCKET_ONOPEN,
        WEBSOCKET_ONCLOSE,
        WEBSOCKET_ONERROR,
        WEBSOCKET_ONMESSAGE,
        WEBSOCKET_CONNECTING




        wsConnect, 
        onOpen, 
        onError, 
        onMessage, 
        onClose 
      } = wsActions;

      if (type === WEBSOCKET_CONNECT.type) {
        socket = new Websocket(wsUrl);
        dispatch(WEBSOCKET_CONNECTING());
      }

      if (socket) {

        socket.onopen = () => {
          dispatch(WEBSOCKET_ONOPEN());
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        } 

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        }

        if (type === WEBSOCKET_DISCONNECT.type) {
          socket.close();
        }
      }

      next(action);

    }
  }
}