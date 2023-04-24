import React from "react";

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
	return (
		<div className={`flex flex-col space-y-10`}>
			{[
				{
					l: "League Selection",
					v: "league",
					r: "D.getrecords_lolleague.lolleague",
				},
				{ l: "Team 1 Selection", v: "team1", r: "D.getrecords_team.team" },
				{ l: "Team 2 Selection", v: "team2", r: "D.getrecords_team.team" },
				{ l: "Code Count", v: "count", n: [1, 3, 5, 7] },
			].map((el: any) => (
				<props.Controls.PickList
					disableSearch
					disallowNone
					span
					hot
					value={state[el.v]}
					list={
						el.n
							? el.n.map((el: any) => ({ text: `${el}`, value: el }))
							: props.fns
									.e(props.D, el.r, [])
									.map((t: any) => ({ text: t.name, value: t }))
					}
					onChange={(e: any) =>
						setState((_: any) => ({
							..._,
							[el.v]: e.target.value,
						}))
					}
					key={0}
					label={el.l}
					variant="standard"
				/>
			))}
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
	);
};
