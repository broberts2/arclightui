import ItemContent from "./itemcontent";

export default (props: any) => {
  return (
    <props.Styles.Item
      className={`arclight-bg-background-primary arclight-w-full arclight-h-full arclight-rounded arclight-p-5 ${props.className}`}
      mountAnim={{ anim: "fadeIn", duration: "0.35s" }}
    >
      <props.Styles.BgImg
        src={
          props.backgroundImg
            ? props.backgroundImg
            : "http://localhost:7000/static/integrationsart/daedalus.jpg"
        }
      />
      <div className={`arclight-w-full arclight-h-full`}>
        {props.title ? (
          <div
            className={`arclight-font-primary arclight-text-4xl${
              props.managed ? ` arclight-text-cyan-300` : ""
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
