import React, { FC } from "react";
import { Checkbox as _Checkbox } from "@mui/material";
import Styles from "./styles";

export interface PropTypes {
	value?: boolean;
	onChange?: Function;
}

const Checkbox: FC<PropTypes> = ({ value, onChange }) => {
	const [checked, setChecked] = React.useState<boolean | null | undefined>(
		value ? value : false
	);
	React.useEffect(() => setChecked(value), [value]);
	return (
		<Styles.Container>
			<_Checkbox
				checked={checked ? true : false}
				onChange={() =>
					onChange ? onChange(checked, (b: boolean) => setChecked(b)) : null
				}
				style={{ color: "inherit" }}
			/>
		</Styles.Container>
	);
};

export default Checkbox;
