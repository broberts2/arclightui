import React, { FC } from "react";
import { Page, AuthPage } from "../../components";
import Styles from "./styles";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";

const Login: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  return D && fns.calls ? (
    <Page fns={fns} backgroundGradient={{ from: `#283b4c`, to: `#09111c` }}>
      <Styles.Container className={`px-72`}>
        <Header fns={fns} endpoint={endpoint} />
        <AuthPage
          disableNewRegistration
          redirect={"/"}
          D={D}
          fns={fns}
          authBackgroundImage={`http://highmountainlabs.io/arclight/cdn/media/1.jpg`}
        />
      </Styles.Container>
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Login;
