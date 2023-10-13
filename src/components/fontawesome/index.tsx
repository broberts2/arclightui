import { FC } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./styles";
library.add(fab, fas, far);

const type = (icon: string) => {
  // @ts-ignore
  for (let key in library.definitions) {
    // @ts-ignore
    if (library.definitions[key][icon]) return key;
  }
};

interface IconProps {
  onClick?: Function;
  icon: string;
  animation?: string;
  animationPaused?: boolean;
  size: any;
  className?: string | null;
}

const FontAwesome: FC<IconProps> = ({
  icon,
  animation,
  size,
  animationPaused,
  onClick,
  className,
}) => {
  const selectAnimation = () =>
    animation ? { [animation]: true } : { animation: "none" };
  return (
    <Styles.Container className={`${className}`}>
      <FontAwesomeIcon
        {...selectAnimation()}
        // @ts-ignore
        onClick={onClick ? onClick : null}
        // @ts-ignore
        icon={[type(icon), icon]}
        size={size}
        border={false}
        //pull={"left"} // left | right
        transform={""} // {rotate: 45} | "shrink-6 left-4"
        className={`${onClick ? "arclight-cursor-pointer" : ""}`}
        style={{ animationPlayState: animationPaused ? "paused" : "" }}
      />
    </Styles.Container>
  );
};

export default FontAwesome;
