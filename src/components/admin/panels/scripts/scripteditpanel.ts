export default (xFormKey: any, setTitle: any, isProtectedRecord: any) =>
  (D: any, Constructors: any, fns: any, key: string, endpoint: string) =>
  (currentState: { [key: string]: any }, updateState: Function) => {
    const ss = fns.parseAdminDomainState().selectedscript;
    return {
      title: ss ? `Edit Script` : `Create Script`,
      backgroundImg: `http://highmountainlabs.io/arclight/cdn/media/2.jpg`,
      controls: [{ type: "ScriptMonaco", label: "Z", onClick: () => null }],
      [ss ? `onUpdate` : `onCreate`]: () => {
        return fns.calls[ss ? `updatescripts` : "createscripts"]({
          script: ss,
          type: currentState.scriptkey,
          ctx: fns.parseAdminDomainState().script,
          value:
            currentState.MonacoRef[
              currentState.scriptkey ? currentState.scriptkey : "Metadata"
            ].current.getValue(),
        });
      },
      onDelete: () => {
        return fns.calls.deletescripts({
          ctx: fns.parseAdminDomainState().script,
          value: currentState.MonacoRef.Metadata.current.getValue(),
        });
      },
      onBack: () =>
        fns.setAdminDomainState({
          ...fns.parseAdminDomainState(),
          activePanel: 1,
          selectedscript: undefined,
        }),
      onLog: fns.calls.getlogs ? () => fns.calls.getlogs() : null,
      onExecute: fns.calls.executescripts
        ? () => fns.calls.executescripts(fns.parseAdminDomainState())
        : null,
    };
  };
