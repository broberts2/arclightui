const fs = require("fs");
["index.js", "index.mjs"].map((n) => {
	const data = fs.readFileSync(`dist/${n}`);
	const fd = fs.openSync(`dist/${n}`, "w+");
	const insert = Buffer.from(`import "./index.css"\n`);
	fs.writeSync(fd, insert, 0, insert.length, 0);
	fs.writeSync(fd, data, 0, data.length, insert.length);
	fs.close(fd, (err) => {
		if (err) throw err;
	});
});
