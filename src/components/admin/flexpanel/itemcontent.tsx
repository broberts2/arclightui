import Checkbox from "../../checkbox";

const ChkBox = (props: { v: boolean; a: Function; t: string }) => (
	<div
		className={`text-text-primary font-primary text-base flex justify-start`}
	>
		<div className={`m-auto`}>
			<Checkbox
				value={props.v}
				onChange={(b: boolean, cb: Function) => props.a()}
			/>
		</div>
		<div className={`m-auto`}>{props.t}</div>
	</div>
);

export default (props: any) => {
	return (
		<props.Styles.ItemContent
			className={`w-full h-full rounded ${
				props.constrain ? "max-w-xl" : null
			} p-5 max-h-full`}
		>
			<div className={"flex justify-center items-center w-full h-full"}>
				<div className={"w-full space-y-8 h-full"}>
					<div
						className={`flex justify-start w-full space-y-4`}
						style={{ maxHeight: "85%", minHeight: "85%" }}
					>
						<div className={`w-full space-y-4`}>
							{props.children}
							{[
								{ c: "onPublicRead", s: "publicread" },
								{ c: "onPublicWrite", s: "publicwrite" },
								{ c: "onPublicCreate", s: "publiccreate" },
								{ c: "onPublicDelete", s: "publicdelete" },
							]
								.filter((o: { c: string; s: string }) => props[o.c])
								.map((o: { c: string; s: string }) => (
									<div
										className={`w-full ${
											props.state[o.s] ? `opacity-100` : `opacity-30`
										}`}
									>
										<props.Bttn
											t={o.s}
											a={() =>
												props[o.c]((s: Object) =>
													props.setState((_: Object) => ({ ..._, ...s }))
												)
											}
											span={true}
										/>
									</div>
								))}
						</div>
					</div>
					<div className={`flex flex-row w-full`}>
						<div className={`flex justify-start space-x-2 w-1/3`}>
							{[{ fn: "onRecursiveInit", t: "Recursive Init" }]
								.filter((el) => props[el.fn])
								.map((el) => (
									<ChkBox
										v={props.state.recursiveinit}
										t={el.t}
										a={() =>
											props[el.fn]((s: Object) =>
												props.setState((_: Object) => ({ ..._, ...s }))
											)
										}
									/>
								))}
						</div>
						<div className={`flex justify-end space-x-2 w-full`}>
							{[
								{ fn: "onExecute", t: "Execute" },
								{ fn: "onLog", t: "Log" },
								{ fn: "onAddField", t: "Add Field" },
								{ fn: "onCreate", t: "Create" },
								{ fn: "onSubmit", t: "Submit" },
								{ fn: "onUpdate", t: "Update" },
								{ fn: "onDelete", t: "Delete" },
								{ fn: "onBack", t: "Back" },
							]
								.filter(
									(el) => props[el.fn] && !(props.state && props.state.onDelete)
								)
								.map((el) => (
									<props.Bttn
										t={el.t}
										a={() =>
											props[el.fn]((s: Object) =>
												props.setState((_: Object) => ({ ..._, ...s }))
											)
										}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		</props.Styles.ItemContent>
	);
};
