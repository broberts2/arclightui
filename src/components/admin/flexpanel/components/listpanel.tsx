export default (
  listquery: Function,
  C: { [key: string]: any },
  i: any,
  ListPanel: any,
  state: { [key: string]: any },
  setState: Function,
  fns: any,
  D: any
) => {
  if (!D.getdatamodels) return;
  const keyarr = ["username"];
  const type = fns.parseAdminDomainState().item;
  let key = D.getdatamodels.records.find((r: any) => r._type === type);
  if (key) {
    key = (() => {
      for (let i = 0; i < keyarr.length; i++) {
        if (key[keyarr[i]]) {
          return (key = keyarr[i]);
        }
      }
      return "name";
    })();
  } else key = "_type";
  return (
    <div style={{ height: "100%" }}>
      <ListPanel
        controls={[
          {
            icon: "diamond",
            text: key,
            key,
          },
        ]}
        loadwatcher={fns.parseAdminDomainState().activePanel}
        Request={{
          type,
          search: { limit: 32, skip: 0 },
          local: C.cards,
        }}
        fns={fns}
        D={C.cards ? { [type]: { records: C.cards } } : D}
        card={(c: any) => {
          return type === "model"
            ? {
                managed: c._managed,
                img: c.metaimg,
                subtext: c._type,
                onClick: () => {
                  if (C.onClick) C.onClick(c);
                  else c.onClick(c);
                  if (listquery) listquery(type, c._id);
                },
              }
            : {
                managed: c._managed,
                img: c.img,
                subtext: c.name || c.username,
                onClick: () => {
                  if (C.onClick) C.onClick(c);
                  else c.onClick(c);
                  if (listquery) listquery(type, c._id);
                },
              };
        }}
        line={false}
        constrain
      />
    </div>
  );
};
