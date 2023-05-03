import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";

import { ListPanel, Page, PageTitle, HeroPanel } from "../../components";

const Community: FC<{
	fns: {
		[key: string]: any;
	};
	D: { [key: string]: any };
	endpoint?: string;
}> = ({ fns, D, endpoint }) => {
	const [hItem, setHItem] = React.useState(0);
	return D && fns.calls ? (
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
						active: hItem === 0,
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
						onClick: () => setHItem(0),
					},
					{
						active: hItem === 1,
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
						onClick: () => setHItem(1),
					},
				]}
			/>
			<ListPanel
				Request={{
					type: hItem ? `dynasty` : `user`,
					search: hItem ? { limit: 8 } : { _managed: "Discord", limit: 8 },
				}}
				fns={fns}
				D={D}
				card={(c: any) => ({
					img: c.img,
					subtext: hItem ? c.name : c.username,
					onClick: () => null,
				})}
				line={false}
				constrain
			/>
			<Footer fns={fns} endpoint={endpoint} />
		</Page>
	) : null;
};

export default Community;
