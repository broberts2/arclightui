import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  ruby?: string;
  fadeOpacity?: number;
  img?: string;
}

const FadeDivider: FC<PropTypes> = ({ ruby, fadeOpacity, img }) => {
  const imgs: Array<JSX.Element> = [];
  if (img) {
    for (let i = 0; i < 3; i++) {
      imgs.push(
        <Styles.BackgroundImgFade
          src={img}
          className={``}
          style={{ opacity: fadeOpacity }}
        />
      );
    }
  }
  return (
    <Styles.Container>
      {img ? (
        <React.Fragment>{imgs}</React.Fragment>
      ) : (
        <Styles.BackgroundFade
          className={`arclight-bg-gradient-to-b arclight-from-background-tertiary arclight-to arclight-to-transparent`}
          style={{ opacity: fadeOpacity }}
        />
      )}
      {ruby ? (
        <img
          src={ruby}
          className={`arclight-absolute arclight-bottom-6 lg:arclight-bottom-24 arclight-left-1/2 -arclight-translate-x-1/2 arclight-w-44 lg:arclight-w-72`}
        />
      ) : null}
    </Styles.Container>
  );
};

export default FadeDivider;
