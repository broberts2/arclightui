export default (
  c: { [key: string]: any },
  i: Number,
  Calendar: any,
  state: { [key: string]: any },
  setState: Function,
  D: any,
  fns: any
) => {
  return (
    <div className={``}>
      <Calendar
        script={c.script}
        type={!c.script ? "admin" : undefined}
        D={D}
        fns={fns}
        defaultEventBgImg={`https://titanesports.org:7000/static/media/tesbg.png`}
        events={[]}
      />
    </div>
  );
};
