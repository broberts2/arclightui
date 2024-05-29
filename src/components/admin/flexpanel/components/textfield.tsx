export default (obj: any) => {
  return obj.state._id && obj.state[obj.c.label] ? (
    <div
      className={
        false ? `arclight-opacity-50 arclight-pointer-events-none` : ``
      }
    >
      <obj.TextField
        span
        hot
        defaultValue={
          obj.state[obj.c.label] !== null &&
          obj.state[obj.c.label] !== undefined
            ? obj.state[obj.c.label]
            : ""
        }
        onChange={(e: any) =>
          obj.setState((_: any) => ({
            ..._,
            [obj.c.label]: e.target.value,
          }))
        }
        type={"text"}
        key={obj.state._id}
        label={obj.c.label}
        variant="standard"
      />
    </div>
  ) : (
    <div
      className={
        false ? `arclight-opacity-50 arclight-pointer-events-none` : ``
      }
    >
      <obj.TextField
        span
        hot
        defaultValue={null}
        onChange={(e: any) =>
          obj.setState((_: any) => ({
            ..._,
            [obj.c.label]: e.target.value,
          }))
        }
        type={"text"}
        key={obj.i}
        label={obj.c.label}
        variant="standard"
      />
    </div>
  );
};
