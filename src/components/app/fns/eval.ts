//@ts-nocheck
const ___sub: Function = (obj: any, keys: Array<string>) => {
	const c = keys[0] ? keys[0].match(/(?<=\[)(.*?)(?=\])/g) : null;
	return keys.length && keys[0]
		? ___sub(c ? obj[keys[0].split("[")[0]][0] : obj[keys[0]], keys.slice(1))
		: obj;
};

export default (_: { [key: string]: any }, D: { [key: string]: any }) =>
	(o: any, s: any, fallback: any) => {
		const keys = s.split(".");
		try {
			const v = ___sub(o, keys.slice(1));
			return v ? v : fallback;
		} catch (e) {
			return fallback;
		}
	};
