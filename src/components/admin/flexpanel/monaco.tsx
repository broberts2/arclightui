export default (
  c: { [key: string]: any },
  i: Number,
  Monaco: any,
  state: { [key: string]: any },
  setState: Function
) => {
  return (
    <div className={`h-96 ${false ? `opacity-50 pointer-events-none` : ``}`}>
      <div className={`text-start text-sm`}>{c.label}</div>
      <Monaco
        refName={c.label}
        language={"json"}
        defaultValue={
          state[c.label] && typeof state[c.label] === "string"
            ? state[c.label]
            : ""
        }
        state={state}
        setState={setState}
      />
    </div>
  );
};
