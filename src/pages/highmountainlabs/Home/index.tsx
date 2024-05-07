import React, { FC } from "react";
import { Page } from "../../../components";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  return D && fns.calls ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: `https://highmountainlabs.io/arclight/static/media/65e3b40035b8895019faa204.jpg`,
        opacity: 0.0,
      }}
    >
      <div
        className={`arclight-h-screen arclight-flex arclight-pointer-events-none`}
      >
        <div
          className={`arclight-m-auto arclight-text-center arclight-flex-col arclight-space-y-3`}
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
