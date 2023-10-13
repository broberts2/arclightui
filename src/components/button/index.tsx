import React, { FC } from "react";
import ReactiveButton from "reactive-button";
import Styles from "./styles";
import FontAwesome from "../fontawesome/index";

export interface PropTypes {
  label?: string | null;
  loadingText?: string | null;
  loadingIcon?: string | null;
  successText?: string | null;
  successIcon?: string | null;
  errorText?: string | null;
  type: string;
  size: string;
  rounded?: boolean;
  block?: boolean;
  disabled?: boolean;
  animation: boolean;
  idleIcon?: string | null;
  onClick?: any;
  square?: boolean;
  isIconButton?: boolean;
  className?: string | null;
  span?: boolean | null;
  style?: any;
}

const Button: FC<PropTypes> = ({
  span,
  label,
  loadingText,
  loadingIcon,
  successIcon,
  successText,
  errorText,
  onClick,
  type,
  size,
  idleIcon,
  rounded,
  block,
  disabled,
  animation,
  square,
  isIconButton,
  className,
  style,
}) => {
  const [state, setState] = React.useState("idle");
  const onClickHandler = async () => {
    if (loadingIcon) setState("loading");
    onClick(setState);
  };
  return (
    <Styles.Container
      span={span}
      className={`arclight-text-text-primary arclight-font-primary ${className}`}
      style={style}
    >
      <ReactiveButton
        buttonState={state}
        onClick={onClickHandler}
        idleText={
          <span className={"arclight-text-text-primary"}>
            {idleIcon ? (
              <FontAwesome size={isIconButton ? "xl" : "lg"} icon={idleIcon} />
            ) : null}
            {idleIcon && label ? " " : null}
            {label ? label : null}
          </span>
        }
        loadingText={
          <span>
            {loadingIcon ? (
              <FontAwesome size={"lg"} icon={loadingIcon} animation={"spin"} />
            ) : null}
            {loadingIcon && loadingText ? " " : null}
            {loadingText ? loadingText : null}
          </span>
        }
        successText={
          <span>
            {successIcon ? (
              <FontAwesome size={"lg"} icon={successIcon} />
            ) : null}
            {successIcon && successText ? " " : null}
            {successText ? successText : null}
          </span>
        }
        errorText={errorText}
        type={type} // 'button' | 'submit' | 'reset'
        style={{
          borderRadius: square ? "0px" : "4px",
          backgroundColor: "rgb(32,32,32)",
        }}
        outline={false}
        shadow={false}
        rounded={rounded}
        size={size} // 'tiny' | 'small' | 'normal' | 'large'
        block={block}
        messageDuration={2000}
        disabled={disabled}
        buttonRef={null}
        width={span ? "100%" : null}
        height={null}
        animation={animation}
      />
    </Styles.Container>
  );
};

export default Button;
