import { io } from "socket.io-client";
import React, { FC } from "react";
import Cookies from "universal-cookie";
import Snack from "../snack";
import Spinner from "../spinner";
import Modal from "../modal";
import Admin from "../admin";
import { diff } from "deep-object-diff";
// import LifeCycle from "./lifecycle";
import Styles from "./styles";
import "./style.css";

import _fns from "./fns";
let fns: any;
let socket: any;

const transitionDuration = 1000;

export interface PropTypes {
  socketEndpoint?: string | null;
  pages: {
    [key: string]: any;
  };
  nopage: string;
  background?: { src: string; opacity: number };
  loader?: string;
}

const App: FC<PropTypes> = ({
  pages,
  socketEndpoint,
  nopage,
  loader,
  background,
}) => {
  const AppRef = React.useRef(null);
  let pagenotfound = true;
  const [D, _setD] = React.useState<any>({ nopage });
  const [LastD, setLastD] = React.useState<any>(undefined);
  const [app, setApp] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [transitioning, setTransitioning] = React.useState(false);
  const [init, setInit] = React.useState(false);
  const [modal, _setModal] = React.useState<{ [key: string]: any }>({});
  const setD = (fn: any) => {
    _setD(fn);
  };
  if (!fns) fns = _fns(D, setD, Cookies, AppRef);
  const [route, setRoute] = React.useState(fns.readState().route);
  const _route = fns.route(setRoute, setTransitioning, transitionDuration);
  const setAdminDomainState = fns.setAdminDomainState((_: string) =>
    fns.route(setRoute, null, 0)(_, null, null)
  );
  const setModal = (M: { [key: string]: any } | null) =>
    _setModal(M ? { ...M, active: true } : { ...modal, active: false });
  const preloadModal = (M: { [key: string]: any }) =>
    _setModal({ ...M, active: false });
  React.useEffect(() => {
    const _diff = diff(LastD, D) || {};
    setLastD(D);
    // @ts-ignore
    setApp(() => (
      <Styles.Container
        className={`arclight-relative arclight-text-text-primary arclight-font-primary`}
        ref={AppRef}
      >
        {background ? (
          <img
            src={background.src}
            className={`arclight-w-full arclight-h-full arclight-fixed arclight-object-cover`}
            style={{
              opacity: loading || transitioning ? background.opacity : 0,
              transition: `all 0.15s ease-in`,
            }}
          />
        ) : null}
        {loader ? (
          <div
            className={`arclight-sticky arclight-h-0 arclight-top-[50vh]`}
            style={{
              opacity: loading || transitioning ? 100 : 0,
              transition: `all 0.15s ease-in`,
            }}
          >
            <img
              src={loader}
              className={`arclight-w-56 arclight-object-cover arclight-absolute arclight-top-1/2 arclight-left-1/2 -arclight-translate-x-1/2 -arclight-translate-y-1/2`}
            />
          </div>
        ) : (
          <Spinner
            loader={"GridLoader"}
            opacity={loading || transitioning ? 100 : 0}
          />
        )}
        <div
          className={`arclight-bg-background-primary arclight-min-h-screen arclight-overflow-x-hidden`}
          style={loading || transitioning ? { pointerEvents: "none" } : {}}
        >
          {Object.keys(pages).map((domain: string) => {
            if (domain === "admin") {
              pages.admin.Home.component = Admin;
            }
            return Object.keys(pages[domain]).map((component: string) => {
              const Page = pages[domain][component].component.default;
              const backgroundImage =
                pages[domain][component].backgroundImage && domain === "admin"
                  ? pages[domain][component].backgroundImage
                  : null;
              const authBackgroundImage =
                pages[domain][component].authBackgroundImage &&
                domain === "admin"
                  ? pages[domain][component].authBackgroundImage
                  : null;
              const noSelect =
                pages[domain][component].noSelect && domain === "admin"
                  ? pages[domain][component].noSelect
                  : null;
              if (pagenotfound && route)
                pagenotfound =
                  domain !== "admin"
                    ? !(
                        (fns.readState().subdomain == domain ||
                          (domain === "_root_" &&
                            !fns.readState().subdomain)) &&
                        (route.includes("?") ? route.split("?")[0] : route) ==
                          pages[domain][component].route
                      )
                    : !fns.parseAdminDomainState();
              return (fns.readState().subdomain === domain ||
                (domain === "_root_" && !fns.readState().subdomain)) &&
                (route.split("?")[0] === pages[domain][component].route ||
                  (domain === "admin" && !pagenotfound)) ? (
                <div
                  className={`${
                    loading || transitioning
                      ? `arclight-opacity-0`
                      : `arclight-opacity-100`
                  } arclight-duration-700 arclight-delay-0 arclight-transition-all`}
                >
                  <Page
                    D={{
                      ...D,
                      _diff: (() => {
                        const _ = {};
                        Object.keys(_diff).map((k: string) => {
                          _[k] = _diff[k];
                        });
                        return _;
                      })(),
                    }}
                    endpoint={socketEndpoint}
                    backgroundImage={backgroundImage}
                    authBackgroundImage={authBackgroundImage}
                    noSelect={noSelect}
                    fns={{
                      joinRoom: fns.joinRoom(socket),
                      subscribe: fns.subscribe(socket),
                      verifyRegisterUser: fns.verifyRegisterUser,
                      getCallType: fns.getCallType,
                      readState: fns.readState,
                      setQueryParams: fns.setQueryParams,
                      scrollLock: fns.scrollLock,
                      setModal,
                      preloadModal,
                      readToken: fns.readToken,
                      writeToken: fns.writeToken,
                      e: fns.e,
                      setAdminDomainState:
                        domain === "admin" ? setAdminDomainState : null,
                      parseAdminDomainState: fns.parseAdminDomainState,
                      calls: (() => {
                        const _ = {};
                        Object.keys(fns.calls || {}).map((key: string) => {
                          if (fns?.calls[key])
                            _[key] = async (input: any) => {
                              fns.calls[key](input);
                              return await new Promise((res: any, rej: any) => {
                                setTimeout(
                                  () => rej(`Failed to call ${fns.calls[key]}`),
                                  100000
                                );
                                return res();
                              });
                            };
                        });
                        return _;
                      })(),
                      addAnimationFrame: fns.addAnimationFrame,
                      route: _route,
                      routeExternal: fns.routeExternal,
                      route404: fns.route404,
                      authenticate: fns.authenticate(
                        socket,
                        async (b: boolean) => {
                          if (b) setTransitioning(b);
                          await new Promise((r) =>
                            setTimeout(r, transitionDuration)
                          );
                          if (!b) setTransitioning(b);
                        },
                        (b: boolean) => setInit(b)
                      ),
                      setLoading: (b: boolean) => setLoading(b),
                      signOut: fns.signOut(socket, fns),
                    }}
                  />
                </div>
              ) : null;
            });
          })}
          <div
            className={`nopage ${
              loading || transitioning
                ? `arclight-opacity-0`
                : `arclight-opacity-100`
            } arclight-duration-700 arclight-delay-0 arclight-transition-all ${
              pagenotfound ? `` : `arclight-hidden`
            }`}
          >
            <img src={nopage} />
          </div>
          <Snack
            hide={() => {
              setD((_: any) => ({
                ..._,
                serversuccess: null,
                servererror: null,
                serverwarning: null,
                servermessage: null,
              }));
            }}
            D={D}
          />
        </div>
        <Modal
          defaultBackground={`https://highmountainlabs.io/cdn/arclight/media/permissions.jpg`}
          modal={modal}
          setModal={setModal}
          preloadModal={preloadModal}
          fns={fns}
          D={D}
        />
      </Styles.Container>
    ));
    fns.init(D, () => setInit(true), fns, init);
    if (loading && D) setTimeout(() => setLoading(false), 1000);
    if (fns.readState().query)
      fns.consumeOATH2Code(socket, fns.readState().query);
  }, [route, loading, transitioning, D, modal]);
  React.useEffect(() => {
    window.addEventListener(
      "popstate",
      (event: any) =>
        event && event.target && event.target
          ? _route(event.target.location.pathname, null, true)
          : null,
      false
    );
    fns.animate();
    if (!socket) {
      socket = socketEndpoint
        ? io(socketEndpoint, {
            transports: ["websocket"],
          })
        : null;
      socket?.emit("join", fns.readToken());
      socket?.on("disconnect", () => {
        setLoading(true);
        socket.emit("join", fns.readToken());
      });
      socket?.on("redirect", (msg: any) => _route(msg.route));
      socket?.on("init", (calls: { [key: string]: any }) => {
        fns.calls = {};
        Object.keys(calls).map((event: string) => {
          if (Array.isArray(calls[event]))
            calls[event].map((n: string) => {
              fns.calls[`${event}_${n}`] = (input: { [key: string]: any }) =>
                fns.promisify(() =>
                  socket.emit(`${event}_${n}`, {
                    index: "init",
                    ...input,
                    ...fns.readToken(),
                  })
                );
              // @ts-ignore
              socket.on(`${event}_${n}`, (data: any) => {
                const trigger = data._triggerFetch;
                const index = data.index;
                delete data.index;
                delete data._triggerFetch;
                setD((_: any) => {
                  if (!_[`${event}_${n}`]) _[`${event}_${n}`] = {};
                  return {
                    ..._,
                    [`${event}_${n}`]: {
                      ..._[`${event}_${n}`],
                      [index]: data,
                    },
                  };
                });
                if (trigger)
                  socket.emit(`getrecords_${n}`, {
                    ...fns.readToken(),
                  });
              });
            });
          else {
            fns.calls[event] = (input: { [key: string]: any }) =>
              fns.promisify(() =>
                socket.emit(event, {
                  //index: "init",
                  ...input,
                  ...fns.readToken(),
                })
              );
            // @ts-ignore
            socket.on(event, (data: any) => {
              if (event === "getlogs") console.log(JSON.parse(data));
              const trigger = data._triggerFetch;
              const index = data.index;
              delete data._triggerFetch;
              delete data.index;
              setD((_: any) => {
                return {
                  ..._,
                  [event]: index
                    ? {
                        ..._[event],
                        [index]: data,
                      }
                    : data,
                };
              });
              if (trigger) {
                socket.emit(event, {
                  ...fns.readToken(),
                });
              }
            });
          }
        });
        socket.on(`savetoken`, (msg: { token: string }) =>
          fns.writeToken(msg.token)
        );
        socket.on(`cleartoken`, async (msg: { token: string }) => {
          fns.writeToken();
          setTransitioning(true);
          await new Promise((r) => setTimeout(r, transitionDuration / 2));
          window.location.reload();
        });
        socket.on(`clearurlparameters`, () => {
          window.history.pushState(
            "object",
            document.title,
            window.location.href.split("?")[0]
          );
        });
        ["success", "error", "warning", "message"].map((el: string) =>
          socket.on(`server${el}`, (msg: { msg: string; code: Number }) => {
            if (
              msg.code === 401 ||
              (msg.code === 500 && msg.msg.includes("Unable to find user"))
            ) {
              fns.writeToken();
            }
            setD((_: any) => {
              return {
                ..._,
                [`server${el}`]: `(${msg.code}) ${msg.msg}`,
              };
            });
          })
        );
        setD((_: any) => {
          return { ..._ };
        });
      });
    }
  }, []);
  return app;
};

export default App;
