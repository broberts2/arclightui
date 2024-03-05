export default (_: { [key: string]: any }, C: { [key: string]: any }) =>
  (token?: string) => ({
    _token: C.get(token ? token : "authtoken"),
  });
