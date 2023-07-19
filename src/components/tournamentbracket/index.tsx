export default {};

// import React, { FC } from "react";
// import {
// 	Bracket,
// 	RoundProps,
// 	Seed,
// 	SeedItem,
// 	SeedTeam,
// 	RenderSeedProps,
// } from "react-brackets";
// import FontAwesome from "../fontawesome/index";
// import Styles from "./styles";

// export interface PropTypes {}

// const TournamentBracket: FC<PropTypes> = ({}) => {
// 	const CustomSeed = ({
// 		seed,
// 		breakpoint,
// 		roundIndex,
// 		seedIndex,
// 	}: RenderSeedProps) => {
// 		return (
// 			<Seed mobileBreakpoint={breakpoint} style={{ fontSize: "18px" }}>
// 				<SeedItem>
// 					<div>
// 						<SeedTeam>
// 							<div className={"flex align-middle"}>
// 								<img
// 									src="https://titan-esports.org:7000/static/images/TES-logo.png"
// 									style={{ height: 35 }}
// 								/>
// 								{seed.teams[0]?.name || "NO TEAM "}
// 							</div>
// 						</SeedTeam>
// 						<SeedTeam>
// 							<div className={"flex align-middle"}>
// 								<img
// 									src="https://titan-esports.org:7000/static/images/TES-logo.png"
// 									style={{ height: 35 }}
// 								/>
// 								{seed.teams[0]?.name || "NO TEAM "}
// 							</div>
// 						</SeedTeam>
// 					</div>
// 				</SeedItem>
// 			</Seed>
// 		);
// 	};
// 	const rounds: RoundProps[] = [
// 		{
// 			title: "Round 1",
// 			seeds: [
// 				{
// 					id: 1,
// 					date: new Date().toDateString(),
// 					teams: [{ name: "Team A" }, { name: "Team B" }],
// 				},
// 				{
// 					id: 2,
// 					date: new Date().toDateString(),
// 					teams: [{ name: "Team C" }, { name: "Team D" }],
// 				},
// 				{
// 					id: 3,
// 					date: new Date().toDateString(),
// 					teams: [{ name: "Team E" }, { name: "Team F" }],
// 				},
// 				{
// 					id: 4,
// 					date: new Date().toDateString(),
// 					teams: [{ name: "Team G" }, { name: "BYE" }],
// 				},
// 			],
// 		},
// 		{
// 			title: "Round 2",
// 			seeds: [
// 				{
// 					id: 5,
// 					date: new Date().toDateString(),
// 					teams: [{ name: "Team A" }, { name: "Team C" }],
// 				},
// 				{
// 					id: 6,
// 					date: new Date().toDateString(),
// 					teams: [{ name: "Team E" }, { name: "Team G" }],
// 				},
// 			],
// 		},
// 		{
// 			title: "Round 3",
// 			seeds: [
// 				{
// 					id: 7,
// 					date: new Date().toDateString(),
// 					teams: [{ name: "Team A" }, { name: "Team E" }],
// 				},
// 			],
// 		},
// 	];
// 	return (
// 		<Styles.Container className={"flex"}>
// 			<Bracket rounds={rounds} renderSeedComponent={CustomSeed} rtl={false} />
// 			<FontAwesome
// 				size={"6x"}
// 				icon={"crown"}
// 				//@ts-ignore
// 				className={"align-bottom"}
// 			/>
// 			<Bracket rounds={rounds} renderSeedComponent={CustomSeed} rtl={true} />
// 		</Styles.Container>
// 	);
// };

// export default TournamentBracket;
