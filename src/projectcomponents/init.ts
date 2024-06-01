export default (fns: any, D: any) => {
  if (!D.getarticles && fns.calls.getarticles) {
    fns.calls.getarticles({ search: { _id: "665759fe4242abf9edb0af05" } });
  }
};
