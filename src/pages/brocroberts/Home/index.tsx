import React, { FC } from "react";
import { Page } from "../../../components";
import Styles from "./styles";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  return D && fns.calls ? (
    <Page fns={fns} backgroundGradient={{ from: `#283b4c`, to: `#09111c` }}>
      <div>portfolio</div>
    </Page>
  ) : null;
};

export default Home;
