import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store, { loginWithToken } from "./store";
import { HashRouter } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

store.dispatch(loginWithToken());
const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
