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
				src: "https://images.alphacoders.com/128/1287104.jpg",
				opacity: 0.5,
			}}
		>
			<Header fns={fns} endpoint={endpoint} />
			<PageTitle
				orientation={"center"}
				text={"Teams & Statistics"}
				fns={fns}
				img={"http://localhost:7000/static/media/katarina.png"}
				bg={"http://localhost:7000/static/media/background2.mp4"}
				bgOffset={50}
			/>
			<HeroPanel
				small
				cards={fns
					.e(D, `D.getrecords_lolleague.lolleague`, [])
					.map((league: { [key: string]: any }, i) => ({
						active: hItem === i + 1,
						locked: league.locked,
						hoverComponent: (
							<div>
								<div className={`text-md`}>{league.name} Teams</div>
							</div>
						),
						bgImg: league.img,
						subText: league.name,
						onClick: () => setHItem(i + 1),
					}))}
			/>
			<ListPanel
				key={hItem}
				cards={[
					fns
						.e(D, `D.getrecords_team.team`, [])
						.filter((t: any) => t.league === "divinity")
						.map((el: any) => ({
							bgImg: el.img,
							subText: el.name,
							onClick: () => fns.route("/team"),
						})),
					fns
						.e(D, `D.getrecords_team.team`, [])
						.filter((t: any) => t.league === "conqueror")
						.map((el: any) => ({
							bgImg: el.img,
							subText: el.name,
							onClick: () => fns.route("/team"),
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
