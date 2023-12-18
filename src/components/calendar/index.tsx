import React, { FC } from "react";
import Styles from "./styles";
import moment from "moment";
import LargeView from "./_largeview";
import ManageEvent from "./_manageevent";
import Body from "./_body";

export interface PropTypes {
  D: any;
  fns: any;
  script?: boolean;
  defaultEventBgImg: string;
  events?: Array<{
    startDate: Date;
    endDate: Date;
    info: { text: string; img: string; body: JSX.Element };
  }>;
  type?: string;
}

const Calendar: FC<PropTypes> = ({
  D,
  fns,
  events,
  type,
  defaultEventBgImg,
  script,
}) => {
  const monthStart: any = moment();
  const monthEnd: any = moment();
  const [state, setState] = React.useState<any>({
    today: moment(),
    monthStart: monthStart.startOf("month").day(),
    monthEnd: monthEnd.endOf("month").get("date"),
    offset: 0,
    events: undefined,
  });
  const successRef = React.useRef<boolean>(D.serversuccess);
  const search = !script
    ? { $and: [{ type }, { type: { $ne: "script" } }] }
    : { type: "script" };
  const callModal = (obj: any) => {
    fns.setModal({
      noescape: true,
      bgImg: obj.bgImg,
      events: obj.events
        ?.map((ev: any) => {
          if (ev.info) {
            ev.info.body = (
              <Body
                event={ev}
                Element={ev.body}
                fns={fns}
                D={D}
                eventId={ev._id}
              />
            );
          }
          return ev;
        })
        .concat({
          startDate: moment(),
          endDate: moment(),
          info: {
            text: "",
            img: "https://titanesports.org:7000/static/media/tesbg.png",
            body: (
              <ManageEvent
                fns={fns}
                D={D}
                script={script}
                type={type}
                date={obj.date}
              />
            ),
          },
        }),
      body: () => {
        return (
          <div
            className={`arclight-flex arclight-flex-col arclight-justify-center arclight-align-middle arclight-w-full arclight-h-full arclight-rounded`}
          >
            {obj.body}
          </div>
        );
      },
    });
  };
  React.useEffect(() => {
    if (
      script &&
      !D?.getscripts?.records?.totalcount &&
      fns?.calls?.getscripts
    ) {
      fns.calls.getscripts();
    }
    if ((script || type) && fns?.calls?.getrecords_event) {
      fns.calls.getrecords_event({
        search,
      });
    }
  }, []);
  React.useEffect(() => {
    if (D?.getrecords_event?.init?.records) {
      setState({
        ...state,
        events: D.getrecords_event.init.records.map((e: any) => ({
          _id: e._id,
          startDate: moment(e.startDate),
          endDate: moment(e.endDate),
          recurrence: e.recurrence,
          script: e.script,
          info: {
            text: e.title,
            img: e.img,
            body: e.jsx,
          },
        })),
      });
    }
    if (
      D.serversuccess &&
      D.serversuccess !== successRef.current &&
      D.getrecords_event
    ) {
      fns.calls.getrecords_event({
        search,
      });
    }
    successRef.current = D.serversuccess;
  }, [D]);
  return state?.events && (!script || D?.getscripts) ? (
    <div className={`arclight-bg-background-secondary arclight-rounded`}>
      <LargeView
        manageEvent={(date: any) => (
          <ManageEvent
            fns={fns}
            D={D}
            script={script}
            type={type}
            date={date}
          />
        )}
        body={(eventId: string, Element: JSX.Element) => (
          <Body
            event={state.events[0]}
            Element={Element}
            fns={fns}
            D={D}
            eventId={eventId}
          />
        )}
        defaultEventBgImg={defaultEventBgImg}
        moment={moment}
        state={state}
        setState={setState}
        callModal={callModal}
        events={state.events ? state.events : []}
      />
    </div>
  ) : null;
};

export default Calendar;
