import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  count: number;
  cb?: Function;
  index?: number;
  columns: number;
}

const Checkbox: FC<PropTypes> = ({ count, cb, index, columns }) => {
  return (
    <Styles.Container className={`arclight-h-12`}>
      <div className={`arclight-relative`}>
        <div
          className={`arclight-absolute arclight-left-1/2 -arclight-translate-x-1/2 -arclight-bottom-10`}
        >
          <div
            className={`arclight-flex arclight-flex-row arclight-justify-center arclight-space-x-10`}
          >
            {/* @ts-ignore */}
            {(() => {
              const _: any = [];
              for (let i = 0; i < Math.ceil(count / columns); i++)
                _.push(
                  <div
                    onClick={() => (cb ? cb(i) : null)}
                    className={`arclight-bg-background-quarternary ${
                      index === i
                        ? "arclight-w-8 arclight-h-8"
                        : "arclight-w-6 arclight-h-6"
                    } arclight-rotate-45 arclight-border-${
                      index === i ? "2" : "0"
                    } arclight-border-background-tertiary arclight-cursor-pointer arclight-transition-all arclight-duration-200 ${
                      index === i
                        ? "arclight-opacity-100"
                        : "arclight-opacity-30"
                    }`}
                  />
                );
              return _;
            })()}
          </div>
        </div>
      </div>
    </Styles.Container>
  );
};

export default Checkbox;
