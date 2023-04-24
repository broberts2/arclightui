import React, { FC } from "react";

import { EntryPortal, Page } from "../../components";

const Portal: FC<{
	fns: {
		[key: string]: any;
	};
	D: { [key: string]: any };
	endpoint?: string;
}> = ({ fns, D, endpoint }) => {
	return (
		<Page fns={fns}>
			<EntryPortal
				baseBackground={`${endpoint}/static/media/kayn2.jpg`}
				cards={[
					{
						backgroundHover: `${endpoint}/static/media/leesin.png`,
						hoverComponent: (
							<img
								src={`${endpoint}/static/media/lolicon.png`}
								className={`w-32 lg:w-64 object-cover`}
							/>
						),
						bgImg: `${endpoint}/static/media/leesin.png`,
						subText: "League of Legends",
						onClick: () => fns.route("/", "leagueoflegends"),
					},
					{
						backgroundHover: `${endpoint}/static/media/valorant.jpg`,
						hoverComponent: (
							<img
								src={`${endpoint}/static/media/valorant_logo.png`}
								className={`w-32 lg:w-64 object-cover`}
							/>
						),
						bgImg: `${endpoint}/static/media/valorant.jpg`,
						subText: "Valorant",
						onClick: () => fns.route("/"),
						locked: true,
					},
				]}
			/>
		</Page>
	);
};

export default Portal;
