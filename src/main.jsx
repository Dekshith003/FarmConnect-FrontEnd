import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { Provider } from "react-redux";
import { store } from "./app/store";

// Init AOS
AOS.init({
  duration: 1000,
  once: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
