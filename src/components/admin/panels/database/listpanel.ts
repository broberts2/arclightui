export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    listquery: (type: string, _id: string) => {
      if (fns.calls && fns.calls[`getrecords_${type}`]) {
        fns.calls[`getrecords_${type}`]({
          search: { _id },
        });
      }
    },
    title: `${xFormKey(key.replace(/_/g, ""))}`,
    backgroundImg:
      D && D.getdatamodels && D.getdatamodels.records && key !== "model"
        ? D.getdatamodels.records.find((m: any) => m._type === key).metaimg
        : `http://highmountainlabs.io/arclight/cdn/media/2.jpg`,
    controls: [
      {
        onClick: (el) => {
          updateState((_: any) => ({
            _id: el._id,
          }));
          fns.setAdminDomainState({
            ...fns.parseAdminDomainState(),
            activePanel: 1,
            id: el._id,
          });
        },
        type: "ListPanel",
        label: "Search",
      },
    ],
    onCreate:
      D &&
      D.getdatamodels &&
      D.getdatamodels.records &&
      key !== "permissions" &&
      (key !== "model"
        ? fns && fns.calls && fns.calls[`createrecords_${key}`]
        : true)
        ? () => {
            D.getdatamodels.records = D.getdatamodels.records.concat({
              _type: "model",
              type: "",
              text: "",
              icon: "",
              subicon: "",
              metaimg: "",
              category: "",
            });
            updateState((_: any) => ({
              _id: null,
            }));
            fns.setAdminDomainState({
              ...fns.parseAdminDomainState(),
              _id: null,
              activePanel: 1,
            });
          }
        : null,
  });
