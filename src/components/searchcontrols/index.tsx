import React, { FC } from "react";
import Styles from "./styles";
import Button from "../button";
import TextField from "../textfield";

export interface PropTypes {
	textField: any;
	buttons?: Array<{
		icon?: string | null;
		text?: string | null;
		key?: string | null;
		onClick?: Function | null;
	}> | null;
	className?: string | null;
	children: JSX.Element | JSX.Element[];
	constrain?: boolean;
	onChange?: Function;
	hot?: boolean;
	pagination?: any;
	btnActive?: number;
	setBtnActive?: Function;
	search?: any;
	picklist?: boolean;
}

const SearchControls: FC<PropTypes> = ({
	textField,
	onChange,
	buttons,
	className,
	children,
	constrain,
	hot,
	pagination,
	btnActive,
	setBtnActive,
	search,
	picklist,
}) => {
	const a = pagination ? pagination.skip * pagination.length + 1 : null;
	const b = pagination
		? pagination.skip * pagination.length + pagination.length
		: null;
	const c = pagination ? pagination.totalcount : null;
	const bb = pagination ? (b > c ? c : b) : null;
	return (
		<Styles.Container
			picklist={picklist}
			className={`text-text-primary font-primary ${className}`}
		>
			{textField ? (
				<div style={{ textAlign: "left" }}>
					<TextField
						value={textField?.value}
						hot={hot}
						onChange={(data: string) => {
							if (textField && textField.onChange) textField.onChange(data);
						}}
						type={"text"}
						key={1}
						label={textField.label}
						variant="standard"
					/>
				</div>
			) : null}
			{buttons && search ? (
				<React.Fragment>
					<div className={`flex flex-row`}>
						<Button
							label={"Search"}
							idleIcon={null}
							type={"button"}
							size={"normal"}
							animation={true}
							className={`hidden m-1 lg:block`}
							onClick={() =>
								search ? search.onSubmit("username", textField?.value) : null
							}
						/>
						<Button
							label={"Search"}
							idleIcon={null}
							type={"button"}
							size={"small"}
							animation={true}
							className={`block m-1 lg:hidden`}
							onClick={() =>
								search ? search.onSubmit("username", search.value) : null
							}
						/>
						<div className={`hidden flex-row justify-end w-full lg:flex`}>
							{buttons.map((b: any, i) => (
								<Button
									label={b.text ? b.text : null}
									idleIcon={b.icon ? b.icon : null}
									type={"button"}
									size={"normal"}
									animation={true}
									className={`m-1 ${i === btnActive ? "" : "opacity-30"}`}
									onClick={() => {
										if (setBtnActive) setBtnActive(i);
										b.onClick();
									}}
								/>
							))}
						</div>
						<div className={`flex flex-row justify-end w-full lg:hidden`}>
							{buttons.map((b: any, i) => (
								<Button
									label={null}
									idleIcon={b.icon ? b.icon : null}
									type={"button"}
									size={"small"}
									animation={true}
									className={`m-1 ${i === btnActive ? "" : "opacity-30"}`}
									onClick={() => {
										if (setBtnActive) setBtnActive(i);
										b.onClick();
									}}
								/>
							))}
						</div>
					</div>
				</React.Fragment>
			) : null}
			<Styles.Children
				className={`relative z-0`}
				style={{ height: `${!constrain ? `100%` : null}` }}
			>
				{children}
			</Styles.Children>
			<div
				className={`absolute w-full pointer-events-none bottom-0`}
				style={{
					top: constrain ? "100%" : "125%",
					display: Array.isArray(children) && children.length > 1 ? "" : "",
				}}
			>
				{pagination && pagination.totalcount ? (
					<div className={`flex items-center justify-center`}>
						<Button
							className={"hidden m-1 lg:block pointer-events-auto"}
							style={
								pagination.skip > 0
									? {}
									: { opacity: 0.3, pointerEvents: "none" }
							}
							label={"Last"}
							idleIcon={"arrow-left"}
							type={"button"}
							size={"normal"}
							animation={true}
							onClick={(status: any) => pagination.onClick(-1)}
						/>
						<Button
							className={"block m-1 lg:hidden pointer-events-auto"}
							style={
								pagination.skip > 0
									? {}
									: { opacity: 0.3, pointerEvents: "none" }
							}
							label={"Last"}
							idleIcon={"arrow-left"}
							type={"button"}
							size={"small"}
							animation={true}
							onClick={(status: any) => pagination.onClick(-1)}
						/>
						<Button
							className={"hidden m-1 lg:block pointer-events-auto"}
							style={
								(pagination.skip + 1) * pagination.length <
								pagination.totalcount
									? {}
									: { opacity: 0.3, pointerEvents: "none" }
							}
							label={"Next"}
							idleIcon={"arrow-right"}
							type={"button"}
							size={"normal"}
							animation={true}
							onClick={(status: any) => pagination.onClick(1)}
						/>
						<Button
							className={"block m-1 lg:hidden pointer-events-auto"}
							style={
								(pagination.skip + 1) * pagination.length <
								pagination.totalcount
									? {}
									: { opacity: 0.3, pointerEvents: "none" }
							}
							label={"Next"}
							idleIcon={"arrow-right"}
							type={"button"}
							size={"small"}
							animation={true}
							onClick={(status: any) => pagination.onClick(1)}
						/>
					</div>
				) : null}
				{pagination && pagination.totalcount ? (
					<div className="text-center pointer-events-auto">
						<div className={"text-text-primary font-primary text-lg"}>
							Showing {a}-{bb} of {c}
						</div>
					</div>
				) : null}
			</div>
		</Styles.Container>
	);
};

export default SearchControls;
