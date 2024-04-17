import React, { FC } from "react";
import { Page } from "../../../components";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  console.log(D);
  return D && fns.calls ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: `https://highmountainlabs.io/arclight/static/media/65e3b40035b8895019faa204.jpg`,
        opacity: 0.1,
      }}
    >
      <div className={``}>
        <div>
          <button
            onClick={() =>
              fns.calls.registeruser({
                username: "test",
                password: "test",
                email: "broc.roberts2@gmail.com",
                redirect: `http://localhost:3000`,
              })
            }
          >
            Sign Up
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              fns.calls.verifyregisteruser({
                v: fns.readState().query.v,
                password: "test",
              })
            }
          >
            Verify
          </button>
        </div>
      </div>
    </Page>
  ) : null;
};

export default Home;
