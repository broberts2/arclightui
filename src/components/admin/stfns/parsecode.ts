export default (D: any) => {
  if (D && D.serversuccess) {
    if (D.serversuccess.includes("210")) {
      return 3;
    } else if (
      D.serversuccess.includes("201") ||
      D.serversuccess.includes("202") ||
      D.serversuccess.includes("203")
    ) {
      return 2;
    }
  }
  return 1;
};
