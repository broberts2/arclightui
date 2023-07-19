export default (_: { [key: string]: any }, C: { [key: string]: any }) => () => ({
  _token: C.get("authtoken"),
});
