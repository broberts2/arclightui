import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
  src: any;
  clippingMask: any;
  width: number;
  height: number;
  className?: string | object | null;
  fns: {
    [key: string]: any;
  };
}

const Video = (
  fns: any,
  src: any,
  context: any,
  width: any,
  height: any,
  cb: any
) => {
  return;
  const _src = document.createElement("video");
  _src.src = src.props.src;
  _src.autoplay = true;
  _src.muted = true;
  _src.loop = true;
  _src.play();
  _src.oncanplay = () => {
    fns.addAnimationFrame(() => context.drawImage(_src, 0, 0, width, height));
    cb();
  };
};

const BoundGraphic: FC<PropTypes> = React.memo(
  ({ src, clippingMask, width, height, className, fns }) => {
    const [opacity, setOpacity] = React.useState(0);
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
      const canvas = canvasRef.current;
      // @ts-ignore
      const context = canvas.getContext("2d");
      const _clippingMask = document.createElement("img");
      _clippingMask.src = clippingMask.props.src;
      _clippingMask.onload = () => {
        context.drawImage(_clippingMask, 0, 0, width, height);
        context.globalCompositeOperation = "source-atop";
        Video(fns, src, context, width, height, () => setOpacity(1));
      };
    }, []);
    return (
      <Styles.Canvas
        ref={canvasRef}
        width={width}
        height={height}
        opacity={opacity}
        className={className}
      />
    );
  }
);

export default BoundGraphic;
