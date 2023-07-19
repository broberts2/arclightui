import React, { FC } from "react";
import Styles from "./styles";
import TextField from "../textfield";
import PickList from "../picklist";
import Button from "../button";
import FadeDivider from "../fadedivider";
import Checkbox from "../checkbox";
import CheckboxGroup from "../checkboxgroup";

export interface PropTypes {
	fns: {
		[key: string]: any;
	};
	D: {
		[key: string]: any;
	};
	form?: { [key: string]: any } | null;
	className?: string | object | null;
	locked?: boolean;
}

const Application: FC<PropTypes> = ({ className, fns, D, form, locked }) => {
	const [state, setState] = React.useState<{ [key: string]: any } | null>(null);
	const init = () => {
		if (!form) return;
		const _state = {};
		form.controls.map(
			(control: { [key: string]: any }, i: number) =>
				(_state[`${control.type}_${i}`] = {
					[control.values ? `values` : `value`]: control.value
						? control.value
						: control.values
						? control.values
						: undefined,
					required: control.required,
				})
		);
		setState(_state);
	};
	React.useEffect(init, [form]);
	return form && state ? (
		<Styles.Container
			className={className}
			mountAnim={{
				anim: "fadeIn",
				duration: "0.6s",
				delay: `0s`,
			}}
		>
			<Styles.Body>
				{form.backgroundimage ? (
					<Styles.BackgroundImage>
						<FadeDivider img={form.backgroundimage} />
					</Styles.BackgroundImage>
				) : null}
				<div className={`relative p-10`}>
					<Styles.TitleImg
						className={`w-96 h-96 ${
							form.titleimage ? `border-0 border-black` : ""
						}`}
					>
						{form.titleimage ? <img src={form.titleimage} /> : null}
					</Styles.TitleImg>
					<Styles.Title
						className={`text-text-primary font-primary text-6xl m-10`}
					>
						{form.title}
					</Styles.Title>
					<Styles.Description
						className={`text-black font-primary text-2xl m-10`}
					>
						{form.description}
					</Styles.Description>
					<Styles.Input className={`text-black font-primary text-1xl m-10`}>
						<Styles.Controls className={`mb-10`}>
							{form.controls
								? form.controls.map(
										(control: { [key: string]: any }, i: number) => {
											if (state[`${control.type}_${i}`]) {
												if (control.type === "textfield")
													return (
														<TextField
															span
															hot
															value={state[`${control.type}_${i}`].value}
															onChange={(e: any) => {
																if (locked) return;
																setState((s: any) => ({
																	...s,
																	[`${control.type}_${i}`]: {
																		...state[`${control.type}_${i}`],
																		value: e.target.value,
																	},
																}));
															}}
															type={"text"}
															key={i}
															label={`${
																control.label ? control.label : "Your Response"
															}${control.required ? ` (Required)` : ""}`}
															variant="standard"
														/>
													);
												else if (control.type === "textarea")
													return (
														<TextField
															multiline={true}
															rows={6}
															span
															hot
															value={state[`${control.type}_${i}`].value}
															onChange={(e: any) => {
																if (locked) return;
																setState((s: any) => ({
																	...s,
																	[`${control.type}_${i}`]: {
																		...state[`${control.type}_${i}`],
																		value: e.target.value,
																	},
																}));
															}}
															type={"text"}
															key={i}
															label={`${
																control.label ? control.label : "Your Response"
															}${control.required ? ` (Required)` : ""}`}
															variant="standard"
														/>
													);
												else if (control.type === "ul")
													return (
														<ul>
															{control.values.map((c: string) => (
																<li>&#x2022; {c}</li>
															))}
														</ul>
													);
												else if (control.type === "text")
													return (
														<Styles.Text className={`text-black font-primary`}>
															{control.value}
														</Styles.Text>
													);
												else if (control.type === "divide")
													return <div className={`mt-5 mb-5`} />;
												else if (control.type === "link")
													return (
														<div>
															<Styles.Link
																className={`font-primary`}
																href={control.href}
																target={"_blank"}
															>
																{control.value}
															</Styles.Link>
														</div>
													);
												else if (control.type === "picklist")
													return (
														<PickList
															keyname={i}
															D={D}
															fns={fns}
															disallowNone={false}
															multiple={false}
															span
															hot
															value={state[`${control.type}_${i}`].value}
															unlinked={true}
															list={control.values.map((value: string) => ({
																text: value,
																value,
															}))}
															onChange={(e: any) => {
																if (locked) return;
																setState((s: any) => ({
																	...s,
																	[`${control.type}_${i}`]: {
																		...state[`${control.type}_${i}`],
																		value: e.target.value,
																	},
																}));
															}}
															key={i}
															label={`${
																control.label ? control.label : "Your Response"
															}${control.required ? ` (Required)` : ""}`}
															variant="standard"
														/>
													);
												else if (control.type === "checkbox")
													return (
														<Checkbox
															value={false}
															onChange={(s) => {
																if (locked) return;
																return null;
															}}
														/>
													);
												else if (control.type === "checkboxgroup")
													return (
														<CheckboxGroup
															label={"(Required)"}
															values={control.values}
															onChange={(e: any) => {
																if (locked) return;
																const el = state[
																	`${control.type}_${i}`
																].values.find(
																	(checkbox: {
																		label: string;
																		value: boolean;
																	}) => checkbox.label === e.label
																);
																if (!el) return;
																setState((s: any) => ({
																	...s,
																	[`${control.type}_${i}`]: {
																		...state[`${control.type}_${i}`],
																		values: state[
																			`${control.type}_${i}`
																		].values.map((_el: any) =>
																			_el.label === el.label
																				? { ..._el, value: !el.value }
																				: _el
																		),
																	},
																}));
															}}
														/>
													);
											}
										}
								  )
								: null}
						</Styles.Controls>
						{!locked ? (
							<Button
								span={true}
								label={"Submit"}
								type={"button"}
								size={"md"}
								animation={true}
								disabled={
									false
									// form && form.controls
									// 	? form.controls.find(
									// 			(c: any, i: number) =>
									// 				c.required &&
									// 				state[`${c.type}_${i}`] &&
									// 				!state[`${c.type}_${i}`].value
									// 	  )
									// 	: false
								}
								block={false}
								rounded={false}
								square={false}
								isIconButton={false}
								onClick={(status: any) =>
									fns && fns.calls && fns.calls.createforms
										? fns.calls.createforms({
												...state,
												__template: form.__template,
										  })
										: null
								}
							/>
						) : null}
					</Styles.Input>
				</div>
			</Styles.Body>
		</Styles.Container>
	) : (
		<div className={`h-96`} />
	);
};

export default Application;
