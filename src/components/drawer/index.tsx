import React, { FC } from "react";
import Styles from "./styles";
import Menu from "react-burger-menu";
import FontAwesome from "../fontawesome/index";
import Button from "../button";

interface ItemPropTypes {
	icon?: string;
	text?: string;
	onClick?: Function;
	items?: Array<{}> | null;
	isExpanded?: boolean | null;
	italic?: boolean;
	color?: string;
}

const Item: FC<ItemPropTypes> = ({
	icon,
	text,
	onClick,
	items,
	isExpanded,
	italic,
	color,
}) => {
	const [expanded, setExpanded] = React.useState(isExpanded);
	React.useEffect(() => setExpanded(isExpanded), [isExpanded]);
	return icon || text ? (
		<Styles.Item
			className={
				"flex items-center cursor-pointer font-primary text-text-primary text-left whitespace-nowrap z-20"
			}
		>
			<table className={"w-full"}>
				<tbody>
					<tr
						onClick={() => {
							if (items && (isExpanded === undefined || isExpanded === null))
								setExpanded(!expanded);
							if (onClick) onClick();
						}}
						className={`relative group ${italic ? "italic" : null}`}
						style={{ color }}
					>
						{items ? (
							<FontAwesome
								animation="none"
								icon={"arrow-right"}
								size="xs"
								className={`absolute -left-5 ${
									expanded ? `rotate-90` : `rotate-0`
								} transition-all duration-200 text-inherit`}
							/>
						) : null}
						{icon ? (
							<td className={"w-5"}>
								<FontAwesome
									animation="none"
									icon={icon}
									size="1x"
									className={"mr-2 text-inherit"}
								/>
							</td>
						) : null}
						{text ? (
							<td className={"text-left"}>
								<span className={"text-lg bold"}>{text}</span>
							</td>
						) : null}
						<div
							className={`left-0 bottom-0 absolute border-b-2 w-0 group-hover:w-full transition-all duration-200`}
						/>
					</tr>
					{items ? (
						<tr>
							<td>
								<div
									className={`${
										!expanded ? "scale-y-0 h-0" : null
									} w-0 transition-all duration-200 origin-top ${
										italic ? "italic" : null
									}`}
								>
									<div className={`scale-90 ml-4`}>
										{items
											// @ts-ignore
											.sort((a, b) =>
												// @ts-ignore
												a.text && b.text
													? // @ts-ignore
													  a.text < b.text
														? -1
														: 1
													: // @ts-ignore
													a.text && b.text
													? // @ts-ignore
													  a.icon < b.icon
														? -1
														: 1
													: null
											)
											.map((item: { [key: string]: any }) => (
												<Item
													items={item.items}
													icon={item.icon}
													text={item.text}
													onClick={() => item.onClick()}
												/>
											))}
									</div>
								</div>
							</td>
						</tr>
					) : null}
				</tbody>
			</table>
		</Styles.Item>
	) : null;
};

export interface PropTypes {
	startOpen?: boolean;
	locked?: boolean;
	animation: string;
	width?: string | number;
	buttonSide?: string;
	side?: string;
	className?: string | object;
	signOut?: Function;
	headerImg?: string;
	items?:
		| Array<{
				color?: string;
				italic?: boolean;
				isExpanded?: boolean | null;
				icon?: string;
				text?: string;
				onClick?: Function;
				items?: Array<{}> | null;
		  }>
		| {
				color?: string;
				italic?: boolean;
				isExpanded?: boolean | null;
				icon?: string;
				text?: string;
				onClick?: Function;
				items?: Array<{}> | null;
		  }
		| null;
}

const Drawer: FC<PropTypes> = ({
	locked,
	startOpen,
	animation,
	width,
	buttonSide,
	side,
	className,
	items,
	signOut,
	headerImg,
}) => {
	const [isOpen, setIsOpen] = React.useState(startOpen ? startOpen : false);
	// @ts-ignore
	const Component = Menu[animation && Menu[animation] ? animation : "slide"];
	return (
		<Styles.Container
			buttonSide={buttonSide}
			className={className ? className : null}
		>
			<Styles.Item buttonSide={buttonSide}>
				<Component
					right={side === "right"}
					width={width}
					isOpen={isOpen}
					onOpen={() => (!locked ? setIsOpen(true) : null)}
					onClose={() => (!locked ? setIsOpen(false) : null)}
					noOverlay={locked}
				>
					<Styles.Component className={``}>
						{headerImg ? (
							<img src={headerImg} className={`w-24 m-auto mb-10 mt-0`} />
						) : null}
						{items && Array.isArray(items) ? (
							items
								// @ts-ignore
								.sort((a, b) =>
									a.text && b.text
										? a.text < b.text
											? -1
											: 1
										: a.text && b.text
										? // @ts-ignore
										  a.icon < b.icon
											? -1
											: 1
										: null
								)
								.map((item) => (
									<Item
										color={item.color}
										italic={item.italic}
										isExpanded={item.isExpanded ? item.isExpanded : null}
										items={item.items}
										icon={item.icon}
										text={item.text}
										onClick={() => (item.onClick ? item.onClick() : null)}
									/>
								))
						) : items ? (
							<Item
								color={items.color}
								italic={items.italic}
								isExpanded={items.isExpanded ? items.isExpanded : null}
								items={items.items}
								icon={items.icon}
								text={items.text}
								onClick={() => (items.onClick ? items.onClick() : null)}
							/>
						) : null}
						{signOut ? (
							<Styles.SignOut className={`mt-8`}>
								<Button
									span={true}
									label={"Sign Out"}
									type={"button"}
									size={"md"}
									animation={true}
									onClick={(status: any) => (signOut ? signOut() : null)}
								/>
							</Styles.SignOut>
						) : null}
					</Styles.Component>
				</Component>
			</Styles.Item>
		</Styles.Container>
	);
};

export default Drawer;
