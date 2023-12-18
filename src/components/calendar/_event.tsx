import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  text: string;
}

const Event: FC<PropTypes> = ({ text }) => {
  return (
    <div
      className={`arclight-w-full arclight-bg-background-primary arclight-rounded arclight-text-xs`}
    >
      {text}
    </div>
  );
};

export default Event;
