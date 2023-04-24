import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { HeroPanel, Page, PageTitle } from "../../components";

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
				src: "https://rare-gallery.com/mocahbig/392666-catalogue-of-regrets-lor-legends-of-runeterra-game.jpg",
				opacity: 0.5,
			}}
		>
			<Header fns={fns} endpoint={endpoint} />
			<PageTitle
				orientation={"center"}
				text={"TES Staff"}
				fns={fns}
				img={"https://pbs.twimg.com/media/EmaD5UmVkAUHN7X.png"}
				bg={"http://localhost:7000/static/media/background1.mp4"}
				bgOffset={-50}
			/>
			<HeroPanel
				title={"Administrators"}
				small
				left={false}
				autoSort
				cards={[
					{
						hoverComponent: (
							<div>
								<div className={`text-xl`}>Developer</div>
								<div className={`text-md`}>
									Responsible for Crux, Website, Discord Bot, RIOT Games API
								</div>
							</div>
						),
						bgImg: "http://localhost:7000/static/media/azir.jpg",
						subText: "Jetgorilla",
						onClick: () => fns.route("/"),
					},
					{
						hoverComponent: (
							<div>
								<div className={`text-xl`}>League Director</div>
								<div className={`text-md`}>
									Responsible for Gladiator League, Conqueror League, Game Stats
									interface, Player Inegrity, Partnerships
								</div>
							</div>
						),
						bgImg: "http://localhost:7000/static/media/nilah.jpg",
						subText: "Semz",
						onClick: () => fns.route("/"),
					},
					{
						hoverComponent: (
							<div>
								<div className={`text-xl`}>League Director</div>
								<div className={`text-md`}>
									Responsible for Production, Graphic Media, Youtube, Twitch,
									Partnerships
								</div>
							</div>
						),
						bgImg: "http://localhost:7000/static/media/leesin.png",
						subText: "Phortwenty",
						onClick: () => fns.route("/"),
					},
				]}
			/>
			<div className={"h-16"} />
			<HeroPanel
				title={"Directors"}
				small
				left={false}
				autoSort
				cards={[
					{
						hoverComponent: (
							<div>
								<div className={`text-xl`}>League Director</div>
								<div className={`text-md`}>
									Responsible for Divinity League, Player Inegrity
								</div>
							</div>
						),
						bgImg: "http://localhost:7000/static/media/ornn.jpg",
						subText: "Batman",
						onClick: () => fns.route("/"),
					},
					{
						hoverComponent: (
							<div>
								<div className={`text-xl`}>Finance Director</div>
								<div className={`text-md`}>
									Responsible for TES Paypal, Treasury
								</div>
							</div>
						),
						bgImg: "http://localhost:7000/static/media/soraka.jpg",
						subText: "ℚʊякїї",
						onClick: () => fns.route("/"),
					},
				]}
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	);
};

export default Staff;
