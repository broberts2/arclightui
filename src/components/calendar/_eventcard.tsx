import React, { FC } from "react";
import Event from "./_event";

export interface PropTypes {
  events: any;
}

const EventCard: FC<PropTypes> = ({ events }) => {
  const n = 4;
  return events?.length ? (
    <div
      className={`arclight-w-full arclight-h-24 arclight-p-1 arclight-pt-3 arclight-space-y-1`}
    >
      {events.map((event: any, i: number) =>
        i <= n ? (
          <div>
            {i < n ? <Event text={event.info.text} /> : null}
            {i === n ? (
              <div className={`arclight-w-full arclight-text-xs`}>
                +{events.length - n} Events
              </div>
            ) : null}
          </div>
        ) : null
      )}
    </div>
  ) : null;
};

export default EventCard;
