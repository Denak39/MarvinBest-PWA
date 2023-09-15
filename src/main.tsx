import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Toastify from "toastify-js";

// Redux store
import { store } from "@app/store";
// Components
import App from "@src/App";
import { registerSW } from "virtual:pwa-register";

// https://css-tricks.com/vitepwa-plugin-offline-service-worker/
if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location) && !/lvh.me/.test(window.location)) {
  const updateSW = registerSW({
    onNeedRefresh() {
      Toastify({
        text: `<h4 style='display: inline'>An update is available!</h4>
               <br><br>
               <a class='do-sw-update'>Click to update and reload</a>  `,
        escapeMarkup: false,
        gravity: "bottom",
        onClick() {
          updateSW(true);
        },
      }).showToast();
    },
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
