import { io } from "socket.io-client";
import React, { FC } from "react";
import Cookies from "universal-cookie";
import Snack from "../snack";
import Spinner from "../spinner";
import Modal from "../modal";
import Admin from "../admin";
import LifeCycle from "./lifecycle";
import Styles from "./styles";
import "./style.css";

import _fns from "./fns";
let fns: any;
let socket: any;

const transitionDuration = 1500;

export interface PropTypes {
	socketEndpoint?: string | null;
	pages: {
		[key: string]: any;
	};
	nopage: string;
	recursive?: Array<string>;
}

const App: FC<PropTypes> = ({ pages, socketEndpoint, nopage, recursive }) => {
	const AppRef = React.useRef(null);
	let pagenotfound = true;
	const [D, setD] = React.useState(null);
	const [app, setApp] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [transitioning, setTransitioning] = React.useState(false);
	const [init, setInit] = React.useState(false);
	const [modal, setModal] = React.useState<{ [key: string]: any } | null>(null);
	if (!fns) fns = _fns(D, setD, Cookies, AppRef);
	const [route, setRoute] = React.useState(fns.readState().route);
	const _route = fns.route(setRoute, setTransitioning, transitionDuration);
	const setAdminDomainState = fns.setAdminDomainState((_: string) =>
		fns.route(setRoute, null, 0)(_, null, null)
	);
	React.useEffect(() => {
		// @ts-ignore
		setApp(() => (
			<Styles.Container className={`relative`} ref={AppRef}>
				<Spinner
					loader={"GridLoader"}
					opacity={loading || transitioning ? 100 : 0}
				/>
				<div
					className={`bg-background-primary min-h-screen overflow-x-hidden`}
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
							if (pagenotfound)
								pagenotfound =
									domain !== "admin"
										? !(
												(fns.readState().subdomain == domain ||
													(domain === "_root_" &&
														!fns.readState().subdomain)) &&
												route == pages[domain][component].route
										  )
										: !fns.parseAdminDomainState();
							return (
								<div
									className={`${
										loading || transitioning ? `opacity-0` : `opacity-100`
									} duration-700 delay-0 transition-all ${
										(fns.readState().subdomain == domain ||
											(domain === "_root_" && !fns.readState().subdomain)) &&
										(route == pages[domain][component].route ||
											(domain === "admin" && !pagenotfound))
											? ``
											: `hidden`
									}`}
								>
									<Page
										D={D}
										endpoint={socketEndpoint}
										backgroundImage={backgroundImage}
										authBackgroundImage={authBackgroundImage}
										noSelect={noSelect}
										fns={{
											scrollLock: fns.scrollLock,
											setModal,
											readToken: fns.readToken,
											e: fns.e,
											setAdminDomainState:
												domain === "admin" ? setAdminDomainState : null,
											parseAdminDomainState: fns.parseAdminDomainState,
											calls: fns.calls,
											addAnimationFrame: fns.addAnimationFrame,
											route: _route,
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
							);
						});
					})}
					<div
						className={`nopage ${
							loading || transitioning ? `opacity-0` : `opacity-100`
						} duration-700 delay-0 transition-all ${
							pagenotfound ? `` : `hidden`
						}`}
					>
						<img src={`${socketEndpoint}/${nopage}`} />
					</div>
					<Snack
						hide={() =>
							setD((_: any) => ({
								..._,
								serversuccess: null,
								servererror: null,
								serverwarning: null,
								servermessage: null,
							}))
						}
						D={D}
					/>
				</div>
				<Modal
					defaultBackground={`${socketEndpoint}/static/defaultart/permissions.jpg`}
					modal={modal}
					setModal={(modal: { [key: string]: any } | null) => setModal(modal)}
					fns={fns}
				/>
			</Styles.Container>
		));
		fns.init(() => setInit(true), recursive, init);
		if (loading && D) setTimeout(() => setLoading(false), 1000);
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
							//if (D) delete D[`${event}_${n}`];
							fns.calls[`${event}_${n}`] = (input: { [key: string]: any }) =>
								fns.promisify(() =>
									socket.emit(`${event}_${n}`, {
										...input,
										...fns.readToken(),
									})
								);
							// @ts-ignore
							socket.on(`${event}_${n}`, (data: any) => {
								const trigger = data._triggerFetch;
								delete data._triggerFetch;
								setD((_: any) => ({
									..._,
									[`${event}_${n}`]:
										_ && _[`${event}_${n}`]
											? { ..._[`${event}_${n}`], ...data }
											: data,
								}));
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
									...input,
									...fns.readToken(),
								})
							);
						// @ts-ignore
						socket.on(event, (data: any) => {
							if (event === "getlogs") console.log(JSON.parse(data));
							const trigger = data._triggerFetch;
							delete data._triggerFetch;
							setD((_: any) => ({
								..._,
								[event]: data,
							}));
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
				["success", "error", "warning", "message"].map((el: string) =>
					socket.on(`server${el}`, (msg: { msg: string; code: Number }) => {
						if (
							msg.code === 401 ||
							(msg.code === 500 && msg.msg.includes("Unable to find user"))
						) {
							fns.writeToken();
						}
						setD((_: any) => ({
							..._,
							[`server${el}`]: `(${msg.code}) ${msg.msg}`,
						}));
					})
				);
				setD((_: any) => ({ ..._ }));
			});
		}
	}, []);
	return app;
};

export default App;
