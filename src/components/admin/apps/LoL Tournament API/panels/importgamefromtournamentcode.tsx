//@ts-nocheck
import React from "react";
import fns from "../../../../app/fns";

//NA04bd3-82682ed3-2fda-4bdd-899b-ea9ec22f69d2
export default (props: any) => {
  const [code, setCode] = React.useState(null);
  React.useEffect(() => {
    if (
      props.fns.calls &&
      props.fns.calls.getintegrations &&
      props.D &&
      !props.D.getintegrations
    )
      props.fns.calls.getintegrations();
  });
  return (
    <div className={`arclight-flex arclight-flex-col arclight-space-y-10`}>
      <props.Controls.TextField
        span
        hot
        value={code}
        onChange={(e: any) => setCode(e.target.value)}
        type={"text"}
        key={0}
        label={"Tournament Code"}
        variant="standard"
      />
      <props.Controls.Button
        span
        label={"Import Game"}
        type={"button"}
        size={"md"}
        animation={true}
        disabled={false}
        block={false}
        rounded={false}
        square={false}
        isIconButton={false}
        onClick={(status: any) => {
          props.fns.calls.importgamefromtournamentcode({
            code,
          });
          props.setState((_: any) => ({
            ..._,
            _isLoading: true,
          }));
        }}
      />
    </div>
  );
};
