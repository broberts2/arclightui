export default (_: { [key: string]: any }) =>
  (cb: Function) =>
  (object?: Object) => {
    return cb(
      object && Object.keys(object).length ? btoa(JSON.stringify(object)) : "/"
    );
  };
