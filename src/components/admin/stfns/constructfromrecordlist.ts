export default (D: any) => (type: string) => {
	if (D) {
		if (type === "model" && D[`getdatamodels`] && D[`getdatamodels`].records)
			return D[`getdatamodels`].records;
		else if (D[`getrecords_${type}`] && D[`getrecords_${type}`].records)
			return D[`getrecords_${type}`][type].records;
		else return [];
	}
	return [];
};
