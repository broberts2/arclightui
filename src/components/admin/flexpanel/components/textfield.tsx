export default (
	c: { [key: string]: any },
	i: Number,
	TextField: any,
	state: { [key: string]: any },
	setState: Function
) => {
	return (
		<div className={false ? `opacity-50 pointer-events-none` : ``}>
			<TextField
				span
				hot
				defaultValue={
					state[c.label] !== null && state[c.label] !== undefined
						? state[c.label]
						: ""
				}
				onChange={(e: any) =>
					setState((_: any) => ({
						..._,
						[c.label]: e.target.value,
					}))
				}
				type={"text"}
				key={i}
				label={c.label}
				variant="standard"
			/>
		</div>
	);
};
