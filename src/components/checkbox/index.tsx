import React, { FC } from "react";
import { Checkbox as _Checkbox } from "@mui/material";
import Styles from "./styles";

export interface PropTypes {
  value?: boolean;
  onChange?: Function;
  label?: string;
}

const Checkbox: FC<PropTypes> = ({ value, onChange, label }) => {
  const [checked, setChecked] = React.useState<boolean | null | undefined>(
    value ? value : false
  );
  React.useEffect(() => setChecked(value), [value]);
  return (
    <Styles.Container className={`arclight-flex`}>
      <_Checkbox
        checked={checked ? true : false}
        onChange={() =>
          onChange ? onChange(checked, (b: boolean) => setChecked(b)) : null
        }
        style={{ color: "inherit" }}
      />
      {label ? (
        <div
          className={`arclight-text-md arclight-font-primary arclight-primary`}
        >
          {label}
        </div>
      ) : null}
    </Styles.Container>
  );
};

export default Checkbox;
