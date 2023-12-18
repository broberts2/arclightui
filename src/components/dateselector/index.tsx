import React, { FC } from "react";
import moment from "moment";
import Styles from "./styles";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment/index.js";
import { LocalizationProvider } from "@mui/x-date-pickers/index.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/index.js";

export interface PropTypes {
  onChange: Function;
  label?: string;
  value?: Date;
}

const DateSelector: FC<PropTypes> = ({ onChange, label, value }) => {
  return (
    <Styles.Container className={`arclight-font-primary arclight-relative`}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label={label}
          value={value ? value : moment()}
          className={`arclight-rounded arclight-text-white`}
          views={["day", "month", "year"]}
          onChange={(value) => onChange(value)}
        />
      </LocalizationProvider>
    </Styles.Container>
  );
};

export default DateSelector;
