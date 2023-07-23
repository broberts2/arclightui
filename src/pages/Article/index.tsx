import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, ArticlePage } from "../../components";

const Article: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  let article = fns.e(D, `D.getrecords_article.init`, null);
  if (article)
    article = article.records.find(
      (e: any) => e._id === fns.readState().query.id
    );
  return article ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: "https://coolhdwall.com/storage/2203/lol-wild-rift-2022-lunar-new-year-2k-wallpaper-2560x1440-24.jpg",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      <ArticlePage
        nopage={D.nopage}
        googledoc={article ? article.googledoc : null}
        author={article ? article.author.username : null}
        fns={fns}
        bannerImg={article ? article.img : null}
        className={`-mt-24 lg:-mt-44`}
        ruby={article ? article.displayicon : null}
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Article;
