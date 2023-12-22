import React, { FC } from "react";
import Styles from "./styles";
import FontAwesome from "../fontawesome/index";
import Button from "../button";

export interface PropTypes {
  managed?: boolean | string;
  exitButton?: Function;
  bgImg?: string;
  bgVid?: string;
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
  bgVid,
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
      window.addEventListener("resize", resize);
      resize();
      return window.removeEventListener("resize", resize);
    }
  }, [bodyComponent]);
  return (
    <Styles.Container
      bodyComponent={bodyComponent}
      onMouseEnter={
        hover?.onMouseEnter && typeof hover.onMouseEnter === "function"
          ? hover.onMouseEnter
          : undefined
      }
      onMouseLeave={
        hover?.onMouseLeave && typeof hover.onMouseLeave === "function"
          ? hover.onMouseLeave
          : undefined
      }
      className={
        !modal
          ? `${!noBodyComponentAbsolute ? "arclight-group " : null}${
              line || linesmall ? "arclight-w-full" : ""
            } ${
              bodyComponent && !line && !linesmall
                ? "md:arclight-w-1/2 lg:arclight-w-1/3"
                : null
            } ${
              !line && !linesmall && !small
                ? "arclight-w-full lg:arclight-max-w-sm"
                : ""
            } arclight-text-text-primary arclight-font-primary ${
              active !== null && active === false ? "arclight-opacity-50" : null
            } ${small && (!line || !linesmall) ? "arclight-w-40" : ""} ${
              className ? className : null
            }`
          : `arclight-max-w-2xl arclight-w-[100vw] ${
              className ? className : ""
            }`
      }
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
        className={`arclight-transform arclight-bg-background-tertiary arclight-opacity-0 group-hover:arclight-opacity-100 group-hover:arclight-translate-x-1 group-hover:arclight-translate-y-1 arclight-transition-all arclight-ease-linear ${
          locked ? "arclight-hidden" : ""
        }`}
      />
      <Styles.Front
        onClick={onClick && !locked ? () => onClick() : null}
        borderRadius={"4px"}
        className={`arclight-flex arclight-flex-col arclight-justify-end arclight-text-center arclight-bg-background-secondary ${
          !modal ? `arclight-overflow-hidden` : ""
        }`}
      >
        {bgImg ? (
          <Styles.BgImg
            line={line || linesmall}
            className={`arclight-rounded arclight-overflow-hidden`}
            style={noBodyComponentAbsolute && (max || modal) ? { top } : {}}
          >
            <Styles.BgImgChild
              line={line}
              linesmall={linesmall}
              src={bgImg}
              className={`arclight-object-cover arclight-h-full arclight-w-full`}
              style={
                noBodyComponentAbsolute && false
                  ? { height: `calc(100vh + 1000px)` }
                  : {}
              }
            />
          </Styles.BgImg>
        ) : null}
        {bgVid ? (
          <Styles.BgImg
            line={line || linesmall}
            className={`arclight-rounded arclight-overflow-hidden`}
            style={noBodyComponentAbsolute && (max || modal) ? { top } : {}}
          >
            <Styles.BgVidChild
              preload
              line={line}
              linesmall={linesmall}
              src={bgVid}
              className={`arclight-object-cover arclight-h-full arclight-w-full`}
              style={
                noBodyComponentAbsolute && false
                  ? { height: `calc(100vh + 1000px)` }
                  : {}
              }
            />
          </Styles.BgImg>
        ) : null}
        {bodyComponent ? (
          <Styles.BodyComponent
            noabsolute={noBodyComponentAbsolute}
            ref={BodyComponentRef}
          >
            <div
              className={`arclight-flex arclight-flex-col arclight-justify-center arclight-align-middle arclight-w-full arclight-h-full arclight-rounded`}
            >
              {bodyComponent}
            </div>
          </Styles.BodyComponent>
        ) : null}
        <Styles.TabNumberWrapper
          className={`${!index ? "arclight-hidden" : null}`}
        />
        <Styles.TabNumber className={`${!index ? "arclight-hidden" : null}`}>
          {index}
        </Styles.TabNumber>
        {hoverComponent && !locked ? (
          <div
            className={`arclight-w-full arclight-top-0 arclight-absolute ${
              !subText
                ? "arclight-h-full"
                : line || linesmall
                ? "arclight-h-2/3"
                : "arclight-h-3/4"
            } arclight-bg-visibility-primary arclight-opacity-0 group-hover:arclight-opacity-100 arclight-transition-all arclight-ease-linear`}
          >
            <div
              className={`arclight-absolute arclight-top-1/2 arclight-left-1/2 -arclight-translate-x-1/2 -arclight-translate-y-1/2`}
            >
              {hoverComponent}
            </div>
          </div>
        ) : null}
        <div
          className={`arclight-w-full arclight-bottom-0 arclight-absolute ${
            line || linesmall ? "arclight-h-1/3" : "arclight-h-1/4"
          } arclight-bg-visibility-primary ${
            !subText || line || linesmall ? "arclight-hidden" : null
          }`}
        />
        {subText ? (
          <div
            className={`${
              medium
                ? "arclight-m-2 lg:arclight-m-5 arclight-text-2xl"
                : !(line || linesmall) && !small
                ? "arclight-m-2 lg:arclight-m-10 arclight-text-2xl"
                : !(line || linesmall)
                ? "arclight-text-sm"
                : line || linesmall
                ? "arclight-text-sm lg:arclight-text-lg arclight-text-left arclight-px-10 md:arclight-px-20 arclight-h-3/5"
                : "arclight-text-md lg:arclight-text-2xl"
            } arclight-relative arclight-p-0${
              managed ? ` arclight-text-cyan-300` : ""
            }`}
          >
            {subText}
          </div>
        ) : null}
        {exitButton ? (
          <Button
            className={`arclight-absolute arclight-top-2 arclight-right-2`}
            idleIcon={"arrow-right-from-bracket"}
            type={"button"}
            size={"normal"}
            animation={true}
            onClick={exitButton}
          />
        ) : null}
      </Styles.Front>
      <Styles.LockContainer
        className={`arclight-bg-visibility-primary ${
          locked ? "" : "arclight-hidden"
        }`}
      >
        <div
          className={`arclight-absolute arclight-left-1/2 arclight-top-1/2 -arclight-translate-x-2/4 -arclight-translate-y-1/2 arclight-text-center`}
        >
          <FontAwesome size={"2x"} icon={"lock"} />
          <div
            className={`arclight-text-sm xl:arclight-text-lg arclight-text-left arclight-md-10`}
          >
            {locked}
          </div>
        </div>
      </Styles.LockContainer>
    </Styles.Container>
  );
};

export default Card;
