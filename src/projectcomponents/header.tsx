import React, { FC } from "react";
import { Header } from "../components";

const H: FC<{
  fns: {
    [key: string]: any;
  };
  main?: boolean;
  endpoint?: string;
}> = ({ fns, main, endpoint }) => {
  return (
    <div
      className={`flex py-5 items-center space-x-7 border-b-[1px] border-gray-500 mb-10 pt-10`}
    >
      <img
        src={`http://highmountainlabs.io/arclight/cdn/media/highmountainlabs.png`}
        className={`w-20 cursor-pointer`}
      />
      {[
        { text: "Home", route: "/" },
        fns.readToken()._token
          ? {
              text: "ArclightUI",
              route: "/arclightui",
            }
          : undefined,
      ]
        .filter((el: any) => el)
        .map((el: any) => (
          <div
            className={`text-lg cursor-pointer`}
            onClick={() => fns.route(el.route)}
          >
            {el.text}
          </div>
        ))}
      <div className={`grow text-right`}>
        <div
          className={`text-lg cursor-pointer inline-flex`}
          onClick={() => {
            if (fns.readToken()._token) {
              fns.route("/");
              fns.writeToken();
            } else {
              fns.route("/login");
            }
          }}
        >
          {fns.readToken()._token ? "Sign Out" : "Sign In"}
        </div>
      </div>
    </div>
  );
};

export default H;
