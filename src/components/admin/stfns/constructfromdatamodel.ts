export default (D: any) => (type: string, isModel: boolean) => {
	const lookup = (value: any) => {
		if (value !== null) {
			const t = typeof value;
			if (t === "object") {
				if (isModel) {
					return "DynamicField";
				}
				if (value._type === "Number") return "TextFieldNumber";
				else if (value._type === "String" && value.lookup)
					return "SinglePickList";
				else if (value._type === "Array") return "PickList";
				else if (value._type === "String") return "TextField";
				else if (value._type === "Boolean") return "Boolean";
				else if (value._type === "JSON") return "Monaco";
			} else if (t === "string") {
				if (isModel) {
					return "TextField";
				}
			}
		}
	};
	if (D && D.getdatamodels && D.getdatamodels.records) {
		const fieldsObj = D.getdatamodels.records.find(
			(dm: any) => dm._type === type
		);
		return fieldsObj
			? Object.keys(fieldsObj)
					.filter((k: string) => !(k.slice(0, 1) === "_"))
					.map((k: string) => ({
						lookup: (() => {
							const _ = D.getdatamodels.records.find(
								(dm: any) => dm._type === type
							)[k];
							return _ && _.lookup ? _.lookup : null;
						})(),
						D,
						type: lookup(fieldsObj[k]),
						label: k,
						required: false,
					}))
			: [];
	}
	return [];
};
