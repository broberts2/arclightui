export default (obj: any) => {
  if (!obj.state[obj.c.label]) {
    if (obj?.state?._id && obj?.D?.getrecords_article?.init) {
      obj.state[obj.c.label] = obj.D.getrecords_article.init.records.find(
        (r: any) => r._id === obj.state._id
      );
    } else {
      obj.state[obj.c.label] = {
        title: "New Article Title",
        img: "https://highmountainlabs.io/cdn/arclight/media/article.jpg",
        contentBlocks: {
          0: {
            title: "Block Title 1",
            value: "",
          },
        },
      };
    }
  }
  return (
    <div className={``}>
      <obj.ArticlePage
        edit
        init={obj.state[obj.c.label]}
        nopage={obj.D.nopage}
        googledoc={null}
        author={null}
        fns={obj.fns}
        D={obj.D}
        bannerImg={null}
        className={`-mt-24 lg:-mt-44`}
        ruby={null}
        cb={(st: any) => {
          obj.setState((_: any) => ({
            ..._,
            [obj.c.label]: st,
          }));
        }}
      />
    </div>
  );
};
