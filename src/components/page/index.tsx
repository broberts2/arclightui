import React, { FC } from "react";
import Styles from "./styles";

import Button from "../button";

export interface PropTypes {
  children: JSX.Element | JSX.Element[];
  fns: {
    [key: string]: any;
  };
  backgroundImage?: any;
  backgroundGradient?: any;
  endpoint?: string;
}

const Page: FC<PropTypes> = ({
  fns,
  backgroundImage,
  children,
  backgroundGradient,
  endpoint,
}) => {
  const type =
    backgroundImage &&
    backgroundImage.src &&
    backgroundImage.src.match(/\.[0-9a-z]+$/i)
      ? backgroundImage.src.match(/\.[0-9a-z]+$/i)[0]
      : null;
  return (
    <Styles.Container>
      {backgroundImage && type ? (
        backgroundImage && (type === ".webm" || type === ".mp4") ? (
          <video
            autoPlay
            muted
            loop
            src={backgroundImage.src}
            className={`w-full h-full fixed object-cover`}
            style={{ opacity: backgroundImage.opacity }}
          />
        ) : (
          <img
            src={backgroundImage.src}
            className={`w-full h-full fixed object-cover`}
            style={{ opacity: backgroundImage.opacity }}
          />
        )
      ) : undefined}
      {backgroundGradient ? (
        <div
          className={`w-full h-full fixed object-cover bg-gradient-to-b from-[${backgroundGradient.to}] bg-gradient-to-t to-[${backgroundGradient.from}]`}
        />
      ) : undefined}
      <Styles.Body>{children}</Styles.Body>
    </Styles.Container>
  );
};

export default Page;
