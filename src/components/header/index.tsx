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
  } | null>;
  linksLeft?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    text: string;
    icon?: string | null;
    onClick?: Function | null | undefined;
  } | null>;
  links?: Array<{
    route?: string | undefined | null;
    routeExternal?: string | undefined | null;
    text: string;
    icon?: string | null;
    onClick?: Function | null | undefined;
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
  return (
    <Styles.Container className={"text-text-primary font-primary"}>
      <Drawer
        animation={"slide"}
        buttonSide="right"
        side="right"
        className={"lg:hidden"}
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
      <div
        className={
          "lg:my-10 absolute left-1/2 transform -translate-x-1/2 w-full"
        }
        style={links ? { display: "none" } : {}}
      >
        <table className="table-fixed w-full">
          <tbody>
            <tr>
              <Styles.Td className="w-2/5 relative">
                <div className="flex m-auto gap-8 relative place-content-end">
                  {linksLeft
                    ? linksLeft
                        .filter((el: any) => el)
                        .map((l: any) => (
                          <div
                            className="text-xl font-bold whitespace-nowrap cursor-pointer"
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
                          </div>
                        ))
                    : null}
                  <div className={"absolute top-12"}>
                    <div className="flex m-auto gap-4">
                      {socialMediaLeft
                        ? socialMediaLeft.map((l) => (
                            <FontAwesome
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
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </Styles.Td>
              <td className="w-1/5">
                <img
                  onClick={() => {
                    if (logo.onClick) logo.onClick();
                    if (!fns.route) return;
                    return fns.route(logo.route);
                  }}
                  src={logo.src}
                  className={"h-24 m-4 lg:h-36 lg:m-auto cursor-pointer"}
                />
              </td>
              <Styles.Td className="w-2/5">
                <div className="flex m-auto gap-8 relative">
                  {linksRight
                    ? linksRight
                        .filter((el: any) => el)
                        .map((l: any) => (
                          <div
                            className="text-xl font-bold whitespace-nowrap cursor-pointer"
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
                          </div>
                        ))
                    : null}
                  <div className={"absolute top-12"}>
                    <div className="flex m-auto gap-4 place-content-start">
                      {socialMediaRight
                        ? socialMediaRight.map((l) => (
                            <FontAwesome
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
      <div className={"lg:py-10"} style={!links ? { display: "none" } : {}}>
        <table width={"100%"}>
          <tbody>
            <tr>
              <td className="w-1/5 relative">
                <img
                  onClick={() => {
                    if (logo.onClick) logo.onClick();
                    if (!fns.route) return;
                    return fns.route(logo.route);
                  }}
                  src={logo.src}
                  className={"h-16 m-4 lg:h-24 lg:m-auto cursor-pointer"}
                />
              </td>
              <Styles.Td className="w-4/5 relative">
                <div className="flex m-auto gap-8 relative justify-center">
                  {links
                    ? links
                        .filter((el: any) => el)
                        .map((l: any) => (
                          <div
                            className="text-xl font-bold whitespace-nowrap cursor-pointer"
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
                          </div>
                        ))
                    : null}
                  <div className={"absolute top-12"}>
                    <div className="flex m-auto gap-4 place-content-start">
                      {socialMedia
                        ? socialMedia.map((l) => (
                            <FontAwesome
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
