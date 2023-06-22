import LolTournamentAPI from "../../apps/LoL Tournament API";

export default (
	state: { [key: string]: any },
	setState: Function,
	D: any,
	fns: any,
	publicURI: string
) => {
	const _ = { state, setState, D, fns, publicURI };
	switch (fns.parseAdminDomainState().item) {
		case "LoL Tournament API":
			return <LolTournamentAPI {..._} />;
	}
};
