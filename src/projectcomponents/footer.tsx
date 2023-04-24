import React, { FC } from "react";
import { Footer } from "../components";

const F: FC<{
	fns: {
		[key: string]: any;
	};
	endpoint?: string;
}> = ({ fns, endpoint }) => (
	<Footer
		logoSrc={`${endpoint}/static/media/TES-logo.png`}
		text={"Titan Esports"}
	/>
);

export default F;
