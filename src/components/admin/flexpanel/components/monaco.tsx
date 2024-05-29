export default (obj: any) => {
  return (
    <div
      className={`arclight-h-96 ${
        false ? `arclight-opacity-50 arclight-pointer-events-none` : ``
      }`}
    >
      <div className={`arclight-text-start arclight-text-sm`}>
        {obj.c.label}
      </div>
      <obj.Monaco
        refName={obj.c.label}
        language={"json"}
        defaultValue={
          obj.state[obj.c.label] && typeof obj.state[obj.c.label] === "string"
            ? obj.state[obj.c.label]
            : ""
        }
        state={obj.state}
        setState={obj.setState}
      />
    </div>
  );
};
