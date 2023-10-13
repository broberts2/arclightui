import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  rotation: number;
  img: string;
  ruby?: string | null;
}

const SlantedDivider: FC<PropTypes> = ({ rotation, img, ruby }) => {
  return (
    <Styles.Container
      className={`arclight-bg-gradient-to-b arclight-from-background-tertiary arclight-to arclight-to-transparent`}
    >
      <Styles.Divider
        rotation={rotation}
        className={"arclight-border-text-secondary arclight-border-b-2"}
      >
        <img src={img} width={"100%"} />
      </Styles.Divider>
      {ruby ? (
        <img
          src={ruby}
          className={`arclight-absolute arclight-bottom-24 lg:arclight-bottom-48 arclight-left-1/2 -arclight-translate-x-1/2 arclight-w-56 lg:arclight-w-96`}
        />
      ) : null}
    </Styles.Container>
  );
};

export default SlantedDivider;
