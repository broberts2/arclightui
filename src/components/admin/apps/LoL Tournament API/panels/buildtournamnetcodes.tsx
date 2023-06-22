import React from "react";

{
	/* <PickList
	type={c.lookup}
	D={D}
	fns={fns}
	disallowNone={c.type === "Boolean"}
	multiple={multiple}
	span
	hot
	value={
		state[c.label] !== undefined &&
		state[c.label] !== null &&
		Array.isArray(state[c.label])
			? state[c.label]
			: !multiple
			? state[c.label]
			: []
	}
	list={
		c.type === "Boolean"
			? [
					{ text: "true", value: true },
					{ text: "false", value: false },
			  ]
			: c &&
			  c.D &&
			  c.lookup &&
			  c.D[`getrecords_${c.lookup}`] &&
			  c.D[`getrecords_${c.lookup}`][c.label] &&
			  c.D[`getrecords_${c.lookup}`][c.label].records
			? c.D[`getrecords_${c.lookup}`][c.label].records.map((obj: any) => {
					const _: any = { value: obj._id };
					if (obj.name) _.text = obj.name;
					else if (obj.username) _.text = obj.username;
					else if (obj.text) _.text = obj.text;
					return _;
			  })
			: []
	}
	onChange={(e: any) => {
		return setState((_: any) => ({
			..._,
			[c.label]: e.target.value,
		}));
	}}
	key={i}
	label={c.label}
	variant="standard"
/>; */
}

export default (props: any) => {
	const [state, setState] = React.useState({
		league: null,
		team1: null,
		team2: null,
		count: null,
		weekNum: null,
		seasonNum: null,
		MonacoRef: {},
	});
	return props.D &&
		props.D.getintegrations &&
		props.D.getintegrations["LoL Tournament API"] ? (
		<div className={`flex flex-col space-y-10`}>
			{[
				{
					type: props.D.getintegrations["LoL Tournament API"].settings
						.leaguemodeltype,
					value: "league",
					label: "League Selection",
				},
				{
					type: props.D.getintegrations["LoL Tournament API"].settings
						.teammodeltype,
					value: "team1",
					label: "Team 1 Selection",
				},
				{
					type: props.D.getintegrations["LoL Tournament API"].settings
						.teammodeltype,
					value: "team2",
					label: "Team 2 Selection",
				},
			].map((el: any) => (
				<props.Controls.PickList
					type={el.type}
					D={props.D}
					fns={props.fns}
					span
					hot
					value={state[el.value]}
					list={
						props.D &&
						props.D[`getrecords_${el.type}`] &&
						props.D[`getrecords_${el.type}`][el.label] &&
						props.D[`getrecords_${el.type}`][el.label].records
							? props.D[`getrecords_${el.type}`][el.label].records.map(
									(obj: any) => {
										const _: any = { value: obj._id };
										_.text = obj.name;
										return _;
									}
							  )
							: []
					}
					onChange={(e: any) =>
						setState((_: any) => ({
							..._,
							[el.value]: e.target.value,
						}))
					}
					key={0}
					label={el.label}
					variant="standard"
				/>
			))}
			<props.Controls.PickList
				unlinked
				span
				hot
				value={state.count}
				list={[1, 3, 5, 7].map((value: number) => ({
					text: `${value}`,
					value,
				}))}
				onChange={(e: any) =>
					setState((_: any) => ({
						..._,
						count: e.target.value,
					}))
				}
				key={0}
				label={"Code Count"}
				variant="standard"
			/>
			<props.Controls.TextField
				span
				hot
				value={state.seasonNum}
				onChange={(e: any) =>
					setState((_: any) => ({
						..._,
						seasonNum: parseInt(e.target.value),
					}))
				}
				type={"text"}
				key={0}
				label={"Season Number"}
				variant="standard"
			/>
			<props.Controls.TextField
				span
				hot
				value={state.weekNum}
				onChange={(e: any) =>
					setState((_: any) => ({
						..._,
						weekNum: parseInt(e.target.value),
					}))
				}
				type={"text"}
				key={0}
				label={"Week Number"}
				variant="standard"
			/>
			<props.Controls.Button
				span
				label={"Generate Tournament Codes"}
				type={"button"}
				size={"md"}
				animation={true}
				disabled={false}
				block={false}
				rounded={false}
				square={false}
				isIconButton={false}
				onClick={(status: any) => {
					props.fns.calls.generatetournamentcodes({
						...state,
						MonacoRef: undefined,
					});
					props.setState((_: any) => ({
						..._,
						_isLoading: true,
						_primemodal: (D: any) => {
							const _ = props.fns.e(
								D,
								`D.generatetournamentcodes.generatetournamentcodes`,
								{}
							);
							props.fns.setModal({
								noescape: true,
								mode: "full",
								body: (
									<div className={`w-full`}>
										<div className={`text-4xl`}>
											{_.league && _.league.name ? _.league.name : ""}
										</div>
										<div
											className={`w-full flex flex-row justify-center space-x-5`}
										>
											<div className={`text-2xl`}>
												{_.team1 && _.team1.name ? _.team1.name : ""}
											</div>
											<div className={`text-2xl`}>vs</div>
											<div className={`text-2xl`}>
												{_.team2 && _.team2.name ? _.team2.name : ""}
											</div>
										</div>
										<div className={`text-xl`}>
											Season {_.seasonNum ? _.seasonNum : ""}
										</div>
										<div className={`text-lg`}>
											Week {_.weekNum ? _.weekNum : ""}
										</div>
										<div className={`w-full h-96 p-4`}>
											<props.Controls.Monaco
												refName={"codes"}
												language={"json"}
												defaultValue={_.JSON}
												state={state}
												setState={setState}
											/>
										</div>
									</div>
								),
							});
						},
					}));
				}}
			/>
		</div>
	) : null;
};
