import React, { FC } from "react";
import Styles from "./styles";
import NavBar from "./_navbar";
import WeekdayBar from "./_weekdaybar";
import EventCard from "./_eventcard";

import { Card } from "..";

export interface PropTypes {
  callModal: Function;
  setState: Function;
  manageEvent: Function;
  body: Function;
  state: any;
  events: Array<{ [key: string]: any }>;
  moment: any;
  defaultEventBgImg: string;
}

const LargeView: FC<PropTypes> = ({
  callModal,
  state,
  setState,
  events,
  moment,
  defaultEventBgImg,
  manageEvent,
  body,
}) => {
  let n = 0;
  const C = (props: any) => {
    const _events = props.events.filter((event: any) => {
      if (!props.date) return;
      return (
        event.startDate.startOf("day") <= props.date.startOf("day") &&
        event.endDate.startOf("day") >= props.date.startOf("day")
      );
    });
    return (
      <Card
        noBodyComponentAbsolute={false}
        index={props.index}
        hover={{
          onMouseEnter: () => {},
          onMouseLeave: () => {},
        }}
        active={_events?.length > 0}
        small={true}
        hoverComponent={undefined}
        locked={false}
        bgImg={
          _events?.length > 0
            ? _events[0].info.img
            : defaultEventBgImg && !props.inactive
            ? defaultEventBgImg
            : null
        }
        bodyComponent={<EventCard events={_events} />}
        onClick={() => {
          if (_events?.length > 0) {
            callModal({
              date: props.date,
              bgImg: _events[0].info.img,
              events: _events,
              body: body(_events[0]._id, _events[0].info.body),
            });
          } else if (defaultEventBgImg) {
            callModal({
              date: props.date,
              bgImg: defaultEventBgImg,
              body: manageEvent(props.date),
            });
          }
        }}
        className={
          props.inactive
            ? `arclight-opacity-5 arclight-pointer-events-none`
            : ``
        }
      />
    );
  };
  const buildRow = () => {
    const _: any = [];
    for (let i = 0; i < 7; i++) {
      const cond = (i >= state.monthStart || n) && n < state.monthEnd;
      _.push(
        <C
          events={events}
          index={cond ? ++n : null}
          inactive={!cond}
          date={
            cond
              ? moment(state.today)
                  .startOf("month")
                  .add(n - 1, "day")
              : null
          }
        />
      );
    }
    return <div className={`arclight-flex arclight-space-x-3`}>{_}</div>;
  };
  const buildRows = () => {
    const _: any = [];
    for (let i = 0; i < 6 && n < state.monthEnd; i++) {
      _.push(buildRow());
    }
    return <div className={`arclight-space-y-3`}>{_}</div>;
  };
  return (
    <Styles.Container
      className={`arclight-flex-col arclight-px-3 arclight-py-3 arclight-w-full`}
    >
      <NavBar state={state} setState={setState} moment={moment} />
      <WeekdayBar />
      {buildRows()}
    </Styles.Container>
  );
};

export default LargeView;
