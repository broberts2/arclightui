import React, { FC } from "react";
import { Footer } from "../components";

const B: FC<{
  children: string;
  fns: {
    [key: string]: any;
  };
  endpoint?: string;
  onClick?: Function;
}> = ({ fns, endpoint, onClick, children }) => (
  <button
    onClick={onClick ? () => onClick() : undefined}
    className={`arclight-bg-red-600 arclight-p-2 arclight-px-10 arclight-rounded arclight-text-xs`}
  >
    {children}
  </button>
);

export default B;
