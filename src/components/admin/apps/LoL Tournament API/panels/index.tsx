import BuildTournamentCodes from "./buildtournamnetcodes";
import AuthenticateSummoner from "./authenticatesummoner";
import ImportGameFromTournamentCode from "./importgamefromtournamentcode";
import PageTitle from "../../../../pagetitle";

export default (
  panel: Number,
  publicURI: string,
  fns: any,
  D: any,
  Controls: { [key: string]: any },
  state: any,
  setState: Function
) => {
  let App: any;
  let gem: string = "";
  const title: string = fns.parseAdminDomainState().subItem;
  if (title === "Tournament Codes") {
    gem = "purple_essence.png";
    App = (
      <BuildTournamentCodes
        publicURI={publicURI}
        fns={fns}
        D={D}
        Controls={Controls}
        state={state}
        setState={setState}
      />
    );
  } else if (title === "Authenticate Summoner") {
    gem = "orange_essence.png";
    App = (
      <AuthenticateSummoner
        publicURI={publicURI}
        fns={fns}
        D={D}
        Controls={Controls}
        state={state}
        setState={setState}
      />
    );
  } else if (title === "Import Game Data") {
    gem = "blue_essence.png";
    App = (
      <ImportGameFromTournamentCode
        publicURI={publicURI}
        fns={fns}
        D={D}
        Controls={Controls}
        state={state}
        setState={setState}
      />
    );
  }
  return (
    <div>
      <PageTitle
        orientation={"center"}
        text={title}
        fns={fns}
        img={`${publicURI}/static/defaultart/${gem}`}
        bg={`${publicURI}/static/defaultart/${gem}`}
        bgOffset={-50}
      />
      {App}
    </div>
  );
};
