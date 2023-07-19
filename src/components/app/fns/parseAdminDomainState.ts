export default (_: { [key: string]: any }) => () => {
  try {
    return _.readState().route && _.readState().route.length > 1
      ? JSON.parse(atob(_.readState().route.slice(1)))
      : {};
  } catch (e) {
    return false;
  }
};
