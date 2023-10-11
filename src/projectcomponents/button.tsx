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
    className={`bg-red-600 p-2 px-10 rounded text-xs`}
  >
    {children}
  </button>
);

export default B;
