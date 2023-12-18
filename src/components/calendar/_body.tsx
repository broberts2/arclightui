import React, { FC } from "react";
import ManageEvent from "./_manageevent";
import moment from "moment";
import Button from "../button";
import Styles from "./styles";

export interface PropTypes {
  Element: JSX.Element;
  fns: { [key: string]: any };
  D: { [key: string]: any };
  eventId: string;
  event?: any;
  events?: any;
}

const Body: FC<PropTypes> = ({ eventId, fns, D, Element, event, events }) => {
  return (
    <div
      className={`arclight-flex arclight-h-full relative arclight-justify-center arclight-items-center`}
    >
      <div
        className={`arclight-flex-col arclight-absolute arclight-top-12 arclight-right-2 arclight-space-y-1`}
      >
        <Button
          className={``}
          idleIcon={"pen-to-square"}
          type={"button"}
          size={"normal"}
          animation={true}
          onClick={() => {
            fns.setModal({
              noescape: true,
              body: () => (
                <div
                  className={`arclight-flex arclight-flex-col arclight-justify-center arclight-align-middle arclight-w-full arclight-h-full arclight-rounded`}
                >
                  <ManageEvent
                    event={event}
                    fns={fns}
                    D={D}
                    script={true}
                    type={"type"}
                  />
                </div>
              ),
              events,
              bgImg: event.info.img,
            });
          }}
        />
        <Button
          className={``}
          idleIcon={"trash-can"}
          type={"button"}
          size={"normal"}
          animation={true}
          onClick={() => {
            if (fns?.calls?.deleterecords_event) {
              fns.calls.deleterecords_event({
                search: { _id: eventId },
                nopanelchange: true,
              });
            }
          }}
        />
      </div>
      {Element}
    </div>
  );
};

export default Body;
