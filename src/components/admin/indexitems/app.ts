import draweritems_app from "../draweritems/app";

export default (D: any, fns: any) => {
  const c =
    fns && fns.calls
      ? ["LoL Tournament API"].find(
          (s: string) =>
            fns.calls[`get${s}s`] ||
            fns.calls[`update${s}s`] ||
            fns.calls[`create${s}s`] ||
            fns.calls[`delete${s}s`]
        )
      : false;
  const Items = draweritems_app(
    D,
    fns
  )(
    c
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
