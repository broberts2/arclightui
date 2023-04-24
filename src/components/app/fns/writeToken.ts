export default (_: { [key: string]: any }, C: { [key: string]: any }) =>
  (token: string | null) =>
    token
      ? C.set("authtoken", token, { path: "/" })
      : C.remove("authtoken", { path: "/" });
