import FileLoader from "../../../fileloader";

export default (
  state: { [key: string]: any },
  setState: Function,
  D: any,
  fns: any,
  operation: string
) => {
  return (
    <div
      className={`arclight-w-full arclight-h-full arclight-flex arclight-justify-center arclight-items-center`}
    >
      <FileLoader fns={fns} D={D} operation={operation} id={state._id} />
    </div>
  );
};
