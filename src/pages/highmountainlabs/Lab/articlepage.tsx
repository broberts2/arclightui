import React, { FC } from "react";
import { ArticlePage, Page } from "../../../components";
import init from "../../../projectcomponents/init";

const _ArticlePage: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  React.useEffect(() => init(fns, D), [fns]);
  return D && fns.calls && D.getarticles ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: `https://highmountainlabs.io/arclight/static/media/65e3b40035b8895019faa204.jpg`,
        opacity: 0.0,
      }}
    >
      <div className={`arclight-p-3 lg:arclight-p-32`}>
        <ArticlePage
          init={D.getarticles.records[0]}
          nopage={D.nopage}
          fns={fns}
          D={D}
          comments={true}
          views={true}
        />
      </div>
    </Page>
  ) : null;
};

export default _ArticlePage;
