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
      nopage={"https://highmountainlabs.io/cdn/arclight/media/404.jpg"}
      socketEndpoint={
        process.env.REACT_APP_ENVIRONMENT === "production"
          ? `https://highmountainlabs.io:7001`
          : `localhost:7001`
      }
      loader={`https://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png`}
      background={{
        src: `https://highmountainlabs.io/cdn/arclight/media/hml.jpg`,
        opacity: 0,
      }}
      pages={{
        admin: {
          Home: {
            route: "/",
            backgroundImage:
              "https://highmountainlabs.io/cdn/arclight/media/hml.jpg",
            authBackgroundImage:
              "https://highmountainlabs.io/cdn/arclight/media/hml-inverted.jpg",
            noSelect:
              "https://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png",
          },
        },
        _root_: {
          Home: {
            route: "/",
            component: require("./pages/highmountainlabs/Home"),
          },
          Lab_ArticlePage: {
            route: "/lab-articlepage",
            component: require("./pages/highmountainlabs/Lab/articlepage"),
          },
          Auth: {
            route: "/auth",
            component: require("./pages/highmountainlabs/Login"),
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
