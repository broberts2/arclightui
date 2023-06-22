import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, AuthPage } from "../../components";

const Staff: FC<{
	fns: {
		[key: string]: any;
	};
	D: { [key: string]: any };
	endpoint?: string;
}> = ({ fns, D, endpoint }) => {
	return (
		<Page
			fns={fns}
			backgroundImage={{
				src: "https://a-static.besthdwallpaper.com/the-shadow-reaper-kayn-league-of-legends-lol-wallpaper-2048x768-103766_85.jpg",
				opacity: 0.5,
			}}
		>
			<Header fns={fns} endpoint={endpoint} />
			<AuthPage
				redirect={"/"}
				D={D}
				fns={fns}
				authBackgroundImage={
					"https://a-static.besthdwallpaper.com/the-unforgotten-yone-league-of-legends-lol-wallpaper-1024x576-95538_44.jpg"
				}
				OATHOnly={false}
				OATH={[{ type: "discord", onClick: () => null }]}
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	);
};

export default Staff;
