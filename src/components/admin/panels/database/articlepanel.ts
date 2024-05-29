export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    title: currentState._id ? `Edit Article` : `Create Article`,
    backgroundImg: `https://highmountainlabs.io/cdn/arclight/media/hml.jpg`,
    controls: [
      {
        type: "ArticlePage",
        label: "Article",
      },
    ],
    [currentState._id ? "onUpdate" : "onCreate"]: () => {
      if (!(fns && fns.calls && fns.calls[`createrecords_${key}`])) return;
      fns.calls[`${currentState._id ? "update" : "create"}${`records_${key}`}`](
        currentState[`Article`]
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
