import React, { FC } from "react";
import HeroPanel from "../../../heropanel";
import panels from "./panels";
import Controls from "./controls";
import Styles from "./styles";

const LoLTournamentAPI: FC<{
	state: { [key: string]: any };
	setState: Function;
	D: { [key: string]: any };
	fns: { [key: string]: any };
	publicURI: string;
}> = ({ state, setState, D, fns, publicURI }) => {
	return (
		<Styles.Container className={`flex justify-center align-middle`}>
			{!fns.parseAdminDomainState().activePanel ? (
				<Styles.SubContainer
					className={`flex flex-col justify-center align-middle`}
				>
					<HeroPanel
						small
						title={"Select a Function"}
						cards={[
							{
								hoverComponent: (
									<img
										src={`${publicURI}/static/defaultart/purple_essence.png`}
										className={`w-32 lg:w-64 object-cover`}
									/>
								),
								bgImg: `${publicURI}/static/defaultart/ionia_1.jpg`,
								subText: "Build Tournament Code(s)",
								onClick: () =>
									fns.setAdminDomainState({
										...fns.parseAdminDomainState(),
										activePanel: 1,
										subItem: "Build Tournament Code(s)",
									}),
							},
							{
								hoverComponent: (
									<img
										src={`${publicURI}/static/defaultart/orange_essence.png`}
										className={`w-32 lg:w-64 object-cover`}
									/>
								),
								bgImg: `${publicURI}/static/defaultart/ionia_2.png`,
								subText: "Authenticate Summoner",
								onClick: () =>
									fns.setAdminDomainState({
										...fns.parseAdminDomainState(),
										activePanel: 1,
										subItem: "Authenticate Summoner",
									}),
							},
							{
								hoverComponent: (
									<img
										src={`${publicURI}/static/defaultart/blue_essence.png`}
										className={`w-32 lg:w-64 object-cover`}
									/>
								),
								bgImg: `${publicURI}/static/defaultart/ionia_3.jpg`,
								subText: "Import by Tournament Code",
								onClick: () =>
									fns.setAdminDomainState({
										...fns.parseAdminDomainState(),
										activePanel: 1,
										subItem: "Import by Tournament Code",
									}),
							},
						]}
					/>
				</Styles.SubContainer>
			) : (
				panels(
					fns.parseAdminDomainState().activePanel,
					publicURI,
					fns,
					D,
					Controls,
					state,
					setState
				)
			)}
		</Styles.Container>
	);
};

export default LoLTournamentAPI;
