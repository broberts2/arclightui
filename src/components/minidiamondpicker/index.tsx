import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  count: number;
  cb?: Function;
  index?: number;
  columns: number;
  images?: Array<string>;
}

const Checkbox: FC<PropTypes> = ({ count, cb, index, columns, images }) => {
  return (
    <Styles.Container className={`arclight-h-${images ? `24` : `12`}`}>
      <div className={`arclight-relative`}>
        <div
          className={`arclight-absolute arclight-left-1/2 -arclight-translate-x-1/2 -arclight-bottom-${
            images ? `24` : `12`
          }`}
        >
          <div
            className={`arclight-flex arclight-flex-row arclight-justify-center arclight-space-x-${
              !images ? `10` : `5`
            } arclight-h-${images ? `24` : `11`}`}
          >
            {/* @ts-ignore */}
            {(() => {
              const _: any = [];
              for (let i = 0; i < Math.ceil(count / columns); i++)
                _.push(
                  images ? (
                    <img
                      onClick={() => (cb ? cb(i) : null)}
                      src={images[i]}
                      className={`${
                        index === i
                          ? "arclight-w-16 arclight-h-16 arclight-opacity-100 arclight-border-[1px]"
                          : "arclight-w-14 arclight-h-14 arclight-opacity-30 arclight-border-0"
                      } arclight-border-background-tertiary arclight-object-cover arclight-cursor-pointer arclight-transition-all arclight-duration-200`}
                      style={{ borderRadius: `50%` }}
                    />
                  ) : (
                    <div
                      onClick={() => (cb ? cb(i) : null)}
                      className={`arclight-bg-background-quarternary ${
                        index === i
                          ? "arclight-w-8 arclight-h-8 arclight-opacity-100 arclight-border-2 arclight-rotate-45"
                          : "arclight-w-6 arclight-h-6 arclight-opacity-30 arclight-border-0 -arclight-rotate-45"
                      } arclight-border-background-tertiary arclight-cursor-pointer arclight-transition-all arclight-duration-200`}
                    ></div>
                  )
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
