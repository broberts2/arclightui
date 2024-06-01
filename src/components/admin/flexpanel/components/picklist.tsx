export default (obj: any, multiple?: boolean) => {
  const dblist =
    (obj.c.adminlookup &&
      obj.c.D[obj.c.adminlookup] &&
      obj.c.D[obj.c.adminlookup][obj.c.label] &&
      obj.c.D[obj.c.adminlookup][obj.c.label].records) ||
    (obj.c.lookup &&
      obj.c.D[`getrecords_${obj.c.lookup}`] &&
      obj.c.D[`getrecords_${obj.c.lookup}`][obj.c.label] &&
      obj.c.D[`getrecords_${obj.c.lookup}`][obj.c.label].records);
  const _pL = (i: number) => (
    <div
      className={
        false ? `arclight-opacity-50 arclight-pointer-events-none` : ``
      }
    >
      <obj.PickList
        script={obj.c.adminlookup}
        type={obj.c.lookup}
        D={obj.D}
        fns={obj.fns}
        disallowNone={obj.c.type === "Boolean"}
        multiple={multiple}
        span
        hot
        value={
          obj.state[obj.c.label] !== undefined &&
          obj.state[obj.c.label] !== null &&
          Array.isArray(obj.state[obj.c.label])
            ? obj.state[obj.c.label]
            : !multiple
            ? obj.state[obj.c.label]
            : []
        }
        unlinked={obj.c.type === "Boolean"}
        list={
          obj.c.type === "Boolean"
            ? [
                { text: "true", value: true },
                { text: "false", value: false },
              ]
            : obj.c && obj.c.D && dblist
            ? dblist.map((obj: any) => {
                const _: any = { value: obj._id };
                if (obj.name) _.text = obj.name;
                else if (obj.username) _.text = obj.username;
                else if (obj.text) _.text = obj.text;
                else if (obj.title) _.text = obj.title;
                return _;
              })
            : []
        }
        onChange={(e: any) => {
          return obj.setState((_: any) => ({
            ..._,
            [obj.c.label]: e.target.value,
          }));
        }}
        key={i}
        label={obj.c.label}
        variant="standard"
        searchkey={(() => {
          if (!obj.c || !obj.c.searchkey) return;
          const arr = ["username", "name", "text", "title"];
          for (let i = 0; i < arr.length; i++) {
            if (obj.c.searchkey[arr[i]]) return arr[i];
          }
        })()}
      />
    </div>
  );
  return obj.state[obj.c.label] ? _pL(obj.i) : _pL(obj.i + 1);
};
