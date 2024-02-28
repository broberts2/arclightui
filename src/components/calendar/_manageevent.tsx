import React, { FC } from "react";
import moment from "moment";
import DateSelector from "../dateselector";
import TextField from "../textfield";
import Monaco from "../monaco";
import Button from "../button";
import PickList from "../picklist";
import Styles from "./styles";

export interface PropTypes {
  D: { [key: string]: any };
  fns: { [key: string]: any };
  script?: boolean;
  type?: string;
  date?: any;
  event?: any;
}

const NewEvent: FC<PropTypes> = ({ D, fns, script, type, date, event }) => {
  const [state, setState] = React.useState<any>({
    startDate: event?.startDate ? event.startDate : date,
    endDate: event?.endDate ? event.endDate : date,
    recurrence: event?.recurrence,
    title: event?.info.text,
    img: event?.info.img,
    script: event?.script,
  });
  return (
    <div className={`arclight-m-10`}>
      <div
        className={`arclight-bg-background-primary arclight-rounded arclight-p-10 arclight-flex-col arclight-space-y-2`}
      >
        <div className={`arclight-font-primary arclight-text-2xl`}>
          {event?._id ? "Edit" : "Create"} Event
        </div>
        <div
          className={`arclight-flex arclight-justify-center arclight-space-x-10`}
        >
          <DateSelector
            label={"Event Start Date"}
            value={state.startDate}
            onChange={(startDate: any) =>
              setState((_: any) => ({ ..._, startDate }))
            }
          />
          <DateSelector
            label={"Event End Date"}
            value={state.endDate}
            onChange={(endDate: any) =>
              setState((_: any) => ({ ..._, endDate }))
            }
          />
        </div>
        <TextField
          span
          hot
          value={state.title}
          label={"Event Title"}
          type={"text"}
          key={0}
          variant={"standard"}
          onChange={(e: any) =>
            setState((_: any) => ({ ..._, title: e.target.value }))
          }
        />
        {!script ? (
          <TextField
            span
            hot
            label={"Image Url"}
            type={"text"}
            key={0}
            variant={"standard"}
            onChange={(e: any) =>
              setState((_: any) => ({ ..._, img: e.target.value }))
            }
          />
        ) : null}
        <PickList
          unlinked
          D={D}
          fns={fns}
          span
          hot
          value={state.recurrence}
          list={[
            { value: "Yearly", text: "Yearly" },
            { value: "Semi-Yearly", text: "Semi-Yearly" },
            { value: "Quarterly", text: "Quarterly" },
            { value: "Monthly", text: "Monthly" },
            { value: "Bi-Weekly", text: "Bi-Weekly" },
            { value: "Weekly", text: "Weekly" },
            { value: "Daily", text: "Daily" },
            { value: "Hourly", text: "Hourly" },
            { value: "Semi-Hourly", text: "Semi-Hourly" },
            { value: "Quarter-Hourly", text: "Quarter-Hourly" },
            { value: "Ten Minutes", text: "Ten Minutes" },
            { value: "Five Minutes", text: "Five Minutes" },
            { value: "One Minute", text: "One Minute" },
          ]}
          onChange={(e: any) =>
            setState((_: any) => ({ ..._, recurrence: e.target.value }))
          }
          keyname={0}
          label={"Recurrence"}
          variant="standard"
        />
        {script && D?.getscripts ? (
          <PickList
            unlinked
            keyname={0}
            D={D}
            fns={fns}
            span
            hot
            value={state.script}
            list={
              D?.getscripts?.records?.universal
                ? Object.keys(D.getscripts.records.universal).map(
                    (k: string) => {
                      const _ = JSON.parse(
                        D.getscripts.records.universal[k].metadata
                      );
                      return {
                        value: _.name,
                        text: _.name,
                      };
                    }
                  )
                : []
            }
            onChange={(e: any) =>
              setState((_: any) => ({ ..._, script: e.target.value }))
            }
            key={0}
            label={"Script"}
            variant="standard"
            searchkey={"name"}
          />
        ) : null}
        {!script ? (
          <div>
            <div className={`arclight-text-md arclight-text-left`}>JSX</div>
            <div className={`arclight-h-44`}>
              <Monaco
                refName={"jsx"}
                language={"jsx"}
                defaultValue={""}
                state={state}
                setState={setState}
              />
            </div>
          </div>
        ) : null}
        <Button
          span
          disabled={false}
          label={`${event?._id ? "Update" : "Create"} Event`}
          type={"submit"}
          size={"normal"}
          animation={true}
          onClick={(e: any) => {
            const __: any = {};
            if (state?.MonacoRef?.jsx?.current?.getValue) {
              __.jsx = state.MonacoRef.jsx.current.getValue();
            }
            for (let k in state) {
              if (k !== "MonacoRef") {
                __[k] = state[k];
              }
            }
            if (script) {
              delete __.jsx;
              __.img = "https://highmountainlabs.io/cdn/arclight/media/js.jpg";
            }
            const _obj = fns?.calls;
            const n = event?._id
              ? "updaterecords_event"
              : "createrecords_event";
            if (_obj && _obj[n]) {
              fns.calls[n](
                Object.assign(
                  {
                    _id: event?._id,
                    nopanelchange: true,
                    type: script ? "script" : type,
                  },
                  __
                )
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default NewEvent;
