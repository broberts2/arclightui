import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, HeroPanel, ListPanel, PageTitle } from "../../components";

const Staff: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const [hItem, setHItem] = React.useState(1);
  React.useEffect(() => {
    fns.setQueryParams({ t: hItem === 1 ? "articles" : "podcasts" });
  }, [hItem]);
  return D && fns.calls ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: "",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      <PageTitle
        orientation={"center"}
        text={"Content"}
        fns={fns}
        img={""}
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
                  Staff generated articles and written content.
                </div>
              </div>
            ),
            bgImg: "",
            subText: "Articles",
            onClick: () => setHItem(1),
          },
          {
            active: hItem === 2,
            hoverComponent: (
              <div>
                <div className={`text-md`}>
                  Staff generated podcasts and talk shows.
                </div>
              </div>
            ),
            bgImg: "",
            subText: "Podcasts",
            onClick: () => setHItem(2),
          },
        ]}
      />
      <ListPanel
        key={hItem}
        Request={{
          index: "content",
          type: hItem === 1 ? `article` : `lolpodcast`,
          search: { limit: 32, skip: 0 },
        }}
        fns={fns}
        D={D}
        card={(c: any) => ({
          img: c.img,
          subtext: c.name,
          onClick: () =>
            hItem === 1 ? fns.route(`/article?id=${c._id}`) : null,
        })}
        line={false}
        constrain
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Staff;
