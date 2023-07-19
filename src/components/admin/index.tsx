import { FC } from "react";
import Styles from "./styles";
import Drawer from "../drawer";
import AuthPage from "../authpage";
import FlexPanel from "./flexpanel";
import Page from "../page";
import Panels from "./panels/index";

import { useMediaQuery } from "react-responsive";

import database from "./indexitems/database";
import integration from "./indexitems/integration";
import event from "./indexitems/event";
import script from "./indexitems/script";
import report from "./indexitems/reportsitems";
import form from "./indexitems/formsitems";
import app from "./indexitems/app";

import constructFromRecordList from "./stfns/constructfromrecordlist";
import constructFromDataModel from "./stfns/constructfromdatamodel";
import parseCode from "./stfns/parsecode";

// const ItemsArray = [database, integration, event, script, report, form, app];
const ItemsArray = [database, integration, script, app, form];

const Admin: FC<{
	fns: {
		[key: string]: any;
	};
	backgroundImage: string;
	authBackgroundImage: string;
	D: { [key: string]: any };
	noSelect?: string;
	endpoint: string;
}> = ({ fns, backgroundImage, authBackgroundImage, D, noSelect, endpoint }) => {
	let authenticated = false;
	const Constructors: { [key: string]: any } = {
		constructFromRecordList: constructFromRecordList(D),
		constructFromDataModel: constructFromDataModel(D),
	};
	const iArray: { [key: string]: any } = [];
	ItemsArray.map((fn: Function) => {
		const _: { items: any; icon: string; text: string; cond: boolean } = fn(
			D,
			fns
		);
		if (_.cond) {
			authenticated = true;
			iArray.push(
				Object.assign(
					{
						color: "lightgray",
						italic: true,
						isExpanded: fns.parseAdminDomainState().section === _.text,
						onClick: () =>
							fns.setAdminDomainState(
								fns.parseAdminDomainState().section === _.text
									? undefined
									: { section: _.text }
							),
					},
					_
				)
			);
		}
	});
	return (
		<Styles.Container>
			<Page
				fns={fns}
				backgroundImage={{
					src: `${endpoint}/${backgroundImage}`,
					opacity: 0.5,
				}}
			>
				<Styles.Body className={`flex flex-row`}>
					<Styles.Drawer
						className={"block"}
						style={{ display: !authenticated ? "none" : "" }}
					>
						<Drawer
							autoSort
							headerImg={
								useMediaQuery({ query: "(min-width: 1024px)" })
									? `${endpoint}/${noSelect}`
									: undefined
							}
							startOpen={useMediaQuery({ query: "(min-width: 1024px)" })}
							locked={useMediaQuery({ query: "(min-width: 1024px)" })}
							animation={"slide"}
							buttonSide="left"
							side="left"
							items={iArray.sort((a: any, b: any) =>
								a.text < b.text ? -1 : 1
							)}
							signOut={() => fns.signOut()}
						/>
					</Styles.Drawer>
					<Styles.Content>
						{!authenticated ? (
							<AuthPage
								headless
								disableNewRegistration
								fns={fns}
								D={D}
								authBackgroundImage={`${endpoint}/${authBackgroundImage}`}
								OATHOnly={false}
								OATH={[
									{
										type: "discord",
										onClick: () =>
											fns.calls && fns.calls.DiscordOATH2
												? fns.calls.DiscordOATH2({
														domain: fns.readState().subdomain,
												  })
												: null,
									},
								]}
							/>
						) : null}
						{authenticated && Object.keys(fns.calls).length ? (
							<FlexPanel
								publicURI={endpoint}
								fns={fns}
								noSelect={`${endpoint}/${noSelect}`}
								D={D}
								searchOn={fns.parseAdminDomainState().item}
								callresolved={
									D &&
									(D.serversuccess ||
										D.servererror ||
										D.serverwarning ||
										D.servermessage)
										? parseCode(D)
										: 0
								}
								cols={0}
								items={Panels(D, Constructors, fns, endpoint)}
							/>
						) : null}
					</Styles.Content>
				</Styles.Body>
			</Page>
		</Styles.Container>
	);
};

export default { default: Admin };
