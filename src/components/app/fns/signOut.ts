export default (_: { [key: string]: any }) =>
  (S: { [key: string]: any }) =>
  () => {
    S.emit("signout");
  };
