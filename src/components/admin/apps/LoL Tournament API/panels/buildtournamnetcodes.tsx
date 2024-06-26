import React from "react";

export default (props: any) => {
  let TEAMS_LIST = undefined;
  const [state, setState] = React.useState({
    league: null,
    team1: null,
    team2: null,
    count: null,
    weekNum: null,
    seasonNum: null,
    MonacoRef: {},
  });
  React.useEffect(() => {
    if (
      props.fns.calls &&
      props.fns.calls.getintegrations &&
      props.D &&
      !props.D.getintegrations
    )
      props.fns.calls.getintegrations();
  });
  if (
    props.D &&
    props.D.getintegrations &&
    props.D.getintegrations["LoL Tournament API"] &&
    props.D.getintegrations["LoL Tournament API"].overrides.teamlookup &&
    props.D.getintegrations["LoL Tournament API"].overrides.teamlookup.length
  )
    TEAMS_LIST =
      props.D.getintegrations["LoL Tournament API"].overrides.teamlookup;
  return props.D &&
    props.D.getintegrations &&
    props.D.getintegrations["LoL Tournament API"] ? (
    <div className={`arclight-flex arclight-flex-col arclight-space-y-10`}>
      {[
        {
          type: props.D.getintegrations["LoL Tournament API"].settings
            .leaguemodeltype,
          value: "league",
          label: "League Selection",
        },
        {
          type: props.D.getintegrations["LoL Tournament API"].settings
            .teammodeltype,
          value: "team1",
          label: "Team 1 Selection",
        },
        {
          type: props.D.getintegrations["LoL Tournament API"].settings
            .teammodeltype,
          value: "team2",
          label: "Team 2 Selection",
        },
      ].map((el: any) => (
        <props.Controls.PickList
          script={
            TEAMS_LIST && el.value.includes("team") ? TEAMS_LIST : undefined
          }
          keyname={"name"}
          searchkey={"name"}
          type={el.type}
          D={props.D}
          fns={props.fns}
          span
          hot
          value={state[el.value]}
          list={
            props.D &&
            props.D[
              TEAMS_LIST && el.value.includes("team")
                ? TEAMS_LIST
                : `getrecords_${el.type}`
            ] &&
            props.D[
              TEAMS_LIST && el.value.includes("team")
                ? TEAMS_LIST
                : `getrecords_${el.type}`
            ][el.label] &&
            props.D[
              TEAMS_LIST && el.value.includes("team")
                ? TEAMS_LIST
                : `getrecords_${el.type}`
            ][el.label].records
              ? props.D[
                  TEAMS_LIST && el.value.includes("team")
                    ? TEAMS_LIST
                    : `getrecords_${el.type}`
                ][el.label].records.map((obj: any) => {
                  const _: any = { value: obj._id };
                  _.text = obj.name;
                  return _;
                })
              : []
          }
          onChange={(e: any) =>
            setState((_: any) => ({
              ..._,
              [el.value]: e.target.value,
            }))
          }
          key={0}
          label={el.label}
          variant="standard"
        />
      ))}
      <props.Controls.PickList
        unlinked
        span
        hot
        value={state.count}
        list={[1, 3, 5, 7].map((value: number) => ({
          text: `${value}`,
          value,
        }))}
        onChange={(e: any) =>
          setState((_: any) => ({
            ..._,
            count: e.target.value,
          }))
        }
        key={0}
        label={"Code Count"}
        variant="standard"
      />
      <props.Controls.TextField
        defaultValue={
          props.D.getintegrations["LoL Tournament API"].settings.defaultseason
        }
        span
        hot
        value={state.seasonNum}
        onChange={(e: any) =>
          setState((_: any) => ({
            ..._,
            seasonNum: parseInt(e.target.value),
          }))
        }
        type={"text"}
        key={0}
        label={"Season Number"}
        variant="standard"
      />
      <props.Controls.TextField
        defaultValue={
          props.D.getintegrations["LoL Tournament API"].settings.defaultweek
        }
        span
        hot
        value={state.weekNum}
        onChange={(e: any) =>
          setState((_: any) => ({
            ..._,
            weekNum: parseInt(e.target.value),
          }))
        }
        type={"text"}
        key={0}
        label={"Week Number"}
        variant="standard"
      />
      <props.Controls.Button
        span
        label={"Generate Tournament Codes"}
        type={"button"}
        size={"md"}
        animation={true}
        disabled={false}
        block={false}
        rounded={false}
        square={false}
        isIconButton={false}
        onClick={(status: any) => {
          props.fns.calls.generatetournamentcodes({
            ...state,
            seasonNum: state.seasonNum
              ? state.seasonNum
              : props.D.getintegrations["LoL Tournament API"].settings
                  .defaultseason,
            weekNum: state.weekNum
              ? state.weekNum
              : props.D.getintegrations["LoL Tournament API"].settings
                  .defaultweek,
            MonacoRef: undefined,
          });
          props.setState((_: any) => ({
            ..._,
            _isLoading: true,
            _primemodal: (D: any) => {
              const _ = props.fns.e(
                D,
                `D.generatetournamentcodes.generatetournamentcodes`,
                {}
              );
              props.fns.setModal({
                noescape: true,
                mode: "full",
                bgImg: `${props.publicURI}/static/integrationsart/riotxlol.jpg`,
                body: () => (
                  <div className={`arclight-w-full`}>
                    <div
                      className={`arclight-w-full arclight-h-96 arclight-p-4`}
                    >
                      <props.Controls.Monaco
                        refName={"codes"}
                        language={"json"}
                        defaultValue={_.JSON}
                        state={state}
                        setState={setState}
                      />
                    </div>
                  </div>
                ),
              });
            },
          }));
        }}
      />
    </div>
  ) : null;
};
