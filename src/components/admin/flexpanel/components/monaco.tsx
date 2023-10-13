export default (
  c: { [key: string]: any },
  i: Number,
  Monaco: any,
  state: { [key: string]: any },
  setState: Function
) => {
  return (
    <div
      className={`arclight-h-96 ${
        false ? `arclight-opacity-50 arclight-pointer-events-none` : ``
      }`}
    >
      <div className={`arclight-text-start arclight-text-sm`}>{c.label}</div>
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
