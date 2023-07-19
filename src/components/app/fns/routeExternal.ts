export default (_: { [key: string]: any }) => (route: string) =>
  window.open(route, "_blank");
