import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
	logoSrc: string;
	text: string;
}

const Footer: FC<PropTypes> = ({ logoSrc, text }) => {
	return (
		<Styles.Container
			className={
				"flex flex-row w-full h-20 mt-36 p-5 justify-center items-center space-x-10 text-text-primary bg-background-secondary font-primary"
			}
		>
			<img src={logoSrc} className={"h-full"} />
			<div className={"text-x"}>
				{text} © {new Date().getFullYear()}
			</div>
		</Styles.Container>
	);
};

export default Footer;
