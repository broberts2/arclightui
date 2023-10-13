import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  logoSrc: string;
  text: string;
}

const Footer: FC<PropTypes> = ({ logoSrc, text }) => {
  return (
    <Styles.Container
      className={
        "arclight-flex arclight-flex-row arclight-w-full arclight-h-20 arclight-mt-36 arclight-p-5 arclight-justify-center arclight-items-center arclight-space-x-10 arclight-text-text-primary arclight-bg-background-secondary arclight-font-primary"
      }
    >
      <img src={logoSrc} className={"arclight-h-full"} />
      <div className={"arclight-text-x"}>
        {text} © {new Date().getFullYear()}
      </div>
    </Styles.Container>
  );
};

export default Footer;
