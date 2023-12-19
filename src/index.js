import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { Provider } from 'react-redux';
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store/store.js";
import { HTML5Backend } from 'react-dnd-html5-backend'; // Контекст для dnd
import { DndProvider } from 'react-dnd';
import { BrowserRouter as Router } from 'react-router-dom';





ReactDOM.render(
  <React.StrictMode>
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
