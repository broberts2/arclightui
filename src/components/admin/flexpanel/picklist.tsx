export default (
  c: { [key: string]: any },
  i: any,
  PickList: any,
  state: { [key: string]: any },
  setState: Function,
  multiple?: boolean
) => {
  if (c.type === "Boolean") console.log(c);
  return (
    <div className={false ? `opacity-50 pointer-events-none` : ``}>
      <PickList
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
        list={
          c.type === "Boolean"
            ? [
                { text: "true", value: true },
                { text: "false", value: false },
              ]
            : c && c.D && c.lookup && c.D[`getrecords_${c.lookup}`]
            ? c.D[`getrecords_${c.lookup}`][c.lookup].map((obj: any) => ({
                text: obj.name ? obj.name : obj.username ? obj.username : null,
                value: obj._id,
              }))
            : []
        }
        onChange={(e: any) =>
          setState((_: any) => ({
            ..._,
            [c.label]: e.target.value,
          }))
        }
        key={i}
        label={c.label}
        variant="standard"
      />
    </div>
  );
};
