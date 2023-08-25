import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { carregarLembretes } from "./redux/actions";
import App from "./App";
import "./index.css";
import store from './redux/store'

// Load Store com os dados do bd
const fetchLembretes = async () => {
  try {
    const response = await fetch("http://localhost:5183/api/lembretes"); 
    if (response.ok) {
      const lembretesData = await response.json();

      store.dispatch(carregarLembretes(lembretesData));
    } else {
      console.error("Erro ao obter os lembretes:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao obter os lembretes:", error);
  }
};

fetchLembretes();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
