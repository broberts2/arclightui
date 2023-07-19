import React from "react";
import SubItem from "./subitem";

export default (props: any) => {
	const t = React.useRef();
	const [item, setItem] = React.useState(<div />);
	React.useEffect(() => {
		if (props.title !== t.current) setItem(<div />);
		setTimeout(() => setItem(<SubItem {...props} />), 10);
		t.current = props.title;
	}, [props]);
	return (
		<td
			className={`p-2 ${
				props.active
					? `${
							props.waiting ? `opacity-30 pointer-events-none` : `opacity-100`
					  } scale-100`
					: `hidden`
			} transition-all duration-300 flex-1 w-full h-full`}
			align={"center"}
		>
			{item}
		</td>
	);
};
