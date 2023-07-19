export default (D: any) => {
  if (
    D &&
    D.serversuccess &&
    (D.serversuccess.includes("201") ||
      D.serversuccess.includes("202") ||
      D.serversuccess.includes("203"))
  )
    return 2;
  return 1;
};
