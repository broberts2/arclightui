import React, { FC } from "react";
import { Footer } from "../components";

const F: FC<{
  fns: {
    [key: string]: any;
  };
  endpoint?: string;
}> = ({ fns, endpoint }) => (
  <Footer
    logoSrc={`https://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png`}
    text={"Highmountain Labs"}
  />
);

export default F;
