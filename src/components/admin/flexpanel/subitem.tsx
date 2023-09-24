import ItemContent from "./itemcontent";

export default (props: any) => {
  return (
    <props.Styles.Item
      className={`bg-background-primary w-full h-full rounded p-5 ${props.className}`}
      mountAnim={{ anim: "fadeIn", duration: "0.35s" }}
    >
      <props.Styles.BgImg
        src={
          props.backgroundImg
            ? props.backgroundImg
            : "http://localhost:7000/static/integrationsart/daedalus.jpg"
        }
      />
      <div className={`w-full h-full`}>
        {props.title ? (
          <div
            className={`font-primary text-4xl${
              props.managed ? ` text-cyan-300` : ""
            }`}
          >
            {props.title}
          </div>
        ) : null}
        <ItemContent {...props}>{props.children}</ItemContent>
      </div>
    </props.Styles.Item>
  );
};
