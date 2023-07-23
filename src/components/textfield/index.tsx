import React, { FC } from "react";
import { TextField as _TextField } from "@mui/material";
import Styles from "./styles";

export interface PropTypes {
  type: string;
  multiline?: boolean;
  rows?: number;
  span?: boolean | null;
  key: number;
  label?: string | null;
  variant: any;
  onChange: Function;
  hot?: boolean;
  value?: string;
  defaultValue?: string;
}

const TextField: FC<PropTypes> = ({
  key,
  label,
  variant,
  span,
  type,
  onChange,
  hot,
  value,
  defaultValue,
  multiline,
  rows,
}) => {
  const inputRef = React.useRef<{ [key: string]: any }>();
  return (
    <Styles.Container span={span}>
      <_TextField
        onKeyDown={(e: any) => {
          e.stopPropagation();
          //e.preventDefault();
        }}
        rows={rows}
        multiline={multiline}
        inputRef={inputRef}
        defaultValue={defaultValue}
        value={value}
        onChange={(d: any) => {
          if (hot) onChange(d);
        }}
        onBlur={(d: any) => {
          if (!hot) onChange(d);
        }}
        type={type}
        key={key}
        label={label}
        variant={variant}
        fullWidth={true}
        InputProps={{
          ref: inputRef,
          style: {
            color: "inherit",
            fontFamily: "inherit",
          },
        }}
        InputLabelProps={{
          style: {
            color: "inherit",
            fontFamily: "inherit",
          },
        }}
      />
    </Styles.Container>
  );
};

export default TextField;
