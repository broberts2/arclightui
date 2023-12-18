import React, { FC } from "react";
import Styles from "./styles";
import Button from "../button";

export interface PropTypes {
  state: any;
  setState: Function;
  moment: any;
}

const Calendar: FC<PropTypes> = ({ state, setState, moment }) => {
  const B = (props: any) => (
    <Button
      className={``}
      label={props.label}
      // idleIcon={"arrow-left"}
      type={"button"}
      size={"normal"}
      animation={true}
      onClick={(status: any) => (props.onClick ? props.onClick() : null)}
    />
  );
  return (
    <div className={`arclight-flex arclight-mb-3`}>
      <div className={`arclight-flex arclight-space-x-1`}>
        <B
          label={"Back"}
          onClick={() => {
            state.today.subtract(1, "month");
            const monthStart: any = moment(state.today._d)
              .startOf("month")
              .day();
            const monthEnd: any = moment(state.today._d)
              .endOf("month")
              .get("date");
            setState((_: any) => ({
              ..._,
              monthStart,
              monthEnd,
              offset: state.offset + 1,
            }));
          }}
        />
        <B
          label={"Today"}
          onClick={() => {
            state.today.add(state.offset, "month");
            const monthStart: any = moment(state.today._d)
              .startOf("month")
              .day();
            const monthEnd: any = moment(state.today._d)
              .endOf("month")
              .get("date");
            setState((_: any) => ({
              ..._,
              monthStart,
              monthEnd,
              offset: 0,
            }));
          }}
        />
        <B
          label={"Next"}
          onClick={() => {
            state.today.add(1, "month");
            const monthStart: any = moment(state.today._d)
              .startOf("month")
              .day();
            const monthEnd: any = moment(state.today._d)
              .endOf("month")
              .get("date");
            setState((_: any) => ({
              ..._,
              monthStart,
              monthEnd,
              offset: state.offset - 1,
            }));
          }}
        />
      </div>
      <div
        className={`arclight-flex arclight-justify-center arclight-w-full arclight-text-center arclight-items-center`}
      >
        {state.today.format("MMMM YYYY")}
      </div>
      <div
        className={`arclight-flex arclight-space-x-1 arclight-w-full arclight-justify-end`}
      >
        {/* <B label={"Day"} onClick={() => null} />
        <B label={"Agenda"} onClick={() => null} />
        <B label={"Work Week"} onClick={() => null} /> */}
        <B label={"Month"} onClick={() => null} />
      </div>
    </div>
  );
};

export default Calendar;
