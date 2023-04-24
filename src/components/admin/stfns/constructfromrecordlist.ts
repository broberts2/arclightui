export default (D: any) => (type: string) => {
  if (D) {
    if (type === "model" && D[`getdatamodels`]) return D[`getdatamodels`];
    else if (D[`getrecords_${type}`]) return D[`getrecords_${type}`][type];
    else return [];
  }
  return [];
};
