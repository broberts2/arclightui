import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
	rotation: number;
	img: string;
	ruby?: string | null;
}

const SlantedDivider: FC<PropTypes> = ({ rotation, img, ruby }) => {
	return (
		<Styles.Container
			className={`bg-gradient-to-b from-background-tertiary to to-transparent`}
		>
			<Styles.Divider
				rotation={rotation}
				className={"border-text-secondary border-b-2"}
			>
				<img src={img} width={"100%"} />
			</Styles.Divider>
			{ruby ? (
				<img
					src={ruby}
					className={`absolute bottom-24 lg:bottom-48 left-1/2 -translate-x-1/2 w-56 lg:w-96`}
				/>
			) : null}
		</Styles.Container>
	);
};

export default SlantedDivider;
