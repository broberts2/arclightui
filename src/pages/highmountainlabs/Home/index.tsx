import React, { FC } from "react";
import { ArticlePage, Page } from "../../../components";
import init from "../../../projectcomponents/init";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  React.useEffect(() => init(fns, D), [fns]);
  console.log(D);
  return D && fns.calls && D.getrecords_settings ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: D.getrecords_settings.init.records[0].highmountainlabsbg,
        opacity: 0.5,
      }}
    >
      <div className={`arclight-h-screen arclight-flex`}>
        <div
          className={`arclight-m-auto arclight-text-center arclight-flex-col arclight-space-y-3 arclight-pointer-events-none`}
        >
          <img
            src={`https://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png`}
            className={`arclight-w-56 arclight-m-auto`}
          />
          <div className={`arclight-text-2xl`}>Highmountain Labs</div>
        </div>
      </div>
    </Page>
  ) : null;
};

export default Home;
