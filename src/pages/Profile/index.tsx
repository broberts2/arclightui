import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, ProfilePage, HeroPanel } from "../../components";

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
				src: "http://localhost:7000/static/media/valleymountain.jpg",
				opacity: 0.5,
			}}
		>
			<Header fns={fns} endpoint={endpoint} />
			<ProfilePage
				timeline={{
					bgVideo: `http://localhost:7000/static/media/background2.mp4`,
					elements: [],
				}}
				fns={fns}
				title={"Jetgorilla"}
				profileImg={`http://localhost:7000/static/media/azir.jpg`}
				panelImg={"http://localhost:7000/static/media/ionia.jpg"}
				Panel={
					<HeroPanel
						small
						title={true ? "Team Memberships" : null}
						cards={
							true
								? [
										{
											hoverComponent: (
												<img
													src={"http://localhost:7000/static/media/yone.jpg"}
													className={`w-32 lg:w-32 h-32 lg:h-32 object-cover rounded-full border-2 border-l-2 border-r-2 border-b-4 border-background-tertiary`}
												/>
											),
											bgImg:
												"http://localhost:7000/static/media/jadewukong2.jpg",
											subText: "Wukong's Divinity Team",
											onClick: () => fns.route("/team"),
										},
								  ]
								: []
						}
					/>
				}
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	);
};

export default Staff;
