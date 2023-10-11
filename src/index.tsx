import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { App } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App
      nopage={"http://highmountainlabs.io/arclight/cdn/media/404.jpg"}
      socketEndpoint={
        process.env.REACT_APP_ENVIRONMENT === "production"
          ? `http://highmountainlabs.io:7001`
          : `localhost:7001`
      }
      loader={`http://highmountainlabs.io/arclight/cdn/media/highmountainlabs.png`}
      background={{
        src: `http://highmountainlabs.io/arclight/cdn/media/2.jpg`,
        opacity: 0.1,
      }}
      pages={{
        admin: {
          Home: {
            route: "/",
            // backgroundImage: "static/media/zoe.jpg",
            // authBackgroundImage: "static/media/aurelionsol.jpg",
            // noSelect: "static/media/hml-logo.png",
          },
        },
        testdomain: {
          Home: { route: "/", component: require("./pages/Home") },
          Login: { route: "/login", component: require("./pages/Login") },
        },
        _root_: {
          Home: { route: "/", component: require("./pages/Home") },
          Login: { route: "/login", component: require("./pages/Login") },
          ArclightUI: {
            route: "/arclightui",
            component: require("./pages/ArclightUI"),
          },
        },
      }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
