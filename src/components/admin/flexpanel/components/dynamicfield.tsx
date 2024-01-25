import React from "react";

export default (
  c: { [key: string]: any },
  i: Number,
  TextField: any,
  PickList: any,
  Checkbox: any,
  Bttn: any,
  state: { [key: string]: any },
  setState: Function,
  D: any,
  fns: any
) => {
  console.log(state[c.label].lookup);
  return state && state[c.label] && typeof state[c.label] === "object" ? (
    <div
      className={`arclight-border-background-quarternary arclight-border-l-2 arclight-p-4 arclight-flex-row arclight-justify-start arclight-space-y-4`}
    >
      <TextField
        span
        hot
        defaultValue={state[c.label].key}
        onChange={(e: any) =>
          setState((_: any) => ({
            ..._,
            [c.label]: {
              ...state[c.label],
              key: e.target.value,
            },
          }))
        }
        type={"text"}
        key={i}
        label={"key"}
        variant="standard"
      />
      <PickList
        unlinked
        disallowNone
        span
        hot
        value={state[c.label].type}
        list={[
          { value: "String", text: "String" },
          { value: "Number", text: "Number" },
          { value: "Boolean", text: "Boolean" },
          { value: "Array", text: "Array" },
          { value: "Date", text: "Date" },
          { value: "JSON", text: "JSON" },
        ].sort((a, b) => (a.text < b.text ? -1 : 1))}
        onChange={(e: any) =>
          setState((_: any) => ({
            ..._,
            [c.label]: {
              ...state[c.label],
              type: e.target.value,
              lookup: null,
            },
          }))
        }
        key={i}
        label={"type"}
        variant="standard"
      />
      {state[c.label].lookup &&
      !state[c.label].adminlookup &&
      D.getdatamodels &&
      D.getdatamodels.records ? (
        <PickList
          disallowNone
          span
          hot
          value={
            state[c.label].lookup &&
            D.getdatamodels.records.find(
              (R: any) => R._type === state[c.label].lookup
            )
              ? state[c.label].lookup
              : undefined
          }
          list={D.getdatamodels.records.map((el: any) => ({
            text: el._type,
            value: el._type,
            _id: el._id,
          }))}
          onChange={(e: any) => {
            return setState((_: any) => ({
              ..._,
              [c.label]: {
                ...state[c.label],
                lookup: e.target.value,
              },
            }));
          }}
          keyname={state[c.label].key}
          id={(() => {
            const _ = D.getdatamodels.records.find(
              (el: any) => el._type === state[c.label].lookup
            );
            if (_) return _._id;
          })()}
          label={"model"}
          variant="standard"
          type={state[c.label].lookup}
          fns={fns}
          D={D}
        />
      ) : null}
      {state[c.label].adminlookup ? (
        <TextField
          span
          hot
          defaultValue={state[c.label].adminlookup}
          onChange={(e: any) =>
            setState((_: any) => ({
              ..._,
              [c.label]: {
                ...state[c.label],
                adminlookup: e.target.value,
              },
            }))
          }
          type={"text"}
          key={i}
          label={"adminlookup"}
          variant="standard"
        />
      ) : null}
      <div
        className={`arclight-text-text-primary arclight-font-primary arclight-text-base arclight-flex arclight-justify-start`}
      >
        <div
          className={`arclight-m-auto ${
            state[c.label] &&
            state[c.label].type &&
            (state[c.label].type === "String" ||
              state[c.label].type === "Array")
              ? null
              : `arclight-opacity-30 arclight-pointer-events-none`
          }`}
        >
          <Checkbox
            value={state[c.label].lookup}
            onChange={(b: boolean, cb: Function) => {
              setState((_: any) => ({
                ..._,
                [c.label]: {
                  ...state[c.label],
                  lookup: b ? null : _[c.label],
                },
              }));
              cb(!b);
            }}
          />
        </div>
        <div
          className={`arclight-m-auto ${
            state[c.label] &&
            state[c.label].type &&
            (state[c.label].type === "String" ||
              state[c.label].type === "Array")
              ? null
              : `arclight-opacity-30 arclight-pointer-events-none`
          }`}
        >
          Lookup
        </div>
        {state[c.label].lookup ? (
          <React.Fragment>
            <div className={`arclight-m-auto`}>
              <Checkbox
                value={state[c.label].adminlookup ? true : false}
                onChange={(b: boolean, cb: Function) => {
                  setState((_: any) => ({
                    ..._,
                    [c.label]: {
                      ...state[c.label],
                      adminlookup: b ? undefined : "",
                    },
                  }));
                  cb(!b);
                }}
              />
            </div>
            <div className={`arclight-m-auto arclight-whitespace-nowrap`}>
              Admin Lookup
            </div>
          </React.Fragment>
        ) : null}
        <div className={`arclight-m-auto`}>
          <Checkbox
            value={state[c.label].required}
            onChange={(b: boolean, cb: Function) => {
              setState((_: any) => ({
                ..._,
                [c.label]: {
                  ...state[c.label],
                  required: b ? false : true,
                },
              }));
              cb(!b);
            }}
          />
        </div>
        <div className={`arclight-m-auto`}>Required</div>
        {/* <div className={`arclight-m-auto`}>
          <Checkbox
            value={state[c.label].searchable}
            onChange={(b: boolean, cb: Function) => {
              setState((_: any) => ({
                ..._,
                [c.label]: {
                  ...state[c.label],
                  searchable: b ? false : true,
                },
              }));
              cb(!b);
            }}
          />
        </div>
        <div className={`arclight-m-auto`}>Searchable</div> */}
        <div
          className={`arclight-flex arclight-justify-end arclight-w-full arclight-space-x-2`}
        >
          {!state[c.label].system || true ? (
            <Bttn
              t={"Remove"}
              a={() => {
                setState((_: any) => ({ ..._, [c.label]: undefined }));
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};
