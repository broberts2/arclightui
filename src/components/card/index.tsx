import React, { FC } from "react";
import Styles from "./styles";
import FontAwesome from "../fontawesome/index";
import Button from "../button";

export interface PropTypes {
  managed?: boolean | string;
  exitButton?: Function;
  bgImg: string;
  subText?: string | null;
  onClick?: Function | null;
  locked?: boolean | string | null;
  hoverComponent?: JSX.Element | null;
  bodyComponent?: JSX.Element | null;
  medium?: boolean | null;
  small?: boolean | null;
  className?: string | null;
  index?: number | null;
  line?: boolean | null;
  linesmall?: boolean | null;
  active?: boolean | null;
  max?: boolean | null;
  modal?: boolean | null;
  noBodyComponentAbsolute?: boolean | null;
  hover?: {
    onMouseEnter: Function;
    onMouseLeave: Function;
  };
  mountAnim?: { anim: string; duration: string; delay: string };
}

const Card: FC<PropTypes> = ({
  managed,
  exitButton,
  bodyComponent,
  bgImg,
  subText,
  onClick,
  locked,
  hoverComponent,
  medium,
  small,
  className,
  index,
  line,
  linesmall,
  active,
  hover,
  mountAnim,
  max,
  modal,
  noBodyComponentAbsolute,
}) => {
  const [top, setTop] = React.useState(0);
  const [s, setS] = React.useState(null);
  const BodyComponentRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (noBodyComponentAbsolute && (max || modal)) {
      const resize = () => {
        if (!BodyComponentRef.current) return;
        return setS(BodyComponentRef.current.clientHeight);
      };
      window.addEventListener("resize", () => resize());
      resize();
      return window.removeEventListener("resize", () => resize());
    }
  }, [bodyComponent]);
  return (
    <Styles.Container
      bodyComponent={bodyComponent}
      onMouseEnter={hover ? hover.onMouseEnter : null}
      onMouseLeave={hover ? hover.onMouseLeave : null}
      className={`${!noBodyComponentAbsolute ? "group " : null}${
        line || linesmall ? "w-full" : ""
      } ${bodyComponent && !line && !linesmall ? "md:w-1/2" : null} ${
        bodyComponent && !line && !linesmall ? "lg:w-1/3" : null
      } ${
        !line && !linesmall && !small ? "xl:w-96" : ""
      } text-text-primary font-primary ${className ? className : null} ${
        active !== null && active === false ? "opacity-50" : null
      } ${small && (!line || !linesmall) ? "w-40" : ""}`}
      max={max}
      modal={modal}
      medium={medium}
      small={small}
      line={line}
      linesmall={linesmall}
      style={{
        height: s,
        cursor: onClick ? "pointer" : "",
      }}
      mountAnim={mountAnim}
    >
      <Styles.Back
        borderRadius={"4px"}
        className={`transform bg-background-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all ease-linear ${
          locked ? "hidden" : ""
        }`}
      />
      <Styles.Front
        onClick={onClick && !locked ? () => onClick() : null}
        borderRadius={"4px"}
        className={
          "flex flex-col justify-end text-center bg-background-secondary"
        }
      >
        <Styles.BgImg
          line={line || linesmall}
          style={noBodyComponentAbsolute && (max || modal) ? { top } : {}}
        >
          <Styles.BgImgChild
            line={line}
            linesmall={linesmall}
            src={bgImg}
            className={`object-cover h-full w-full`}
            style={
              noBodyComponentAbsolute && false
                ? { height: `calc(100vh + 1000px)` }
                : {}
            }
          />
        </Styles.BgImg>
        {bodyComponent ? (
          <Styles.BodyComponent
            noabsolute={noBodyComponentAbsolute}
            ref={BodyComponentRef}
          >
            <div className={`flex justify-center`}>{bodyComponent}</div>
          </Styles.BodyComponent>
        ) : null}
        <Styles.TabNumberWrapper className={`${!index ? "hidden" : null}`} />
        <Styles.TabNumber className={`${!index ? "hidden" : null}`}>
          {index}
        </Styles.TabNumber>
        {hoverComponent && !locked ? (
          <div
            className={`w-full top-0 absolute ${
              !subText ? "h-full" : line || linesmall ? "h-2/3" : "h-3/4"
            } bg-visibility-primary opacity-0 group-hover:opacity-100 transition-all ease-linear`}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              {hoverComponent}
            </div>
          </div>
        ) : null}
        <div
          className={`w-full bottom-0 absolute ${
            line || linesmall ? "h-1/3" : "h-1/4"
          } bg-visibility-primary ${
            !subText || line || linesmall ? "hidden" : null
          }`}
        />
        {subText ? (
          <div
            className={`${
              medium
                ? "m-2 lg:m-5 text-2xl"
                : !(line || linesmall) && !small
                ? "m-2 lg:m-10 text-2xl"
                : !(line || linesmall)
                ? "text-sm"
                : line || linesmall
                ? "text-sm lg:text-lg text-left px-10 md:px-20 h-3/5"
                : "text-md lg:text-2xl"
            } relative p-0${managed ? ` text-cyan-300` : ""}`}
          >
            {subText}
          </div>
        ) : null}
        {exitButton ? (
          <Button
            className={`absolute top-2 right-2`}
            idleIcon={"arrow-right-from-bracket"}
            type={"button"}
            size={"normal"}
            animation={true}
            onClick={exitButton}
          />
        ) : null}
      </Styles.Front>
      <Styles.LockContainer
        className={`bg-visibility-primary ${locked ? "" : "hidden"}`}
      >
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-1/2 text-center`}
        >
          <FontAwesome size={"2x"} icon={"lock"} />
          <div className={`text-sm xl:text-lg text-left md-10`}>{locked}</div>
        </div>
      </Styles.LockContainer>
    </Styles.Container>
  );
};

export default Card;
