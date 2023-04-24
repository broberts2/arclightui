const transitionDuration = 750;

export default (React: any, fns: any, _fns: Function) => {
  if (!fns) fns = _fns();
  const [app, setApp] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [D, setD] = React.useState(null);
  const [transitioning, setTransitioning] = React.useState(false);
  const [init, setInit] = React.useState(false);
  const [route, setRoute] = React.useState(fns.readState().route);
  const _route = fns.route(setRoute, setTransitioning, transitionDuration);
  const setAdminDomainState = fns.setAdminDomainState((_: string) =>
    fns.route(setRoute, null, 0)(_, null, null)
  );
  return {
    get: { app, loading, D, transitioning, init, route },
    set: {
      app: setApp,
      loading: setLoading,
      D: setD,
      adminDomainState: setAdminDomainState,
      init: setInit,
      route: _route,
    },
    fns,
  };
};
