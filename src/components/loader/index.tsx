import React, { FC } from "react";
import Styles from "./styles";

import { ClipLoader } from "react-spinners";

export interface PropTypes {
	loading: boolean;
}

const Loader: FC<PropTypes> = ({ loading }) => {
	return (
		<Styles.Container className={`${loading ? `opacity-100` : `opacity-0`}`}>
			<ClipLoader
				color={"red"}
				loading={true}
				size={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</Styles.Container>
	);
};

export default Loader;
