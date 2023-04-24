import React, { FC } from "react";
import Styles from "./styles";

import Card from "../card";
import SearchControls from "../searchcontrols";
import Button from "../button";

export interface PropTypes {
	constrain?: boolean;
	cards: Array<{
		bgImg: string;
		subText: string;
		onClick?: Function | null;
		locked?: string | null;
		hoverComponent?: JSX.Element | null;
	}>;
	autoSort?: boolean | null;
	line?: boolean | null;
	fns?: {
		[key: string]: Function;
	} | null;
}

const mountAnim = (i: number) => ({
	anim: "flipInY",
	duration: "0.35s",
	delay: `${0.05 * i}s`,
});

const listpanel: FC<PropTypes> = React.memo(
	({ cards, autoSort, line, constrain, fns }) => {
		const OldCards = React.useRef(cards);
		const [sCards, setSCards] = React.useState(<div />);
		const [nPerRow, setNPerRow] = React.useState(8);
		if (autoSort)
			cards = cards.sort((a, b) => (a.subText < b.subText ? -1 : 1));
		let row: any = [];
		const rows: any = [];
		if (!line) {
			for (let i = 0; i < cards.length; i++) {
				if (i % nPerRow === 0 && i > 0) {
					rows.push(
						<div
							className={
								"flex flex-row w-full items-center justify-center m-auto gap-4 my-4"
							}
						>
							{row}
						</div>
					);
					row = [];
				}
				row.push(
					<Card
						mountAnim={mountAnim(i)}
						index={i + 1}
						small
						hoverComponent={cards[i].hoverComponent}
						locked={cards[i].locked}
						bgImg={cards[i].bgImg}
						subText={cards[i].subText}
						onClick={
							cards[i].onClick
								? //@ts-ignore
								  () => (cards[i].onClick ? cards[i].onClick() : null)
								: null
						}
					/>
				);
			}
			if (row.length) {
				for (let i = row.length; i < nPerRow; i++) {
					row.push(<div style={{ width: `10rem` }} />);
				}
				rows.push(
					<div
						className={
							"flex flex-row w-full items-center justify-center m-auto gap-4 my-4"
						}
					>
						{row}
					</div>
				);
			}
		} else {
			for (let i = 0; i < cards.length; i++) {
				rows.push(
					<Card
						mountAnim={mountAnim(i)}
						index={i + 1}
						line
						hoverComponent={cards[i].hoverComponent}
						locked={cards[i].locked}
						bgImg={cards[i].bgImg}
						subText={cards[i].subText}
						onClick={
							cards[i].onClick
								? //@ts-ignore
								  () => (cards[i].onClick ? cards[i].onClick() : null)
								: null
						}
					/>
				);
			}
		}
		const handleResize = () => {
			const _ = window.innerWidth;
			if (_ > 1280) setNPerRow(8);
			else if (_ > 1024) setNPerRow(8);
			else if (_ > 768) setNPerRow(4);
			else if (_ > 604) setNPerRow(3);
			else setNPerRow(2);
		};
		window.addEventListener("resize", handleResize);
		React.useEffect(handleResize, []);
		React.useEffect(() => {
			// setSCards(<div />);
			// setTimeout(() => setSCards(rows), 1);
			setSCards(rows);
		}, [cards]);
		return (
			<Styles.Container
				className={`${
					constrain
						? `w-4/5 max-w-screen-xl m-auto`
						: `w-full flex flex-col flex-1`
				}`}
			>
				<SearchControls
					constrain={constrain}
					textField={{ label: "Search" }}
					buttons={[
						{
							icon: "crown",
							text: "Titan Points",
							onClick: () => console.log("clicked"),
						},
						{
							icon: "crown",
							text: "Titan Points",
							onClick: () => console.log("clicked"),
						},
					]}
					className={``}
				>
					{sCards}
				</SearchControls>
			</Styles.Container>
		);
	}
);

export default listpanel;
