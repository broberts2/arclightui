import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {}

const Calendar: FC<PropTypes> = ({}) => {
  return (
    <div className={`arclight-flex arclight-w-full arclight-mb-3`}>
      {[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ].map((t: string) => (
        <div className={`arclight-flex-1 arclight-text-center`}>{t}</div>
      ))}
    </div>
  );
};

export default Calendar;
