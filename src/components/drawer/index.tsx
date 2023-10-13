import React, { FC } from "react";
import Styles from "./styles";
import Menu from "react-burger-menu";
import FontAwesome from "../fontawesome/index";
import Button from "../button";

interface ItemPropTypes {
  index: number;
  icon?: string;
  text?: string;
  onClick?: Function;
  items?: Array<{}> | null;
  isExpanded?: boolean | null;
  italic?: boolean;
  color?: string;
  autoSort?: boolean;
}

const Item: FC<ItemPropTypes> = ({
  index,
  icon,
  text,
  onClick,
  items,
  isExpanded,
  italic,
  color,
  autoSort,
}) => {
  const [expanded, setExpanded] = React.useState(isExpanded);
  React.useEffect(() => setExpanded(isExpanded), [isExpanded]);
  return icon || text ? (
    <Styles.Item
      className={
        "arclight-flex arclight-items-center arclight-cursor-pointer arclight-font-primary arclight-text-text-primary arclight-text-left arclight-whitespace-nowrap arclight-z-20"
      }
      style={{ opacity: 0 }}
      mountAnim={{
        anim: "fadeInRight",
        duration: "0.35s",
        delay: `${0.075 * index}s`,
      }}
    >
      <table className={"arclight-w-full"}>
        <tbody>
          <tr
            onClick={() => {
              if (items && (isExpanded === undefined || isExpanded === null))
                setExpanded(!expanded);
              if (onClick) onClick();
            }}
            className={`arclight-relative arclight-group ${
              italic ? "arclight-italic" : null
            }`}
            style={{ color }}
          >
            {items ? (
              <FontAwesome
                animation="none"
                icon={"arrow-right"}
                size="xs"
                className={`arclight-absolute -arclight-left-5 ${
                  expanded ? `arclight-rotate-90` : `arclight-rotate-0`
                } arclight-transition-all arclight-duration-200 arclight-text-inherit`}
              />
            ) : null}
            {icon ? (
              <td className={"arclight-w-5"}>
                <FontAwesome
                  animation="none"
                  icon={icon}
                  size="1x"
                  className={"arclight-mr-2 arclight-text-inherit"}
                />
              </td>
            ) : null}
            {text ? (
              <td className={"arclight-text-left"}>
                <span className={"arclight-text-lg arclight-bold"}>{text}</span>
              </td>
            ) : null}
            <div
              className={`arclight-left-0 arclight-bottom-0 arclight-absolute arclight-border-b-2 arclight-w-0 group-hover:arclight-w-full arclight-transition-all arclight-duration-200`}
            />
          </tr>
          {items ? (
            <tr>
              <td>
                <div
                  className={`${
                    !expanded ? "arclight-scale-y-0 arclight-h-0" : null
                  } arclight-w-0 arclight-transition-all arclight-duration-200 arclight-origin-top ${
                    italic ? "arclight-italic" : null
                  }`}
                >
                  <div className={`arclight-scale-90 arclight-ml-4`}>
                    {items
                      // @ts-ignore
                      .sort((a, b) =>
                        // @ts-ignore
                        autoSort && a.text && b.text
                          ? // @ts-ignore
                            a.text < b.text
                            ? -1
                            : 1
                          : // @ts-ignore
                          autoSort && a.text && b.text
                          ? // @ts-ignore
                            a.icon < b.icon
                            ? -1
                            : 1
                          : null
                      )
                      .map((item: { [key: string]: any }, index: number) => (
                        <Item
                          index={index}
                          items={item.items}
                          icon={item.icon}
                          text={item.text}
                          onClick={() => item.onClick()}
                        />
                      ))}
                  </div>
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </Styles.Item>
  ) : null;
};

export interface PropTypes {
  startOpen?: boolean;
  locked?: boolean;
  animation: string;
  width?: string | number;
  buttonSide?: string;
  side?: string;
  className?: string | object;
  signOut?: Function;
  headerImg?: string;
  autoSort?: boolean;
  items?:
    | Array<{
        color?: string;
        italic?: boolean;
        isExpanded?: boolean | null;
        icon?: string;
        text?: string;
        onClick?: Function;
        items?: Array<{}> | null;
      }>
    | {
        color?: string;
        italic?: boolean;
        isExpanded?: boolean | null;
        icon?: string;
        text?: string;
        onClick?: Function;
        items?: Array<{}> | null;
      }
    | null;
}

const Drawer: FC<PropTypes> = ({
  locked,
  startOpen,
  animation,
  width,
  buttonSide,
  side,
  className,
  items,
  signOut,
  headerImg,
  autoSort,
}) => {
  const [isOpen, setIsOpen] = React.useState(startOpen ? startOpen : false);
  // @ts-ignore
  const Component = Menu[animation && Menu[animation] ? animation : "slide"];
  return (
    <Styles.Container
      buttonSide={buttonSide}
      className={className ? className : null}
    >
      <Styles.Item buttonSide={buttonSide} showBars={!locked}>
        <Component
          right={side === "right"}
          width={width}
          isOpen={isOpen}
          onOpen={() => (!locked ? setIsOpen(true) : null)}
          onClose={() => (!locked ? setIsOpen(false) : null)}
          noOverlay={locked}
          overlayClassName={`bm-overlay`}
        >
          <Styles.Component className={`${!locked ? "arclight-pt-6" : ""}`}>
            {headerImg ? (
              <img
                src={headerImg}
                className={`arclight-w-24 arclight-m-auto arclight-mb-10 arclight-mt-0`}
              />
            ) : null}
            {items && Array.isArray(items) ? (
              items
                // @ts-ignore
                .sort((a, b) =>
                  autoSort && a.text && b.text
                    ? a.text < b.text
                      ? -1
                      : 1
                    : a.text && b.text
                    ? // @ts-ignore
                      autoSort && a.icon < b.icon
                      ? -1
                      : 1
                    : null
                )
                .map((item, index: number) => (
                  <Item
                    index={index}
                    autoSort={autoSort}
                    color={item.color}
                    italic={item.italic}
                    isExpanded={item.isExpanded ? item.isExpanded : null}
                    items={item.items}
                    icon={item.icon}
                    text={item.text}
                    onClick={() => (item.onClick ? item.onClick() : null)}
                  />
                ))
            ) : items ? (
              <Item
                index={0}
                autoSort={autoSort}
                color={items.color}
                italic={items.italic}
                isExpanded={items.isExpanded ? items.isExpanded : null}
                items={items.items}
                icon={items.icon}
                text={items.text}
                onClick={() => (items.onClick ? items.onClick() : null)}
              />
            ) : null}
            {signOut ? (
              <Styles.SignOut className={`arclight-mt-8`}>
                <Button
                  span={true}
                  label={"Sign Out"}
                  type={"button"}
                  size={"md"}
                  animation={true}
                  onClick={(status: any) => (signOut ? signOut() : null)}
                />
              </Styles.SignOut>
            ) : null}
          </Styles.Component>
        </Component>
      </Styles.Item>
    </Styles.Container>
  );
};

export default Drawer;
