export default (obj: any) => {
  let f;
  const s = obj.fns.parseAdminDomainState();
  const k =
    obj.D &&
    s.formtemplate &&
    (s.formname || s.item === "Form Template") &&
    obj.D[s.item === "Form Template" ? "getformtemplates" : "getforms"] &&
    obj.D[s.item === "Form Template" ? "getformtemplates" : "getforms"].records;
  if (k)
    s.item === "Form Template"
      ? (f = obj.D.getformtemplates.records.find(
          (r: any) => r.__template === `${s.formtemplate}.json`
        ))
      : (f = obj.D.getforms.records[s.formtemplate][s.formname]);
  return k && f ? (
    <div
      className={
        false ? `arclight-opacity-50 arclight-pointer-events-none` : ``
      }
    >
      <obj.Application
        locked={
          true || obj.fns.parseAdminDomainState().item !== "Form Template"
        }
        D={obj.D}
        fns={obj.fns}
        form={f}
        className={`arclight-rounded-sm`}
      />
    </div>
  ) : null;
};
