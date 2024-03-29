import React, { FC } from "react";
import Styles from "./styles";

import AnimatedBorder from "../animatedborder";

export interface PropTypes {
  orientation: string;
  text: string;
  fns: {
    [key: string]: any;
  };
  bg?: string | null;
  bgOffset?: number | null;
  img?: string | null;
}

const PageTitle: FC<PropTypes> = React.memo(
  ({ text, orientation, fns, bg, img, bgOffset }) => {
    const [small, setSmall] = React.useState(false);
    const handleResize = () => {
      if (window.innerWidth > 1024) setSmall(false);
      else setSmall(true);
    };
    window.addEventListener("resize", handleResize);
    React.useEffect(handleResize, []);
    return (
      <Styles.Container
        className={`arclight-text-${orientation} arclight-m-24 lg:arclight-m-36`}
      >
        {img ? (
          <div className={"arclight-relative"}>
            <AnimatedBorder
              fns={fns}
              src={img ? <img src={img} width={`400px`} /> : null}
              video={bg ? <video src={bg} /> : null}
              heightOffset={bgOffset ? bgOffset : 100}
              borderWidth={20}
              className={`arclight-m-auto ${small ? "arclight-hidden" : null}`}
            />
            <AnimatedBorder
              fns={fns}
              src={img ? <img src={img} width={`200px`} /> : null}
              video={bg ? <video src={bg} /> : null}
              heightOffset={bgOffset ? bgOffset : 100}
              borderWidth={10}
              className={`arclight-m-auto ${!small ? "arclight-hidden" : null}`}
            />
          </div>
        ) : null}
        <span
          className={`arclight-text-text-primary arclight-font-primary arclight-text-4xl lg:arclight-text-6xl arclight-relative`}
        >
          {text}
        </span>
      </Styles.Container>
    );
  }
);

export default PageTitle;
