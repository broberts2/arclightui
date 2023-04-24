export default (_: { [key: string]: any }) => () => ({
  subdomain: _.getSubdomain(),
  route: window.location.pathname,
});
