import React, { FC } from "react";
import Button from "../button";
import Card from "../card";
import Timeline from "../timeline";
import Styles from "./styles";

export interface PropTypes {
	fns: any;
	Panel?: JSX.Element;
	title: string;
	panelImg: string;
	profileImg: string;
	timeline?: { bgVideo: string; elements: Array<{ [key: string]: any }> };
}

const ProfilePage: FC<PropTypes> = ({
	fns,
	Panel,
	title,
	panelImg,
	profileImg,
	timeline,
}) => {
	return (
		<div>
			<div className={`flex justify-end`}>
				<Button
					label={"Customize Page"}
					className={`mx-8`}
					// idleIcon={"gears"}
					type={"button"}
					size={"normal"}
					animation={true}
					onClick={(status: any) =>
						fns.setModal({ noescape: true, body: <div>Shalom</div> })
					}
				/>
			</div>
			<Styles.Container className={`relative flex justify-center`}>
				<Styles.ProfileImg className={`absolute bg-background-secondary`}>
					<img
						src={profileImg}
						className={`border-2 border-l-4 border-r-4 border-b-8 border-background-tertiary`}
					/>
				</Styles.ProfileImg>
				<Card
					max
					bgImg={panelImg}
					noBodyComponentAbsolute
					bodyComponent={
						<Styles.Content
							className={`mt-32 md:mt-60 mb-18 md:mb-24 flex flex-col space-y-0 w-full`}
						>
							<div className={`text-4xl md:text-6xl`}>{title}</div>
							{Panel}
						</Styles.Content>
					}
				/>
			</Styles.Container>
			{timeline ? (
				<Timeline bgVideo={timeline.bgVideo} elements={timeline.elements} />
			) : null}
		</div>
	);
};

export default ProfilePage;
