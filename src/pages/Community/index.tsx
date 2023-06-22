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
				src: "https://images7.alphacoders.com/129/1293484.jpg",
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
							"https://dotesports.com/wp-content/uploads/wp-content/uploads/2022/10/11100052/LoR_3.17_Arclight_Patchnotes_Skin_Seraphine1_PCruz_V001.jpg",
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
							"https://prod.assets.earlygamecdn.com/images/ArclightEventLoR.jpg?mtime=1666009990",
						subText: "Dynasties",
						onClick: () => setHItem(1),
					},
				]}
			/>
			<ListPanel
				Request={{
					index: "community",
					type: hItem ? `dynasty` : `user`,
					search: hItem ? { limit: 32 } : { _managed: "Discord", limit: 32 },
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
