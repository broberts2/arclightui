import React, { FC } from "react";
import Styles from "./styles";

const Pipe: FC<{ title?: string }> = ({ title }) => {
  const [smokeArray, setSmokeArray] = React.useState([
    { a: "smoke", dur: "20s", d: "-10s" },
    { a: "smoke", dur: "20s", d: "0s" },
    { a: "smoke", dur: "20s", d: "10s" },
  ]);
  return (
    <div className={`arclight-relative arclight-w-72 arclight-m-auto`}>
      <div className={`arclight-flex arclight-items-end -arclight-space-x-20`}>
        <img
          src={`https://highmountainlabs.io/arclight/static/media/65e3b14a35b8895019faa18c.png`}
          className={`arclight-w-full arclight-object-cover`}
        />
        {title ? (
          <div className={`arclight-text-6xl arclight-italic`}>{title}</div>
        ) : null}
      </div>
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
