import init from "./init";
import parseAdminDomainState from "./parseAdminDomainState";
import setAdminDomainState from "./setAdminDomainState";
import addAnimationFrame from "./addAnimationFrame";
import animate from "./animate";
import promisify from "./promisify";
import getSubdomain from "./getSubdomain";
import readState from "./readState";
import authenticate from "./authenticate";
import route from "./route";
import routeExternal from "./routeExternal";
import readToken from "./readToken";
import signOut from "./signOut";
import writeToken from "./writeToken";
import e from "./eval";
import scrollLock from "./scrolllock";

const animationFrames: Array<Function> = [];
// const CryptoJS = require("crypto-js");
// const CRYPTOKEY = "SECRETKEY123";

export default (D: any, setD: Function, Cookies: any, App: any) => {
  const _: { [key: string]: any } = {};
  _.init = init(_);
  _.promisify = promisify(D, setD, _);
  _.parseAdminDomainState = parseAdminDomainState(_);
  _.setAdminDomainState = setAdminDomainState(_);
  _.animate = animate(_, animationFrames);
  _.addAnimationFrame = addAnimationFrame(_, animationFrames);
  _.getSubdomain = getSubdomain(_);
  _.readState = readState(_);
  _.authenticate = authenticate(_);
  _.route = route(_);
  _.routeExternal = routeExternal(_);
  _.readToken = readToken(_, new Cookies());
  _.signOut = signOut(_);
  _.writeToken = writeToken(_, new Cookies());
  _.e = e(_, D);
  _.scrollLock = scrollLock(App);
  return _;
};
