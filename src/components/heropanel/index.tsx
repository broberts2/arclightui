import React, { FC } from "react";
import Styles from "./styles";

import Card from "../card/index";

export interface PropTypes {
	left?: boolean | null;
	cards: Array<{
		bgImg: string;
		subText: string;
		onClick?: Function | null;
		locked?: string | boolean | null;
		hoverComponent?: JSX.Element | null;
		active?: boolean | null;
		onHover?: Function | null;
		onHoverLeave?: Function | null;
		bodyComponent?: JSX.Element | null;
	}>;
	autoSort?: boolean | null;
	small?: boolean | null;
	title?: string | null;
}

const HeroPanel: FC<PropTypes> = React.memo(
	({ cards, autoSort, small, title, left }) => {
		const className = `flex flex-col lg:flex-row w-full items-center justify-${
			left ? "start" : "center"
		} m-auto gap-7 lg:gap-7 xl:gap-7 my-7`;
		const [hItem, setHItem] = React.useState(-1);
		if (autoSort)
			cards = cards.sort((a, b) => (a.subText < b.subText ? -1 : 1));
		let row: any = [];
		const rows: any = [];
		rows.push(
			<div className={className}>
				<div className="text-text-primary font-primary text-3xl text-start">
					{title}
				</div>
			</div>
		);
		for (let i = 0; i < cards.length; i++) {
			if (i % 3 === 0 && i > 0) {
				rows.push(<div className={className}>{row}</div>);
				row = [];
			}
			row.push(
				<Card
					hover={{
						onMouseEnter: () => {
							//@ts-ignore
							if (cards[i].onHover) cards[i].onHover();
							setHItem(i);
						},
						onMouseLeave: () => {
							//@ts-ignore
							if (cards[i].onHover) cards[i].onHoverLeave();
							setHItem(-1);
						},
					}}
					active={
						cards[i].active !== null && cards[i].active !== undefined
							? cards[i].active || hItem === i
							: null
					}
					medium={small}
					hoverComponent={cards[i].hoverComponent}
					locked={cards[i].locked}
					bgImg={cards[i].bgImg}
					subText={cards[i].subText}
					bodyComponent={cards[i].bodyComponent}
					onClick={
						cards[i].onClick
							? //@ts-ignore
							  () => (cards[i].onClick ? cards[i].onClick() : null)
							: null
					}
				/>
			);
		}
		if (row.length > 0) rows.push(<div className={className}>{row}</div>);
		return <Styles.Container className={"lg:px-20"}>{rows}</Styles.Container>;
	}
);

export default HeroPanel;