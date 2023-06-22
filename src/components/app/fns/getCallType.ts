export default (s: string, i: string, local?: boolean) => {
	if (local) return [`D.${s}`, s];
	else if (s === "model") return [`D.getdatamodels`, `getdatamodels`];
	else if (s === "scripts") return [`D.getscripts`, `getscripts`];
	return [`D.getrecords_${s}.${i}`, `getrecords_${s}`];
};
