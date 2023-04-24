import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";

import { ListPanel, Page, PageTitle, HeroPanel } from "../../components";

const Home: FC<{
	fns: {
		[key: string]: any;
	};
	D: { [key: string]: any };
	endpoint?: string;
}> = ({ fns, D, endpoint }) => {
	const [hItem, setHItem] = React.useState(1);
	return (
		<Page
			fns={fns}
			backgroundImage={{
				src: "https://1.bp.blogspot.com/-UIKkrj8xLGQ/XpNOHbpd9bI/AAAAAAABia0/DpgF7FitFeYxqIN3I05jisvYFbeq2ckjgCLcBGAsYHQ/s1600/2.png",
				opacity: 0.5,
			}}
		>
			<Header fns={fns} endpoint={endpoint} />
			<PageTitle
				orientation={"center"}
				text={"Community & Leaderboards"}
				fns={fns}
				img={"http://localhost:7000/static/media/test2.png"}
				bg={"http://localhost:7000/static/media/background2.mp4"}
				bgOffset={50}
			/>
			<HeroPanel
				small
				cards={[
					{
						active: hItem === 1,
						hoverComponent: (
							<div>
								<div className={`text-md`}>
									Individual player progression and achievements spanning all
									TES seasons
								</div>
							</div>
						),
						bgImg:
							D && D.getrecords_settings && D.getrecords_settings.settings
								? D.getrecords_settings.settings.find(
										(el: any) => el.name === "default"
								  ).legendimg
								: "",
						subText: "Legends",
						onClick: () => setHItem(1),
					},
					{
						active: hItem === 2,
						hoverComponent: (
							<div>
								<div className={`text-md`}>
									Team progression and achievements spanning all TES seasons
								</div>
							</div>
						),
						bgImg:
							D && D.getrecords_settings && D.getrecords_settings.settings
								? D.getrecords_settings.settings.find(
										(el: any) => el.name === "default"
								  ).dynastyimg
								: "",
						subText: "Dynasties",
						onClick: () => setHItem(2),
					},
				]}
			/>
			<ListPanel
				cards={[
					fns.e(D, `D.getrecords_user.user`, []).map((el: any) => ({
						bgImg: el.img,
						subText: el.username,
						onClick: () => fns.route("/profile"),
					})),
					fns.e(D, `D.getrecords_dynasty.dynasty`, []).map((el: any) => ({
						bgImg: el.img,
						subText: el.name,
						onClick: () => fns.route("/dynasty"),
					})),
				][hItem - 1].map((u: any) => ({
					bgImg: u.bgImg,
					subText: u.subText,
					onClick: u.onClick,
				}))}
				line={false}
				fns={fns}
				constrain
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	);
};

export default Home;
