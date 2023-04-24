export default (
	c: { [key: string]: any },
	i: Number,
	TextField: any,
	PickList: any,
	Checkbox: any,
	Bttn: any,
	state: { [key: string]: any },
	setState: Function,
	D: any
) => {
	return state && state[c.label] && typeof state[c.label] === "object" ? (
		<div
			className={`border-background-quarternary border-l-2 p-4 flex-row justify-start space-y-4`}
		>
			<TextField
				span
				hot
				defaultValue={state[c.label].key}
				onChange={(e: any) =>
					setState((_: any) => ({
						..._,
						[c.label]: {
							...state[c.label],
							key: e.target.value,
						},
					}))
				}
				type={"text"}
				key={i}
				label={"key"}
				variant="standard"
			/>
			<PickList
				disallowNone
				span
				hot
				value={state[c.label].type}
				list={[
					{ value: "String", text: "String" },
					{ value: "Number", text: "Number" },
					{ value: "Boolean", text: "Boolean" },
					{ value: "Array", text: "Array" },
					{ value: "JSON", text: "JSON" },
				].sort((a, b) => (a.text < b.text ? -1 : 1))}
				onChange={(e: any) =>
					setState((_: any) => ({
						..._,
						[c.label]: {
							...state[c.label],
							type: e.target.value,
							lookup: null,
						},
					}))
				}
				key={i}
				label={"type"}
				variant="standard"
			/>
			{state[c.label].lookup ? (
				<PickList
					disallowNone
					span
					hot
					value={state[c.label].lookup}
					list={D.getdatamodels.map((el: any) => ({
						text: el._type,
						value: el._type,
					}))}
					onChange={(e: any) =>
						setState((_: any) => ({
							..._,
							[c.label]: {
								...state[c.label],
								lookup: e.target.value,
							},
						}))
					}
					key={i}
					label={"model"}
					variant="standard"
				/>
			) : null}
			<div
				className={`text-text-primary font-primary text-base flex justify-start`}
			>
				<div
					className={`m-auto ${
						state[c.label] &&
						state[c.label].type &&
						(state[c.label].type === "String" ||
							state[c.label].type === "Array")
							? null
							: `opacity-30 pointer-events-none`
					}`}
				>
					<Checkbox
						value={state[c.label].lookup}
						onChange={(b: boolean, cb: Function) => {
							setState((_: any) => ({
								..._,
								[c.label]: {
									...state[c.label],
									lookup: b ? null : _[c.label],
								},
							}));
							cb(!b);
						}}
					/>
				</div>
				<div
					className={`m-auto ${
						state[c.label] &&
						state[c.label].type &&
						(state[c.label].type === "String" ||
							state[c.label].type === "Array")
							? null
							: `opacity-30 pointer-events-none`
					}`}
				>
					Lookup
				</div>
				<div className={`m-auto`}>
					<Checkbox
						value={state[c.label].required}
						onChange={(b: boolean, cb: Function) => {
							setState((_: any) => ({
								..._,
								[c.label]: {
									...state[c.label],
									required: b ? null : _[c.label],
								},
							}));
							cb(!b);
						}}
					/>
				</div>
				<div className={`m-auto`}>Required</div>
				<div className={`flex justify-end w-full space-x-2`}>
					{!state[c.label].system || true ? (
						<Bttn
							t={"Remove"}
							a={() => {
								setState((_: any) => ({ ..._, [c.label]: undefined }));
							}}
						/>
					) : null}
				</div>
			</div>
		</div>
	) : null;
};
