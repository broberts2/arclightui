import React, { FC } from "react";
import _Checkbox from "../checkbox";
import Styles from "./styles";

export interface PropTypes {
  values: Array<{ label: string; value: boolean }>;
  label?: string;
  onChange?: Function;
}

const CheckboxGroup: FC<PropTypes> = ({ values, onChange, label }) => {
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    const _ = {};
    values.map(
      (v: { label: string; value: boolean }) => (_[v.label] = v.value)
    );
    setState(_);
  }, []);
  return (
    <Styles.Container>
      {label ? (
        <div className={`arclight-font-primary arclight-text-md`}>{label}</div>
      ) : null}
      <div className={`arclight-flex arclight-flex-wrap`}>
        {values.map((value: { label: string; value: boolean }) => (
          <_Checkbox
            label={value.label}
            value={state[value.label]}
            onChange={(e) => {
              if (onChange) onChange({ label: value.label, value: !e });
              setState((s) => ({ ...s, [value.label]: !e }));
            }}
          />
        ))}
      </div>
    </Styles.Container>
  );
};

export default CheckboxGroup;
