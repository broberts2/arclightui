import React from "react";
import SubItem from "./subitem";

export default (props: any) => {
  const t = React.useRef();
  const [item, setItem] = React.useState(<div />);
  React.useEffect(() => {
    if (props.title !== t.current) setItem(<div />);
    setTimeout(() => setItem(<SubItem {...props} />), 10);
    t.current = props.title;
  }, [props]);
  return (
    <td
      className={`arclight-p-2 ${
        props.active
          ? `${
              props.waiting
                ? `arclight-opacity-30 arclight-pointer-events-none`
                : `arclight-opacity-100`
            } arclight-scale-100`
          : `arclight-hidden`
      } arclight-transition-all arclight-duration-300 arclight-flex-1 arclight-w-full arclight-h-full`}
      align={"center"}
    >
      {item}
    </td>
  );
};
