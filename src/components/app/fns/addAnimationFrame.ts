export default (
    _: { [key: string]: any },
    animationFrames: { [key: string]: any }
  ) =>
  (fn: Function) => {
    animationFrames.push(fn);
  };
