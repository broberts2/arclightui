import React, { FC } from "react";
import { Header } from "../components";

const H: FC<{
	fns: {
		[key: string]: any;
	};
	main?: boolean;
	endpoint?: string;
}> = ({ fns, main, endpoint }) =>
	main ? (
		<Header
			fns={fns}
			logo={{
				src: `${endpoint}/static/media/TES-logo.png`,
				route: "/",
			}}
			linksLeft={[
				{
					icon: "users",
					route: "/community",
					text: "Community",
				},
				{
					icon: "chart-line",
					route: "/teams",
					text: "Teams and Stats",
				},
				{
					icon: "chess-knight",
					route: "/",
					text: "Crux",
				},
			]}
			linksRight={[
				{ icon: "user-astronaut", route: "/staff", text: "Staff" },
				{ icon: "scroll", route: "/", text: "Applications" },
				fns.readToken()._token
					? {
							icon: "scroll",
							route: "/profile",
							text: "My Profile",
					  }
					: { icon: "scroll", route: "/login", text: "Login" },
				fns.readToken()._token
					? {
							icon: "scroll",
							route: "/",
							text: "Sign Out",
							onClick: () => {
								fns.writeToken();
							},
					  }
					: null,
			]}
			socialMediaLeft={[
				{
					route: "/",
					icon: "discord",
				},
				{
					route: "/",
					icon: "twitch",
				},
				{
					route: "/",
					icon: "twitter",
				},
			]}
			socialMediaRight={[
				{
					route: "/",
					icon: "reddit",
				},
				{
					route: "/",
					icon: "youtube",
				},
				{
					route: "/",
					icon: "facebook",
				},
			]}
		/>
	) : (
		<Header
			fns={fns}
			logo={{
				src: `${endpoint}/static/media/TES-logo.png`,
				route: "/",
			}}
			links={[
				{ icon: "users", route: "/community", text: "Community" },
				{ icon: "chart-line", route: "/teams", text: "Teams and Stats" },
				{ icon: "chess-knight", route: "/", text: "Crux" },
				{ icon: "user-astronaut", route: "/staff", text: "Staff" },
				{ icon: "scroll", route: "/", text: "Applications" },
				fns.readToken()._token
					? { icon: "scroll", route: "/profile", text: "My Profile" }
					: { icon: "scroll", route: "/login", text: "Login" },
				fns.readToken()._token
					? {
							icon: "scroll",
							route: "/",
							text: "Sign Out",
							onClick: () => {
								fns.writeToken();
							},
					  }
					: null,
			]}
			socialMedia={[
				{
					route: "/",
					icon: "discord",
				},
				{
					route: "/",
					icon: "twitch",
				},
				{
					route: "/",
					icon: "twitter",
				},
				{
					route: "/",
					icon: "reddit",
				},
				{
					route: "/",
					icon: "youtube",
				},
				{
					route: "/",
					icon: "facebook",
				},
			]}
		/>
	);

export default H;
