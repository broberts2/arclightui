import React, { FC } from "react";
import { useState, CSSProperties } from "react";
import { RingLoader } from "react-spinners";
import Styles from "./styles";

export interface PropTypes {
	loader: string;
	opacity: number;
}

const Spinner: FC<PropTypes> = ({ loader, opacity }) => {
	return (
		<Styles.Container
			className={`opacity-${opacity} duration-700 transition-all pointer-events-none`}
		>
			<Styles.Loader>
				<RingLoader color={"rgb(3, 252, 194)"} loading={true} size={175} />
			</Styles.Loader>
		</Styles.Container>
	);
};

export default Spinner;
