import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
	ruby?: string;
	fadeOpacity?: number;
}

const FadeDivider: FC<PropTypes> = ({ ruby, fadeOpacity }) => {
	return (
		<Styles.Container>
			<Styles.BackgroundFade
				className={`bg-gradient-to-b from-background-tertiary to to-transparent`}
				style={{ opacity: fadeOpacity }}
			/>
			{ruby ? (
				<img
					src={ruby}
					className={`absolute bottom-24 lg:bottom-48 left-1/2 -translate-x-1/2 w-56 lg:w-96`}
				/>
			) : null}
		</Styles.Container>
	);
};

export default FadeDivider;
