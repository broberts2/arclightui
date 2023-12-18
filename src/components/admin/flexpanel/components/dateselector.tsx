export default (
  c: { [key: string]: any },
  i: Number,
  DateSelector: any,
  state: { [key: string]: any },
  setState: Function
) => {
  return (
    <div className={`arclight-text-left`}>
      <div className={`arclight-text-xs`}>{c.label}</div>
      <DateSelector
        onChange={(e: any) =>
          setState((_: any) => ({
            ..._,
            [c.label]: e.target.value,
          }))
        }
      />
    </div>
  );
};
