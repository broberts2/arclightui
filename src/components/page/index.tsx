import { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  children: JSX.Element | JSX.Element[];
  fns: {
    [key: string]: any;
  };
  backgroundImage?: {
    src: string;
    opacity: number;
  };
  backgroundGradient?: any;
  endpoint?: string;
}

const Page: FC<PropTypes> = ({
  backgroundImage,
  children,
  backgroundGradient,
  endpoint,
}) => {
  const type =
    backgroundImage?.src && backgroundImage.src.match(/\.[0-9a-z]+$/i)
      ? //@ts-ignore
        backgroundImage.src.match(/\.[0-9a-z]+$/i)[0]
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
            className={`arclight-w-full arclight-h-full arclight-fixed arclight-object-cover`}
            style={{ opacity: backgroundImage.opacity }}
          />
        ) : (
          <img
            src={backgroundImage.src}
            className={`arclight-w-full arclight-h-full arclight-fixed arclight-object-cover`}
            style={{ opacity: backgroundImage.opacity }}
          />
        )
      ) : undefined}
      {backgroundGradient ? (
        <div
          className={`arclight-w-full arclight-h-full arclight-fixed arclight-object-cover arclight-bg-gradient-to-b arclight-from-[${backgroundGradient.to}] arclight-bg-gradient-to-t arclight-to-[${backgroundGradient.from}]`}
        />
      ) : undefined}
      <Styles.Body>{children}</Styles.Body>
    </Styles.Container>
  );
};

export default Page;
