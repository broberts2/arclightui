export default (
  c: { [key: string]: any },
  i: Number,
  Application: any,
  state: { [key: string]: any },
  setState: Function,
  fns: any,
  D: any
) => {
  let f;
  const s = fns.parseAdminDomainState();
  const k =
    D &&
    s.formtemplate &&
    (s.formname || s.item === "Form Template") &&
    D[s.item === "Form Template" ? "getformtemplates" : "getforms"] &&
    D[s.item === "Form Template" ? "getformtemplates" : "getforms"].records;
  if (k)
    s.item === "Form Template"
      ? (f = D.getformtemplates.records.find(
          (r: any) => r.__template === `${s.formtemplate}.json`
        ))
      : (f = D.getforms.records[s.formtemplate][s.formname]);
  return k && f ? (
    <div className={false ? `opacity-50 pointer-events-none` : ``}>
      <Application
        locked={true || fns.parseAdminDomainState().item !== "Form Template"}
        D={D}
        fns={fns}
        form={f}
        className={`rounded-sm`}
      />
    </div>
  ) : null;
};
