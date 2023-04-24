import React, { FC } from "react";
import Styles from "./styles";
import Button from "../button";
import TextField from "../textfield";

export interface PropTypes {
	textField?: {
		label?: string | null;
		value?: string;
	} | null;
	buttons?: Array<{
		icon?: string | null;
		text?: string | null;
		onClick?: Function | null;
	}> | null;
	className?: string | null;
	fns?: {
		[key: string]: Function;
	};
	children: JSX.Element | JSX.Element[];
	constrain?: boolean;
	onChange?: Function;
	hot?: boolean;
}

const SearchControls: FC<PropTypes> = ({
	textField,
	onChange,
	buttons,
	className,
	fns,
	children,
	constrain,
	hot,
}) => {
	return (
		<Styles.Container className={`text-text-primary font-primary ${className}`}>
			{textField ? (
				<div style={{ textAlign: "left" }}>
					<TextField
						value={textField?.value}
						hot={hot}
						onChange={(data: string) => {
							console.log("test");
							if (onChange) onChange(data);
						}}
						type={"text"}
						key={1}
						label={textField.label}
						variant="standard"
					/>
				</div>
			) : null}
			{buttons ? (
				<React.Fragment>
					<div className={`flex flex-row`}>
						<Button
							label={"Search"}
							idleIcon={null}
							type={"button"}
							size={"normal"}
							animation={true}
							className={`hidden m-1 lg:block`}
						/>
						<Button
							label={"Search"}
							idleIcon={null}
							type={"button"}
							size={"small"}
							animation={true}
							className={`block m-1 lg:hidden`}
						/>
						<div className={`hidden flex-row-reverse w-full lg:flex`}>
							{buttons.map((b) => (
								<Button
									label={b.text ? b.text : null}
									idleIcon={b.icon ? b.icon : null}
									type={"button"}
									size={"normal"}
									animation={true}
									className={`m-1`}
								/>
							))}
						</div>
						<div className={`flex flex-row-reverse w-full lg:hidden`}>
							{buttons.map((b) => (
								<Button
									label={null}
									idleIcon={b.icon ? b.icon : null}
									type={"button"}
									size={"small"}
									animation={true}
									className={`m-1`}
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
				className={`absolute w-full pointer-events-none`}
				style={{
					top: constrain ? "100%" : "125%",
					display:
						Array.isArray(children) && children.length > 48 ? "" : "none",
				}}
			>
				<div className={`flex items-center justify-center`}>
					<Button
						className={"hidden m-1 lg:block pointer-events-auto"}
						label={"Last"}
						idleIcon={"arrow-left"}
						type={"button"}
						size={"normal"}
						animation={true}
						onClick={(status: any) =>
							fns ? fns.routeExternal(`https://discord.gg/kuWyKDxkR7`) : null
						}
					/>
					<Button
						className={"block m-1 lg:hidden pointer-events-auto"}
						label={"Last"}
						idleIcon={"arrow-left"}
						type={"button"}
						size={"small"}
						animation={true}
						onClick={(status: any) =>
							fns ? fns.routeExternal(`https://discord.gg/kuWyKDxkR7`) : null
						}
					/>
					<Button
						className={"hidden m-1 lg:block pointer-events-auto"}
						label={"Next"}
						idleIcon={"arrow-right"}
						type={"button"}
						size={"normal"}
						animation={true}
						onClick={(status: any) =>
							fns ? fns.routeExternal(`https://discord.gg/kuWyKDxkR7`) : null
						}
					/>
					<Button
						className={"block m-1 lg:hidden pointer-events-auto"}
						label={"Next"}
						idleIcon={"arrow-right"}
						type={"button"}
						size={"small"}
						animation={true}
						onClick={(status: any) =>
							fns ? fns.routeExternal(`https://discord.gg/kuWyKDxkR7`) : null
						}
					/>
				</div>
				<div className="text-center pointer-events-auto">
					<div className={"text-text-primary font-primary text-lg"}>
						Showing 1-48 of 2590
					</div>
				</div>
			</div>
		</Styles.Container>
	);
};

export default SearchControls;
