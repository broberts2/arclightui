import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  title: string;
  Message: any;
  bgImg?: string;
  button?: any;
}

const MissionStatement: FC<PropTypes> = ({ title, Message, bgImg, button }) => {
  return (
    <Styles.Container className={"text-text-primary font-primary"}>
      {bgImg ? <Styles.BgImg src={bgImg} className={`rounded`} /> : null}
      <div
        className={`w-full px-10 m-auto lg:w-4/5 relative ${
          bgImg ? "bg-visibility-primary rounded-md p-10" : ""
        }`}
      >
        <div
          className={`${bgImg ? "text-xl" : "text-6xl"} ${
            bgImg ? "my-0" : "my-14"
          }`}
        >
          {title}
        </div>
        {bgImg ? (
          <div className={"text-md my-14 w-full"}>{Message}</div>
        ) : (
          <div className={"text-md lg:text-2xl my-14 w-full"}>{Message}</div>
        )}
        {button ? button : null}
      </div>
    </Styles.Container>
  );
};

export default MissionStatement;
