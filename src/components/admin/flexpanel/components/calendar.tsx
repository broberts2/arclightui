export default (obj: any) => {
  return (
    <div className={``}>
      <obj.Calendar
        script={obj.c.script}
        type={!obj.c.script ? "admin" : undefined}
        D={obj.D}
        fns={obj.fns}
        defaultEventBgImg={`https://titanesports.org:7000/static/media/tesbg.png`}
        events={[]}
      />
    </div>
  );
};
