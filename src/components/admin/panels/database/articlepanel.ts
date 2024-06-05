export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    title: currentState._id ? `Edit Article` : `Create Article`,
    backgroundImg: `https://highmountainlabs.io/cdn/arclight/media/hml.jpg`,
    // controls: [
    //   {
    //     type: "ArticlePage",
    //     label: "Article",
    //   },
    // ],
    controls: Constructors.constructFromDataModel(
      (() => {
        if (D && D.getdatamodels && D.getdatamodels.records) {
          const t = D.getdatamodels.records.find((el: any) =>
            key === "model" ? el._id === currentState._id : el._type === key
          );
          if (t && t._type) return t._type;
        }
        return key;
      })(),
      key === "model",
      D[`getrecords_${key}`] &&
        key === "permissions" &&
        D[`getrecords_${key}`].init
        ? {
            key,
            type: D[`getrecords_${key}`].init.records.find(
              (el: any) => el._id === currentState._id
            ),
          }
        : null
    )
      .filter((obj: any) => {
        switch (obj.label) {
          case "author":
            return;
          case "contentblocks":
            return;
          case "createddate":
            return;
          case "title":
            return;
          case "img":
            return;
        }
        return obj;
      })
      .concat({
        type: "ArticlePage",
        label: "Article",
      }),
    [currentState._id ? "onUpdate" : "onCreate"]: () => {
      console.log(currentState);
      if (!(fns && fns.calls && fns.calls[`createrecords_${key}`])) return;
      fns.calls[`${currentState._id ? "update" : "create"}${`records_${key}`}`](
        Object.assign(
          { ...currentState, Article: undefined },
          currentState[`Article`]
        )
      );
      updateState((_: any) => ({
        ..._,
        _isLoading: true,
      }));
      fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 1,
      });
    },
    onDelete:
      currentState._id &&
      !currentState._system &&
      fns &&
      fns.calls &&
      fns.calls[`deleterecords_${key}`]
        ? () => {
            delete currentState._items;
            fns.calls[`deleterecords_${key}`](currentState);
            updateState((_: any) => ({
              ..._,
              _isLoading: true,
            }));
            fns.setAdminDomainState({
              ...fns.parseAdminDomainState(),
              activePanel: 1,
            });
          }
        : null,
    onBack: () => {
      const _ = fns.parseAdminDomainState().item;
      fns.calls[`getrecords_${_}`]({
        search: { limit: 32 },
      });
      fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 0,
      });
    },
  });
