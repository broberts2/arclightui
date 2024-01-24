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
      nopage={"https://highmountainlabs.io/arclight/cdn/media/404.jpg"}
      socketEndpoint={
        process.env.REACT_APP_ENVIRONMENT === "production"
          ? `https://highmountainlabs.io:7001`
          : `localhost:7001`
      }
      loader={`https://highmountainlabs.io/arclight/cdn/media/highmountainlabs.png`}
      background={{
        src: `https://highmountainlabs.io/arclight/cdn/media/2.jpg`,
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
        brocroberts: {
          Home: {
            route: "/",
            component: require("./pages/brocroberts/Home"),
          },
        },
        _root_: {
          Home: {
            route: "/",
            component: require("./pages/highmountainlabs/Home"),
          },
          Login: {
            route: "/login",
            component: require("./pages/highmountainlabs/Login"),
          },
          ArclightUI: {
            route: "/arclightui",
            component: require("./pages/highmountainlabs/ArclightUI"),
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
