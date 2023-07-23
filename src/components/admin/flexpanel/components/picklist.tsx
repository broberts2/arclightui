export default (
  c: { [key: string]: any },
  i: any,
  PickList: any,
  state: { [key: string]: any },
  setState: Function,
  D: any,
  fns: any,
  multiple?: boolean
) => {
  return (
    <div className={false ? `opacity-50 pointer-events-none` : ``}>
      <PickList
        type={c.lookup}
        D={D}
        fns={fns}
        disallowNone={c.type === "Boolean"}
        multiple={multiple}
        span
        hot
        value={
          state[c.label] !== undefined &&
          state[c.label] !== null &&
          Array.isArray(state[c.label])
            ? state[c.label]
            : !multiple
            ? state[c.label]
            : []
        }
        unlinked={c.type === "Boolean"}
        list={
          c.type === "Boolean"
            ? [
                { text: "true", value: true },
                { text: "false", value: false },
              ]
            : c &&
              c.D &&
              c.lookup &&
              c.D[`getrecords_${c.lookup}`] &&
              c.D[`getrecords_${c.lookup}`][c.label] &&
              c.D[`getrecords_${c.lookup}`][c.label].records
            ? c.D[`getrecords_${c.lookup}`][c.label].records.map((obj: any) => {
                const _: any = { value: obj._id };
                if (obj.name) _.text = obj.name;
                else if (obj.username) _.text = obj.username;
                else if (obj.text) _.text = obj.text;
                return _;
              })
            : []
        }
        onChange={(e: any) => {
          return setState((_: any) => ({
            ..._,
            [c.label]: e.target.value,
          }));
        }}
        key={i}
        label={c.label}
        variant="standard"
        searchkey={(() => {
          if (!c || !c.searchkey) return;
          if (c.searchkey["username"]) return "username";
          else if (c.searchkey["name"]) return "name";
        })()}
      />
    </div>
  );
};
