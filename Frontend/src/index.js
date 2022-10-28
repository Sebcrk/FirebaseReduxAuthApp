import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import store, { persistor } from "./store/index";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
