export default (_: { [key: string]: any }) =>
  (
    setRoute: Function,
    setTransitioning: Function,
    transitionDuration: number
  ) =>
  (to: string, subdomain?: string, popstate?: boolean) => {
    if (
      _.readState().route !== to ||
      (subdomain && _.readState().subdomain !== subdomain) ||
      popstate
    ) {
      if (setTransitioning) setTransitioning(true);
      setTimeout(() => {
        setRoute(to);
        if (subdomain) {
          window.location.assign(
            `${window.location.protocol}//${`${subdomain}${
              subdomain.length > 0 ? "." : ""
            }`}${window.location.host}${window.location.pathname}`
          );
        } else {
          window.history.pushState(null, "", to);
        }
      }, transitionDuration / 3);
      if (!subdomain) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
          if (setTransitioning) setTransitioning(false);
        }, transitionDuration);
      }
    }
  };
