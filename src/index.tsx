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
			nopage={"static/defaultart/404.jpg"}
			socketEndpoint={`http://localhost:7000`}
			pages={{
				leagueoflegends: {
					Home: { route: "/", component: require("./pages/Home") },
					Staff: { route: "/staff", component: require("./pages/Staff") },
					Community: {
						route: "/community",
						component: require("./pages/Community"),
					},
					Dynasty: { route: "/dynasty", component: require("./pages/Dynasty") },
					Login: { route: "/login", component: require("./pages/Login") },
					Profile: { route: "/profile", component: require("./pages/Profile") },
					Teams: { route: "/teams", component: require("./pages/Teams") },
					Team: { route: "/team", component: require("./pages/Team") },
					Article: {
						route: "/article",
						component: require("./pages/Article"),
					},
				},
				admin: {
					Home: {
						route: "/",
						backgroundImage: "static/media/malzahar_wallpaper.jpg",
						authBackgroundImage: "static/media/malzahar.png",
						noSelect: "static/media/TES-logo.png",
					},
				},
				_root_: {
					Home: { route: "/", component: require("./pages/Portal") },
				},
			}}
		/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
