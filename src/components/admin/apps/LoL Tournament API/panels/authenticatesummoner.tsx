//@ts-nocheck
import React from "react";

const _SUMMONERKEY = "User";

export default (props: any) => {
  const [user, setUser] = React.useState(null);
  const [summonername, setSummonerName] = React.useState(null);
  React.useEffect(() => {
    if (!user) return;
    setSummonerName(user.summonername);
  }, [user]);
  const usermodeltype = props.fns.e(
    props.D,
    `D.getintegrations.LoL Tournament API.settings.usermodeltype`,
    null
  );
  React.useEffect(() => {
    if (
      usermodeltype &&
      props.D[`getrecords_${usermodeltype}`] &&
      !props.D[`getrecords_${usermodeltype}`][_SUMMONERKEY]
    )
      props.fns.calls[`getrecords_${usermodeltype}`]({
        index: _SUMMONERKEY,
        search: {
          skip: 0,
          limit: 10,
        },
      });
  }, [props.D]);
  return usermodeltype &&
    props.D &&
    props.D[`getrecords_${usermodeltype}`] &&
    props.D[`getrecords_${usermodeltype}`][_SUMMONERKEY] ? (
    <div className={`flex flex-col space-y-10`}>
      <props.Controls.PickList
        type={usermodeltype}
        D={props.D}
        fns={props.fns}
        span
        hot
        value={user}
        list={props.D[`getrecords_${usermodeltype}`][_SUMMONERKEY].records.map(
          (obj: any) => {
            const _: any = { value: obj._id };
            if (obj.name) _.text = obj.name;
            else if (obj.username) _.text = obj.username;
            else if (obj.text) _.text = obj.text;
            return _;
          }
        )}
        onChange={(e: any) => {
          return setUser(e.target.value);
        }}
        key={0}
        label={_SUMMONERKEY}
        variant="standard"
        searchkey={"username"}
      />
      <props.Controls.TextField
        span
        hot
        value={summonername && summonername.length ? summonername : ""}
        onChange={(e: any) => setSummonerName(e.target.value)}
        type={"text"}
        key={0}
        label={"Summoner Name"}
        variant="standard"
      />
      <props.Controls.Button
        span
        label={"Authenticate Summoner"}
        type={"button"}
        size={"md"}
        animation={true}
        disabled={false}
        block={false}
        rounded={false}
        square={false}
        isIconButton={false}
        onClick={(status: any) => {
          props.fns.calls.authenticatesummoner(
            user
              ? {
                  user,
                  summonername,
                }
              : {}
          );
          props.setState((_: any) => ({
            ..._,
            _isLoading: true,
          }));
        }}
      />
    </div>
  ) : null;
};
