import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { HeroPanel, Page, ProfilePage } from "../../components";

const Dynasty: FC<{
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
				src: "http://localhost:7000/static/media/ionia.jpg",
				opacity: 0.5,
			}}
		>
			<Header fns={fns} endpoint={endpoint} />
			<ProfilePage
				timeline={{
					bgVideo: `http://localhost:7000/static/media/background1.mp4`,
					elements: [],
				}}
				fns={fns}
				title={"Wukong Dynasty"}
				panelImg={"http://localhost:7000/static/media/jadewukong.jpg"}
				profileImg={`http://localhost:7000/static/media/dynasty.png`}
				Panel={<div className={``} style={{ minHeight: "175px" }}></div>}
			/>
			<HeroPanel
				small
				title={"Teams"}
				cards={[
					{
						hoverComponent: (
							<img
								src={"http://localhost:7000/static/media/dynasty2.png"}
								className={`w-32 lg:w-32 h-32 lg:h-32 object-cover rounded-full border-2 border-l-2 border-r-2 border-b-4 border-background-tertiary`}
							/>
						),
						bgImg: "http://localhost:7000/static/media/perfectionist.jpg",
						subText: "Wukong Slayers",
						onClick: () => fns.route("/team"),
					},
					{
						hoverComponent: (
							<img
								src={"http://localhost:7000/static/media/dynasty2.png"}
								className={`w-32 lg:w-32 h-32 lg:h-32 object-cover rounded-full border-2 border-l-2 border-r-2 border-b-4 border-background-tertiary`}
							/>
						),
						bgImg: "http://localhost:7000/static/media/jadevi.jpg",
						subText: "Wukong Emissaries",
						onClick: () => fns.route("/team"),
					},
					{
						hoverComponent: (
							<img
								src={"http://localhost:7000/static/media/dynasty2.png"}
								className={`w-32 lg:w-32 h-32 lg:h-32 object-cover rounded-full border-2 border-l-2 border-r-2 border-b-4 border-background-tertiary`}
							/>
						),
						bgImg: "http://localhost:7000/static/media/jadewukong3.jpg",
						subText: "Wukong Destroyers",
						onClick: () => fns.route("/team"),
					},
				]}
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	);
};

export default Dynasty;
