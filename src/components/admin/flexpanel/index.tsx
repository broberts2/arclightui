import React, { FC } from "react";
import Styles from "./styles";
import Button from "../../button";
import TextField from "../../textfield";
import FontAwesome from "../../fontawesome/index";
import ListPanel from "../../listpanel";
import PickList from "../../picklist";
import Loader from "../../loader";
import Checkbox from "../../checkbox";
import HeroPanel from "../../heropanel";
import Monaco from "../../monaco";
import textfield from "./textfield";
import dynamicfield from "./dynamicfield";
import listpanel from "./listpanel";
import picklist from "./picklist";
import monaco from "./monaco";
import integrationelector from "./integrationselector";
import integrationconfiguration from "./integrationconfiguration";
import scriptconfiguration from "./scriptconfiguration";
import app from "./app";

export interface PropTypes {
	className?: string | object;
	items: any;
	cols: number;
	callresolved: number;
	D: any;
	searchOn: string;
	noSelect?: string;
	fns: { [key: string]: any };
	publicURI: string;
}

const Bttn = (props: { a: Function; t: string; span?: boolean }) => (
	<Button
		span={props.span}
		label={props.t}
		type={"button"}
		size={"md"}
		animation={true}
		disabled={false}
		block={false}
		rounded={false}
		square={false}
		isIconButton={false}
		onClick={(status: any) => props.a()}
	/>
);

const ItemContent = (props: any) => {
	return (
		<Styles.ItemContent
			className={`w-full h-full rounded ${
				props.constrain ? "max-w-xl" : null
			} p-10`}
		>
			<div className={"flex justify-center items-center w-full h-full"}>
				<div className={"w-full space-y-8 h-full"}>
					<div
						className={`flex justify-start w-full space-y-4 overflow-y-auto`}
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
										<Bttn
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
					<div className={`flex justify-end w-full space-x-2`}>
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
								<Bttn
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
		</Styles.ItemContent>
	);
};

const SubItem = (props: any) => {
	return (
		<Styles.Item
			className={`bg-background-primary w-full h-full rounded p-5 ${props.className}`}
			mountAnim={{ anim: "fadeIn", duration: "0.35s" }}
		>
			<Styles.BgImg
				src={
					props.backgroundImg
						? props.backgroundImg
						: "http://localhost:7000/static/integrationsart/daedalus.jpg"
				}
			/>
			<div className={`w-full h-full`}>
				{props.title ? (
					<div className={`font-primary text-4xl`}>{props.title}</div>
				) : null}
				<ItemContent {...props}>{props.children}</ItemContent>
			</div>
		</Styles.Item>
	);
};

const Item = (props: any) => {
	const t = React.useRef();
	const [item, setItem] = React.useState(<div />);
	React.useEffect(() => {
		if (props.title !== t.current) setItem(<div />);
		setTimeout(() => setItem(<SubItem {...props} />), 1);
		t.current = props.title;
	}, [props]);
	return (
		<td
			className={`p-2 ${
				props.active
					? `${
							props.waiting ? `opacity-30 pointer-events-none` : `opacity-100`
					  } scale-100`
					: `hidden`
			} transition-all duration-300 flex-1 w-full h-full`}
			align={"center"}
		>
			{item}
		</td>
	);
};

const FlexPanel: FC<PropTypes> = ({
	className,
	items,
	cols,
	callresolved,
	D,
	searchOn,
	noSelect,
	fns,
	publicURI,
}) => {
	const activePanel = fns.parseAdminDomainState().activePanel;
	const setCardTitle = (s: string) => {
		return s;
	};
	const defState: { [key: string]: any } = {
		_isLoading: false,
		_id: fns.parseAdminDomainState().id ? fns.parseAdminDomainState().id : null,
	};
	const [state, setState] = React.useState(defState);
	state._items = items.map((fn: any) => fn(state, setState));
	const [colNum, setColNum] = React.useState(cols);
	const resize = (n: number) => {
		if (n < 768) setColNum(1);
		else if (n < 1280) setColNum(2);
		else setColNum(cols);
	};
	const rows: any = [];
	let row: any = [];
	for (let i = 0; i < state._items.length; i++) {
		state[`_waitingItems${state._items[i].bound}`] = false;
		if (state._items.bound && state._items[i].boundOpen)
			state[`_showingItems${state._items[i].bound}`] = true;
		if (i % colNum === 0 && i > 0) {
			rows.push(<tr>{row}</tr>);
			row = [];
		}
		const map: { [key: string]: number } = {};
		row.push(
			<Item
				fns={fns}
				constrain={state._items[i].constrain}
				title={state._items[i].title}
				state={state}
				backgroundImg={state._items[i].backgroundImg}
				setState={(s: Object) => setState(s)}
				onCreate={state._items[i].onCreate}
				onSubmit={state._items[i].onSubmit}
				onUpdate={state._items[i].onUpdate}
				onDelete={state._items[i].onDelete}
				onBack={state._items[i].onBack}
				onAddField={state._items[i].onAddField}
				onExecute={state._items[i].onExecute}
				onLog={state._items[i].onLog}
				onPublicRead={state._items[i].onPublicRead}
				active={
					state._items[i].bound
						? state[`_showingItems${state._items[i].bound}`]
						: cols === 0
						? activePanel === i
						: true
				}
				// waiting={state[`_waitingItems${items[1].bound}`]}
			>
				{state._items[i].bound ? (
					<FontAwesome
						size={"lg"}
						icon={"chain"}
						className={`absolute top-5 right-5 lg:top-10 lg:right-10`}
					/>
				) : null}
				{state._items[i].controls
					? state._items[i].controls.map((c: any) => {
							if (c) {
								if (
									D &&
									c &&
									c.label &&
									state &&
									state._id &&
									state[c.label] === undefined &&
									(searchOn === "model"
										? D.getdatamodels
										: D[`getrecords_${searchOn}`])
								) {
									const v =
										D && D[`getdatamodels`]
											? D[`getdatamodels`].find(
													(el: any) => el._id === state._id
											  )
											: null;
									if (searchOn === "model") {
										if (v && v[c.label])
											state[c.label] =
												typeof v[c.label] === "object"
													? {
															key: c.label,
															type: v[c.label]._type,
															lookup: c.lookup,
															required: c.required,
															system: v._system,
													  }
													: v[c.label];
										if (v) state._system = v._system;
									} else if (
										D[`getrecords_${searchOn}`] &&
										D[`getrecords_${searchOn}`][searchOn]
									) {
										const value = D[`getrecords_${searchOn}`][searchOn].find(
											(el: any) => el._id === state._id
										);
										if (value) state[c.label] = value[c.label];
									}
								}
								switch (c.type) {
									case "Monaco":
										return monaco(c, i, Monaco, state, setState);
									case "Boolean":
										return picklist(c, i, PickList, state, setState);
									case "App":
										return app(state, setState, D, fns, publicURI);
									case "TextField":
										return textfield(c, i, TextField, state, setState);
									case "TextFieldNumber":
										return (
											<div className={``}>
												<TextField
													span
													hot
													value={state[c.label]}
													onChange={(e: any) =>
														setState((_: any) => ({
															..._,
															[c.label]:
																e.target.value && e.target.value.length > 0
																	? parseInt(e.target.value)
																	: null,
														}))
													}
													type={"text"}
													key={i}
													label={c.label}
													variant="standard"
												/>
											</div>
										);
									case "PasswordField":
										return (
											<TextField
												span
												hot
												value={state[c.label]}
												onChange={(e: any) =>
													setState((_: any) => ({
														..._,
														[c.label]: e.target.value,
													}))
												}
												type={"password"}
												key={i}
												label={c.label}
												variant="standard"
											/>
										);
									case "SinglePickList":
										return picklist(c, i, PickList, state, setState);
									case "PickList":
										return picklist(c, i, PickList, state, setState, true);
									case "ListPanel":
										c.cards.map(
											(c: any) => (c.subText = setCardTitle(c.subText))
										);
										return listpanel(c, i, ListPanel, state, setState);
									case "DynamicField":
										return dynamicfield(
											c,
											i,
											TextField,
											PickList,
											Checkbox,
											Bttn,
											state,
											setState,
											D
										);
									case "IntegrationSelector":
										return integrationelector(
											c,
											i,
											HeroPanel,
											state,
											setState,
											fns,
											D,
											publicURI
										);
									case "IntegrationMonaco":
										return integrationconfiguration(
											c,
											i,
											Monaco,
											state,
											setState,
											fns,
											D
										);
									case "ScriptMonaco":
										return scriptconfiguration(
											c,
											i,
											Monaco,
											state,
											setState,
											fns,
											D
										);
								}
							}
					  })
					: null}
			</Item>
		);
	}
	if (row && row.length > 0) rows.push(<tr>{row}</tr>);
	React.useEffect(() => {
		if (callresolved) {
			if (callresolved > 1) {
				fns.setAdminDomainState({
					...fns.parseAdminDomainState(),
					activePanel: fns.parseAdminDomainState().activePanel - 1,
				});
				if (state._primemodal) state._primemodal(D);
			}
			setState((_: any) => ({
				..._,
				_id: callresolved < 2 ? _._id : null,
				_isLoading: false,
				_primemodal: undefined,
			}));
		}
	}, [callresolved]);
	React.useEffect(() => {
		resize(window.innerWidth);
		window.addEventListener("resize", (n: any) => {
			const _ = n.currentTarget.innerWidth;
			resize(_);
		});
	}, []);
	return (
		<Styles.Container
			className={`p-2 ${state._isLoading ? "pointer-events-none" : null}`}
		>
			{rows && row && row.length ? (
				<Styles.Table className={`h-full text-text-primary font-primary`}>
					<tbody>{rows}</tbody>
				</Styles.Table>
			) : noSelect ? (
				<Styles.NoSelect mountAnim={{ anim: "fadeIn", duration: "0.5s" }}>
					<img
						src={noSelect}
						className={"w-1/2 md:w-1/4 m-auto justify-center align-middle"}
					/>
				</Styles.NoSelect>
			) : null}
			<Loader loading={state._isLoading} />
		</Styles.Container>
	);
};

export default FlexPanel;
