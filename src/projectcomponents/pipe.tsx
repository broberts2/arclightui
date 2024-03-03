import React, { FC } from "react";
import Styles from "./styles";

const Pipe: FC<{}> = ({}) => {
  const [smokeArray, setSmokeArray] = React.useState([
    { a: "smoke", dur: "65s", d: "-5s" },
    { a: "smoke2", dur: "40s", d: "20s" },
    { a: "smoke3", dur: "80s", d: "-40s" },
    { a: "smoke", dur: "30s", d: "30s" },
  ]);
  return (
    <div className={`arclight-relative arclight-w-72 arclight-m-auto`}>
      <img
        src={`https://highmountainlabs.io/arclight/static/media/65e3b14a35b8895019faa18c.png`}
        className={`arclight-w-full arclight-object-cover`}
      />
      {smokeArray.map((S: any) => (
        <Styles.Smoke
          className={`arclight-absolute arclight-object-cover arclight-w-full arclight-bottom-full -arclight-translate-x-[15%] arclight-translate-y-[35%] `}
        >
          <img
            src={`https://highmountainlabs.io/arclight/static/media/65e3b22935b8895019faa1b2.png`}
            style={{
              animationName: S.a,
              animationDuration: S.dur,
              animationDelay: S.d,
            }}
          />
        </Styles.Smoke>
      ))}
    </div>
  );
};

export default Pipe;
