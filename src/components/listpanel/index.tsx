import React, { FC } from "react";
import Styles from "./styles";

import Card from "../card";
import SearchControls from "../searchcontrols";
import Button from "../button";

export interface PropTypes {
	constrain?: boolean;
	autoSort?: boolean | null;
	line?: boolean | null;
	fns: any;
	Request: { type: string; search: any };
	card: Function;
	D: any;
}

const mountAnim = (i: number) => ({
	anim: "flipInY",
	duration: "0.35s",
	delay: `${0.05 * i}s`,
});

const ListPanel: FC<PropTypes> = ({
	autoSort,
	line,
	constrain,
	fns,
	Request,
	card,
	D,
}) => {
	const [sCards, setSCards] = React.useState(<div />);
	const [nPerRow, setNPerRow] = React.useState(8);
	const [skip, setSkip] = React.useState(0);
	const [btnActive, setBtnActive] = React.useState(0);
	const [searchValue, setSearchValue] = React.useState("");
	let cards = fns
		.e(D, `D.getrecords_${Request.type}.${Request.type}`, { records: [] })
		.records.map((_: any) => card(_));
	if (autoSort) cards = cards.sort((a, b) => (a.subText < b.subText ? -1 : 1));
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
					bgImg={cards[i].img}
					subText={cards[i].subtext}
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
		else setNPerRow(3);
	};
	window.addEventListener("resize", handleResize);
	React.useEffect(handleResize, []);
	React.useEffect(() => {
		setSCards(rows);
	}, [D]);
	React.useEffect(() => {
		setSkip(0);
		setBtnActive(0);
		if (fns.calls && fns.calls[`getrecords_${Request.type}`])
			fns.calls[`getrecords_${Request.type}`]({
				search: { ...Request.search, skip: 0 },
			});
	}, [Request.type]);
	return (
		<Styles.Container
			className={`${
				constrain
					? `w-4/5 max-w-screen-xl m-auto`
					: `w-full flex flex-col flex-1`
			}`}
		>
			<SearchControls
				hot={true}
				pagination={Object.assign(
					fns.e(D, `D.getrecords_${Request.type}.${Request.type}`, {
						records: [],
					}),
					{
						skip,
						length: Request.search.limit ? Request.search.limit : undefined,
						onClick: (n: number) => {
							setSkip(skip + n);
							setSCards(<div />);
							fns.calls[`getrecords_${Request.type}`]({
								search: {
									...Request.search,
									skip:
										(skip + n) *
										(Request.search.limit ? Request.search.limit : 1),
								},
							});
						},
					}
				)}
				constrain={constrain}
				textField={{
					label: "Search",
					value: searchValue,
					onChange: (e: any) => setSearchValue(e.target.value),
				}}
				btnActive={btnActive}
				setBtnActive={(n: number) => setBtnActive(n)}
				search={{
					onSubmit: (key, $regex) => {
						const _ = key && $regex ? { [key]: { $regex, $options: "i" } } : {};
						fns.calls[`getrecords_${Request.type}`]({
							search: {
								...Request.search,
								..._,
							},
						});
					},
				}}
				buttons={
					[
						// {
						// 	icon: "diamond",
						// 	text: "Username",
						// 	key: "username",
						// 	onClick: () => console.log("clicked"),
						// },
					]
				}
				className={``}
			>
				{sCards}
			</SearchControls>
		</Styles.Container>
	);
};

export default ListPanel;
