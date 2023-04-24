import React, { FC } from "react";
import {
	SlantedDivider,
	HeroPanel,
	MissionStatement,
	CompassViewer,
	Button,
	Page,
	FadeDivider,
} from "../../components";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";

const Home: FC<{
	fns: {
		[key: string]: any;
	};
	D: { [key: string]: any };
	endpoint?: string;
}> = ({ fns, D, endpoint }) => {
	console.log(D);
	return (
		<Page
			fns={fns}
			backgroundImage={{
				src: fns.e(
					D,
					`D.getrecords_homepagesettings.homepagesettings.homepagesettings[0].homepageimg`,
					`${endpoint}/static/media/yone.jpg`
				),
				opacity: 0.5,
			}}
		>
			<Header main fns={fns} endpoint={endpoint} />
			{/* <SlantedDivider
				rotation={1}
				img={require("../../yone2.jpg")}
				ruby={require("../../lolicon.png")}
			/> */}
			<FadeDivider
				ruby={`${endpoint}/static/media/lolicon.png`}
				fadeOpacity={0.05}
			/>
			<CompassViewer
				bgCompassElement={`${endpoint}/static/media/pyke.webm`}
				defaultSelection={1}
				items={[
					{
						bgImg: `${endpoint}/static/media/karma.jpg`,
						element: (
							<MissionStatement
								bgImg={`${endpoint}/static/media/karma.jpg`}
								title={"Welcome to Titan Esports!"}
								message={
									"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
								}
							/>
						),
					},
					{
						bgImg: `${endpoint}/static/media/discord.png`,
						element: (
							<MissionStatement
								bgImg={`${endpoint}/static/media/discord.jpg`}
								title={"Come chat on Discord"}
								message={
									"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
								}
								button={
									<Button
										label={"Titan Esports Discord"}
										idleIcon={"discord"}
										type={"button"}
										size={"normal"}
										animation={true}
										onClick={(status: any) =>
											fns.routeExternal(`https://discord.gg/kuWyKDxkR7`)
										}
									/>
								}
							/>
						),
					},
					{
						bgImg: `${endpoint}/static/media/twitch.png`,
						element: (
							<div>
								<MissionStatement
									bgImg={`${endpoint}/static/media/twitchtv.jpg`}
									title={"Catch us on Twitch.tv"}
									message={
										"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
									}
									button={
										<Button
											label={"Titan Esports Twitch.tv"}
											idleIcon={"twitch"}
											type={"button"}
											size={"normal"}
											animation={true}
											onClick={(status: any) =>
												fns.routeExternal(`https://www.twitch.tv/titanesportz`)
											}
										/>
									}
								/>
							</div>
						),
					},
					{
						bgImg: `${endpoint}/static/media/youtube.jpg`,
						element: (
							<MissionStatement
								bgImg={`${endpoint}/static/media/youtube.jpg`}
								title={"Check out our Vods"}
								message={
									"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
								}
								button={
									<Button
										label={"Titan Esports Youtube"}
										idleIcon={"youtube"}
										type={"button"}
										size={"normal"}
										animation={true}
										onClick={(status: any) =>
											fns.routeExternal(
												`https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw/videos`
											)
										}
									/>
								}
							/>
						),
					},
					{
						bgImg: `${endpoint}/static/media/illaoi.jpg`,
						element: (
							<MissionStatement
								bgImg={`${endpoint}/static/media/illaoi.jpg`}
								title={"Catch us on Twitch.tv"}
								message={
									"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
								}
							/>
						),
					},
				]}
			/>
			<MissionStatement
				title={"Titan Esports"}
				message={
					"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
				}
			/>
			<HeroPanel
				cards={fns
					.e(D, `D.getrecords_lolleague.lolleague`, [])
					.map((league: { [key: string]: any }) => ({
						locked: league.locked,
						hoverComponent: (
							<img src={league.logo} className={`w-32 lg:w-64 object-cover`} />
						),
						bgImg: league.img,
						subText: league.name,
						onClick: () => fns.route("/"),
					}))}
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	);
};

export default Home;
