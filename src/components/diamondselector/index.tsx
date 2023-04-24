import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
	items: Array<{ bgImg: string }>;
	bgElement: string;
	callback?: Function | null;
	defaultSelection?: number;
	offset?: number | null;
}

const Card: FC<PropTypes> = ({
	items,
	bgElement,
	callback,
	defaultSelection,
	offset,
}) => {
	const [selected, setSelected] = React.useState(
		defaultSelection ? defaultSelection : 0
	);
	const [focus, setFocus] = React.useState(
		defaultSelection ? defaultSelection : 0
	);
	return (
		<Styles.Container
			onMouseLeave={() => setSelected(0)}
			className={`border-2 lg:border-2 border-background-tertiary`}
		>
			{bgElement ? (
				<Styles.BgElement src={bgElement} autoPlay muted loop />
			) : null}
			{[
				{ l: "50%", t: "0%", r: null, b: null },
				{ l: "0%", t: "50%", r: null, b: null },
				{ l: null, t: "50%", r: "0%", b: null },
				{ l: "50%", t: null, r: null, b: "0%" },
			]
				.map((el, i) =>
					items[i] ? (
						<Styles.DiamondWrapper
							left={el.l}
							top={el.t}
							right={el.r}
							bottom={el.b}
							translate={`translate(-${el.l ? el.l : el.r}, -${
								el.t ? el.t : el.b
							})`}
						>
							<Styles.Diamond
								className={` border-background-tertiary border-2 lg:border-2`}
								lg={false}
								onMouseEnter={() => setSelected(i + 1)}
								onClick={() => {
									if (callback) callback(i + (offset ? offset : 0));
									setFocus(i + 1);
								}}
								focus={focus}
								i={i}
								selected={selected}
							>
								<Styles.DiamondContent>
									{items[i] && items[i].bgImg ? (
										<Styles.Image src={items[i].bgImg} />
									) : null}
								</Styles.DiamondContent>
							</Styles.Diamond>
						</Styles.DiamondWrapper>
					) : null
				)
				.filter((el) => el)}
		</Styles.Container>
	);
};

export default Card;
