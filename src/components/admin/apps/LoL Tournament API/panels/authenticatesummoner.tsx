//@ts-nocheck
import React from "react";
import fns from "../../../../app/fns";

export default (props: any) => {
	const [user, setUser] = React.useState(null);
	const [summonername, setSummonerName] = React.useState(null);
	const [puuid, setPuuid] = React.useState(null);
	React.useEffect(() => {
		if (!user) return;
		setSummonerName(user.summonername);
		setPuuid(user.puuid);
	}, [user]);
	const playermodeltype = props.fns.e(
		props.D,
		`D.getintegrations.LoL Tournament API.settings.playermodeltype`,
		null
	);
	return (
		<div className={`flex flex-col space-y-10`}>
			<props.Controls.PickList
				disallowNone
				span
				hot
				value={user}
				list={props.fns
					.e(props.D, `D.getrecords_${playermodeltype}.${playermodeltype}`, [])
					.map((t: any) => ({ text: t.username, value: t }))}
				onChange={(e: any) => setUser(e.target.value)}
				key={0}
				label={"User Selection"}
				variant="standard"
			/>
			<div className={puuid ? `pointer-events-none opacity-30` : ""}>
				<props.Controls.TextField
					span
					hot
					value={summonername && summonername.length ? summonername : ""}
					onChange={(e: any) => setSummonerName(e.target.value)}
					type={"text"}
					key={0}
					label={"Summoner Name"}
					variant="standard"
				/>
			</div>
			<div className={`pointer-events-none opacity-30`}>
				<props.Controls.TextField
					bind
					span
					value={puuid && puuid.length ? puuid : ""}
					type={"text"}
					key={0}
					label={"PUUID"}
					variant="standard"
				/>
			</div>
			<props.Controls.Button
				span
				label={
					user && user.puuid
						? "Release Summoner PUUID"
						: "Authenticate Summoner"
				}
				type={"button"}
				size={"md"}
				animation={true}
				disabled={false}
				block={false}
				rounded={false}
				square={false}
				isIconButton={false}
				onClick={(status: any) => {
					//if (!user) return;
					props.fns.calls.authenticatesummoner(
						user
							? {
									_id: user._id,
									summonername,
									puuid,
							  }
							: {}
					);
					props.setState((_: any) => ({
						..._,
						_isLoading: true,
					}));
				}}
			/>
		</div>
	);
};
