import LolTournamentAPI from "../../apps/LoL Tournament API";

export default (obj: any) => {
  const _ = {
    state: obj.state,
    setState: obj.setState,
    D: obj.D,
    fns: obj.fns,
    publicURI: obj.publicURI,
  };
  switch (obj.fns.parseAdminDomainState().item) {
    case "LoL Tournament API":
      return <LolTournamentAPI {..._} />;
  }
};
