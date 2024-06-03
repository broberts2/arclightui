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
  React.useEffect(() => {
    if (!D.identifyself && fns.calls.identifyself) fns.calls.identifyself();
  }, [fns]);
  return D && fns.calls && D.getarticles?.viewarticle ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: `https://highmountainlabs.io/arclight/static/media/65e3b40035b8895019faa204.jpg`,
        opacity: 0.0,
      }}
    >
      <div className={`arclight-p-3 lg:arclight-p-32`}>
        <ArticlePage
          commenter={D?.identifyself?.user}
          refresh={{
            index: "viewarticle",
            fn: fns.calls.getarticles,
          }}
          init={D.getarticles.viewarticle.records[0]}
          nopage={D.nopage}
          fns={fns}
          D={D}
          comments={true}
          views={true}
          commentfns={{
            createcomment: fns?.calls?.createrecords_articlecomment,
            editcomment: fns?.calls?.updaterecords_articlecomment,
            deletecomment: fns?.calls?.deleterecords_articlecomment,
            likecomment: fns?.calls?.likecomment,
            reportcomment: fns?.calls?.deleterecords_articlecomment,
          }}
        />
      </div>
    </Page>
  ) : null;
};

export default _ArticlePage;
