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
    <Styles.Container
      className={"arclight-text-text-primary arclight-font-primary"}
    >
      {bgImg ? (
        <Styles.BgImg
          src={bgImg}
          className={`arclight-rounded xs:max-md:arclight-h-full`}
        />
      ) : null}
      <div
        className={`arclight-w-full arclight-px-10 arclight-m-auto lg:arclight-w-4/5 arclight-relative ${
          bgImg
            ? "arclight-bg-visibility-primary arclight-rounded-md arclight-p-10"
            : ""
        }`}
      >
        <div
          className={`${bgImg ? "arclight-text-xl" : "arclight-text-6xl"} ${
            bgImg ? "arclight-my-0" : "arclight-my-14"
          }`}
        >
          {title}
        </div>
        {bgImg ? (
          <div className={"arclight-text-md arclight-my-14 arclight-w-full"}>
            {Message}
          </div>
        ) : (
          <div
            className={
              "arclight-text-md lg:arclight-text-2xl arclight-my-14 arclight-w-full"
            }
          >
            {Message}
          </div>
        )}
        {button ? button : null}
      </div>
    </Styles.Container>
  );
};

export default MissionStatement;
