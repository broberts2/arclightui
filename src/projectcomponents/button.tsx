import React, { FC } from "react";
import { Footer } from "../components";

const B: FC<{
  fns: {
    [key: string]: any;
  };
  endpoint?: string;
}> = ({ fns, endpoint }) => (
  <button className={`bg-red-600 p-2 px-10 rounded text-xs`}>SHALOM</button>
);

export default B;
