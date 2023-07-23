import draweritems_app from "../draweritems/app";

export default (D: any, fns: any) => {
  const Items = draweritems_app(
    D,
    fns
  )(
    fns.calls && fns.calls["update(M) LoL Tournament APIs"]
      ? [
          {
            icon: "diamond",
            text: "LoL Tournament API",
            app: "LoL Tournament API",
          },
        ]
      : []
  );
  return {
    items: Items,
    icon: "superpowers",
    text: "Apps",
    cond: Items.length,
  };
};
