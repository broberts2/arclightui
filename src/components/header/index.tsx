import { FC } from "react";
import Drawer from "../drawer";
import FontAwesome from "../fontawesome";
import Styles from "./styles";

export interface PropTypes {
  fns: { [key: string]: Function };
  logo: { route: string; src: string; onClick?: Function | null | undefined };
  linksRight?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    text: string;
    icon?: string | null;
    onClick?: Function | null | undefined;
    subLinks?: Array<{ icon: string; text: string; route: string }>;
  } | null>;
  linksLeft?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    text: string;
    icon?: string | null;
    onClick?: Function | null | undefined;
    subLinks?: Array<{ icon: string; text: string; route: string }>;
  } | null>;
  links?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    text: string;
    icon?: string | null;
    onClick?: Function | null | undefined;
    subLinks?: Array<{ icon: string; text: string; route: string }>;
  } | null>;
  socialMediaRight?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    icon: string;
    onClick?: Function | null | undefined;
  }>;
  socialMediaLeft?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    icon: string;
    onClick?: Function | null | undefined;
  }>;
  socialMedia?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    icon: string;
    onClick?: Function | null | undefined;
  }>;
}

const Header: FC<PropTypes> = ({
  linksLeft,
  linksRight,
  links,
  socialMedia,
  socialMediaRight,
  socialMediaLeft,
  logo,
  fns,
}) => {
  const iconBackdropClassName = `arclight-text-xl arclight-font-bold arclight-whitespace-nowrap arclight-transform arclight-opacity-0 group-hover:arclight-opacity-100 group-hover:arclight-translate-x-1 group-hover:arclight-translate-y-1 arclight-transition-all arclight-ease-linear`;
  return (
    <Styles.Container
      className={"arclight-text-text-primary arclight-font-primary"}
    >
      {links?.length || linksLeft?.length || linksRight?.length ? (
        <Drawer
          animation={"slide"}
          buttonSide="right"
          side="right"
          className={"lg:arclight-hidden"}
          // @ts-ignore
          items={
            linksRight && linksLeft
              ? linksLeft
                  .concat(linksRight)
                  .filter((el: any) => el)
                  .map((l: any) => ({
                    icon: l.icon,
                    text: l.text,
                    onClick: () =>
                      fns.route
                        ? fns.route(l.route)
                        : fns.routeExternal
                        ? fns.routeExternal(l.routeExternal)
                        : null,
                  }))
              : links
              ? links
                  .filter((el: any) => el)
                  .map((l: any) => ({
                    icon: l.icon,
                    text: l.text,
                    onClick: () =>
                      fns.route
                        ? fns.route(l.route)
                        : fns.routeExternal
                        ? fns.routeExternal(l.routeExternal)
                        : null,
                  }))
              : null
          }
        />
      ) : null}
      <div
        className={
          "lg:arclight-my-10 arclight-absolute arclight-left-1/2 arclight-transform -arclight-translate-x-1/2 arclight-w-full"
        }
        style={links ? { display: "none" } : {}}
      >
        <table className="arclight-table-fixed arclight-w-full">
          <tbody>
            <tr>
              <Styles.Td className="w-2/5 relative">
                <div className="arclight-flex arclight-m-auto arclight-gap-8 arclight-relative arclight-place-content-end">
                  {linksLeft
                    ? linksLeft
                        .filter((el: any) => el)
                        .map((l: any) => (
                          <div className={`arclight-relative arclight-group`}>
                            <Styles.LinkTextsilhouette
                              className={`arclight-text-xl arclight-font-bold arclight-whitespace-nowrap arclight-text-background-tertiary arclight-transform arclight-opacity-0 group-hover:arclight-opacity-100 group-hover:arclight-translate-x-1 group-hover:arclight-translate-y-1 arclight-transition-all ease-linear`}
                            >
                              {l.text}
                            </Styles.LinkTextsilhouette>
                            <Styles.LinkText
                              className="arclight-text-xl arclight-font-bold arclight-whitespace-nowrap arclight-cursor-pointer arclight-relative"
                              onClick={() => {
                                if (l.onClick) l.onClick();
                                if (!fns.route) return;
                                return l.route
                                  ? fns.route(l.route)
                                  : l.routeExternal
                                  ? fns.routeExternal(l.routeExternal)
                                  : null;
                              }}
                            >
                              {l.text}
                            </Styles.LinkText>
                          </div>
                        ))
                    : null}
                  <div className={"arclight-absolute arclight-top-12"}>
                    <div className="arclight-flex arclight-m-auto arclight-gap-4">
                      {socialMediaLeft
                        ? socialMediaLeft.map((l) => (
                            <div className={`arclight-relative arclight-group`}>
                              <Styles.LinkTextsilhouette
                                className={iconBackdropClassName}
                              >
                                <FontAwesome
                                  className={`arclight-text-background-tertiary`}
                                  animation="none"
                                  icon={l.icon}
                                  size="lg"
                                  onClick={() => {
                                    if (l.onClick) l.onClick();
                                    if (!fns.route) return;
                                    return l.route
                                      ? fns.route(l.route)
                                      : l.routeExternal
                                      ? fns.routeExternal(l.routeExternal)
                                      : null;
                                  }}
                                />
                              </Styles.LinkTextsilhouette>
                              <FontAwesome
                                className={`arclight-relative arclight-z-10`}
                                animation="none"
                                icon={l.icon}
                                size="xl"
                                onClick={() => {
                                  if (l.onClick) l.onClick();
                                  if (!fns.route) return;
                                  return l.route
                                    ? fns.route(l.route)
                                    : l.routeExternal
                                    ? fns.routeExternal(l.routeExternal)
                                    : null;
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </Styles.Td>
              <td className="arclight-w-1/5">
                <img
                  onClick={() => {
                    if (logo.onClick) logo.onClick();
                    if (!fns.route) return;
                    return fns.route(logo.route);
                  }}
                  src={logo.src}
                  className={
                    "arclight-h-24 arclight-m-4 lg:arclight-h-36 lg:arclight-m-auto arclight-cursor-pointer"
                  }
                />
              </td>
              <Styles.Td className="arclight-w-2/5">
                <div className="arclight-flex arclight-m-auto arclight-gap-8 arclight-relative">
                  {linksRight
                    ? linksRight
                        .filter((el: any) => el)
                        .map((l: any) => (
                          <div className={`arclight-relative arclight-group`}>
                            <Styles.LinkTextsilhouette
                              className={`arclight-text-xl arclight-font-bold arclight-whitespace-nowrap arclight-text-background-tertiary arclight-transform arclight-opacity-0 group-hover:arclight-opacity-100 group-hover:arclight-translate-x-1 group-hover:arclight-translate-y-1 arclight-transition-all arclight-ease-linear`}
                            >
                              {l.text}
                            </Styles.LinkTextsilhouette>
                            <Styles.LinkText
                              className="arclight-text-xl arclight-font-bold arclight-whitespace-nowrap arclight-cursor-pointer arclight-relative"
                              onClick={() => {
                                if (l.onClick) l.onClick();
                                if (!fns.route) return;
                                return l.route
                                  ? fns.route(l.route)
                                  : l.routeExternal
                                  ? fns.routeExternal(l.routeExternal)
                                  : null;
                              }}
                            >
                              {l.text}
                            </Styles.LinkText>
                          </div>
                        ))
                    : null}
                  <div className={"arclight-absolute arclight-top-12"}>
                    <div className="arclight-flex arclight-m-auto arclight-gap-4 arclight-place-content-start">
                      {socialMediaRight
                        ? socialMediaRight.map((l) => (
                            <div className={`arclight-relative arclight-group`}>
                              <Styles.LinkTextsilhouette
                                className={iconBackdropClassName}
                              >
                                <FontAwesome
                                  className={`arclight-text-background-tertiary`}
                                  animation="none"
                                  icon={l.icon}
                                  size="lg"
                                  onClick={() => {
                                    if (l.onClick) l.onClick();
                                    if (!fns.route) return;
                                    return l.route
                                      ? fns.route(l.route)
                                      : l.routeExternal
                                      ? fns.routeExternal(l.routeExternal)
                                      : null;
                                  }}
                                />
                              </Styles.LinkTextsilhouette>
                              <FontAwesome
                                className={`arclight-relative`}
                                animation="none"
                                icon={l.icon}
                                size="xl"
                                onClick={() => {
                                  if (l.onClick) l.onClick();
                                  if (!fns.route) return;
                                  return l.route
                                    ? fns.route(l.route)
                                    : l.routeExternal
                                    ? fns.routeExternal(l.routeExternal)
                                    : null;
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </Styles.Td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className={"lg:arclight-py-10"}
        style={!links ? { display: "none" } : {}}
      >
        <table width={"100%"}>
          <tbody>
            <tr>
              <td className="arclight-w-1/5 arclight-relative">
                <img
                  onClick={() => {
                    if (logo.onClick) logo.onClick();
                    if (!fns.route) return;
                    return fns.route(logo.route);
                  }}
                  src={logo.src}
                  className={
                    "arclight-h-16 arclight-m-4 lg:arclight-h-24 lg:arclight-m-auto arclight-cursor-pointer"
                  }
                />
              </td>
              <Styles.Td className="arclight-w-4/5 arclight-relative">
                <div className="arclight-flex arclight-m-auto arclight-gap-8 arclight-relative arclight-justify-center">
                  {links
                    ? links
                        .filter((el: any) => el)
                        .map((l: any) => (
                          <div className={`arclight-relative arclight-group`}>
                            <Styles.LinkTextsilhouette
                              className={`arclight-text-xl arclight-font-bold arclight-whitespace-nowrap arclight-text-background-tertiary arclight-transform arclight-opacity-0 group-hover:arclight-opacity-100 group-hover:arclight-translate-x-1 group-hover:arclight-translate-y-1 arclight-transition-all arclight-ease-linear`}
                            >
                              {l.text}
                            </Styles.LinkTextsilhouette>
                            <Styles.LinkText
                              className="arclight-text-xl arclight-font-bold arclight-whitespace-nowrap arclight-cursor-pointer arclight-relative"
                              onClick={() => {
                                if (l.onClick) l.onClick();
                                if (!fns.route) return;
                                return l.route
                                  ? fns.route(l.route)
                                  : l.routeExternal
                                  ? fns.routeExternal(l.routeExternal)
                                  : null;
                              }}
                            >
                              {l.text}
                            </Styles.LinkText>
                          </div>
                        ))
                    : null}
                  <div className={"arclight-absolute arclight-top-12"}>
                    <div className="arclight-flex arclight-m-auto arclight-gap-4 arclight-place-content-start">
                      {socialMedia
                        ? socialMedia.map((l) => (
                            <div className={`arclight-relative arclight-group`}>
                              <Styles.LinkTextsilhouette
                                className={iconBackdropClassName}
                              >
                                <FontAwesome
                                  className={`arclight-text-background-tertiary`}
                                  animation="none"
                                  icon={l.icon}
                                  size="lg"
                                  onClick={() => {
                                    if (l.onClick) l.onClick();
                                    if (!fns.route) return;
                                    return l.route
                                      ? fns.route(l.route)
                                      : l.routeExternal
                                      ? fns.routeExternal(l.routeExternal)
                                      : null;
                                  }}
                                />
                              </Styles.LinkTextsilhouette>
                              <FontAwesome
                                className={`arclight-relative`}
                                animation="none"
                                icon={l.icon}
                                size="xl"
                                onClick={() => {
                                  if (l.onClick) l.onClick();
                                  if (!fns.route) return;
                                  return l.route
                                    ? fns.route(l.route)
                                    : l.routeExternal
                                    ? fns.routeExternal(l.routeExternal)
                                    : null;
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </Styles.Td>
            </tr>
          </tbody>
        </table>
      </div>
    </Styles.Container>
  );
};

export default Header;
