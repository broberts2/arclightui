export default (_: { [key: string]: any }, C: { [key: string]: any }) =>
  (token?: string, customname?: string) => {
    if (token)
      C.set(customname ? customname : "authtoken", token, { path: "/" });
    else {
      C.remove(customname ? customname : "authtoken", { path: "/" });
      if (!customname) window.location.reload();
    }
  };
