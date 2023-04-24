import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
	title: string;
	message: string;
	bgImg?: string;
	button?: any;
}

const MissionStatement: FC<PropTypes> = ({ title, message, bgImg, button }) => {
	return (
		<Styles.Container className={"text-text-primary font-primary"}>
			{bgImg ? <Styles.BgImg src={bgImg} /> : null}
			<div
				className={`w-3/5 mx-24 xl:mx-96 xl:w-3/5 relative ${
					bgImg ? "bg-visibility-primary rounded-md p-10" : ""
				}`}
			>
				<div
					className={`${bgImg ? "text-xl" : "text-6xl"} ${
						bgImg ? "my-0" : "my-14"
					}`}
				>
					{title}
				</div>
				<div className={"text-md my-14"}>{message}</div>
				{button ? button : null}
			</div>
		</Styles.Container>
	);
};

export default MissionStatement;
