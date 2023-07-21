export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => ({
    title:
      currentState._id && D.getdatamodels && D.getdatamodels.records
        ? `${xFormKey(key.replace(/_/g, "")).slice(0, -1)}: ${(() => {
            const value = D.getdatamodels.records.find(
              (el: any) => el._id === currentState._id
            );
            const value2 = D[`getrecords_${key}`];
            return key === "model" && value && value.text
              ? value.text
              : value2 && value2.init
              ? setTitle(
                  D[`getrecords_${key}`].init.records.find(
                    (el: any) => el._id === currentState._id
                  )
                )
              : "";
          })().replace("*", "(Integration) ")}`
        : `Create ${xFormKey(key.replace(/_/g, ""))}`,
    backgroundImg: (() => {
      if (D && D.getdatamodels && D.getdatamodels.records && currentState._id) {
        if (key === "model") {
          const o = D.getdatamodels.records.find(
            (el: any) => el._id === currentState._id
          );
          if (o) return o.metaimg;
        } else if (D[`getrecords_${key}`] && D[`getrecords_${key}`].init) {
          const o = D[`getrecords_${key}`].init.records.find(
            (el: any) => el._id === currentState._id
          );
          if (o) return o.img;
        }
      }
    })(),
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
      D[`getrecords_${key}`] && key === "permissions"
        ? {
            key,
            type: D[`getrecords_${key}`].init.records.find(
              (el: any) => el._id === currentState._id
            ),
          }
        : null
    ),
    [currentState._id ? "onUpdate" : "onCreate"]: () => {
      try {
        delete currentState._items;
        if (currentState.MonacoRef) {
          const MonacoRef = currentState.MonacoRef;
          delete currentState.MonacoRef;
          Object.keys(MonacoRef).map(
            (k: string) =>
              (currentState[k] = JSON.stringify(
                JSON.parse(MonacoRef[k].current.getValue())
              ))
          );
        }
        fns.calls[
          `${currentState._id ? "update" : "create"}${
            key === "model" ? "datamodels" : `records_${key}`
          }`
        ](currentState);
        updateState((_: any) => ({
          ..._,
          _isLoading: true,
        }));
      } catch (e) {
        console.log(e);
      }
    },
    onPublicRead:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              publicread: !_.publicread,
            }))
        : null,
    onPublicCreate:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              publiccreate: !_.publiccreate,
            }))
        : null,
    onPublicEdit:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              publicedit: !_.publicedit,
            }))
        : null,
    onPublicDelete:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              publicdelete: !_.publicdelete,
            }))
        : null,
    onOwnerRead:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              ownerread: !_.ownerread,
            }))
        : null,
    onOwnerCreate:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              ownercreate: !_.ownercreate,
            }))
        : null,
    onOwnerEdit:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              owneredit: !_.owneredit,
            }))
        : null,
    onOwnerDelete:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              ownerdelete: !_.ownerdelete,
            }))
        : null,
    onRecursiveInit:
      key === "permissions"
        ? () =>
            updateState((_: any) => ({
              ..._,
              recursiveinit: !_.recursiveinit,
            }))
        : null,
    onAddField:
      key === "model"
        ? () => {
            const model = D.getdatamodels.records.find(
              (el: any) => el._id === currentState._id
            );
            if (model) {
              model["new_key"] = {
                _type: "String",
                unique: false,
                required: false,
              };
              updateState((_: any) => ({ ..._ }));
            }
          }
        : null,
    onDelete:
      currentState._id &&
      !isProtectedRecord(currentState) &&
      !currentState._system &&
      (key !== "model"
        ? fns && fns.calls && fns.calls[`deleterecords_${key}`]
        : true)
        ? () => {
            delete currentState._items;
            fns.calls[
              key === "model" ? "deletedatamodels" : `deleterecords_${key}`
            ](currentState);
            updateState((_: any) => ({
              ..._,
              _isLoading: true,
            }));
          }
        : null,
    onBack: () => {
      const _ = fns.parseAdminDomainState().item;
      fns.calls[_ === "model" ? "getdatamodels" : `getrecords_${_}`]({
        search: { limit: 32 },
      });
      fns.setAdminDomainState({
        ...fns.parseAdminDomainState(),
        activePanel: 0,
      });
    },
  });
