import React from "react";

export default (obj: any) => {
  return obj.state &&
    obj.state[obj.c.label] &&
    typeof obj.state[obj.c.label] === "object" ? (
    <div
      className={`arclight-border-background-quarternary arclight-border-l-2 arclight-p-4 arclight-flex-row arclight-justify-start arclight-space-y-4`}
    >
      <obj.TextField
        span
        hot
        defaultValue={obj.state[obj.c.label].key}
        onChange={(e: any) =>
          obj.setState((_: any) => ({
            ..._,
            [obj.c.label]: {
              ...obj.state[obj.c.label],
              key: e.target.value,
            },
          }))
        }
        type={"text"}
        key={obj.i}
        label={"key"}
        variant="standard"
      />
      <obj.PickList
        unlinked
        disallowNone
        span
        hot
        value={obj.state[obj.c.label].type}
        list={[
          { value: "String", text: "String" },
          { value: "Number", text: "Number" },
          { value: "Boolean", text: "Boolean" },
          { value: "Array", text: "Array" },
          { value: "Date", text: "Date" },
          { value: "JSON", text: "JSON" },
        ].sort((a, b) => (a.text < b.text ? -1 : 1))}
        onChange={(e: any) =>
          obj.setState((_: any) => ({
            ..._,
            [obj.c.label]: {
              ...obj.state[obj.c.label],
              type: e.target.value,
              lookup: null,
            },
          }))
        }
        key={obj.i}
        label={"type"}
        variant="standard"
      />
      {obj.state[obj.c.label].lookup &&
      !obj.state[obj.c.label].adminlookup &&
      obj.D.getdatamodels &&
      obj.D.getdatamodels.records ? (
        <obj.PickList
          disallowNone
          span
          hot
          value={
            obj.state[obj.c.label].lookup &&
            obj.D.getdatamodels.records.find(
              (R: any) => R._type === obj.state[obj.c.label].lookup
            )
              ? obj.state[obj.c.label].lookup
              : undefined
          }
          list={obj.D.getdatamodels.records.map((el: any) => ({
            text: el._type,
            value: el._type,
            _id: el._id,
          }))}
          onChange={(e: any) => {
            return obj.setState((_: any) => ({
              ..._,
              [obj.c.label]: {
                ...obj.state[obj.c.label],
                lookup: e.target.value,
              },
            }));
          }}
          keyname={obj.state[obj.c.label].key}
          id={(() => {
            const _ = obj.D.getdatamodels.records.find(
              (el: any) => el._type === obj.state[obj.c.label].lookup
            );
            if (_) return _._id;
          })()}
          label={"model"}
          variant="standard"
          type={obj.state[obj.c.label].lookup}
          fns={obj.fns}
          D={obj.D}
        />
      ) : null}
      {obj.state[obj.c.label].adminlookup ? (
        <obj.TextField
          span
          hot
          defaultValue={obj.state[obj.c.label].adminlookup}
          onChange={(e: any) =>
            obj.setState((_: any) => ({
              ..._,
              [obj.c.label]: {
                ...obj.state[obj.c.label],
                adminlookup: e.target.value,
              },
            }))
          }
          type={"text"}
          key={obj.i}
          label={"adminlookup"}
          variant="standard"
        />
      ) : null}
      <div
        className={`arclight-text-text-primary arclight-font-primary arclight-text-base arclight-flex arclight-justify-start`}
      >
        <div
          className={`arclight-m-auto ${
            obj.state[obj.c.label] &&
            obj.state[obj.c.label].type &&
            (obj.state[obj.c.label].type === "String" ||
              obj.state[obj.c.label].type === "Array")
              ? null
              : `arclight-opacity-30 arclight-pointer-events-none`
          }`}
        >
          <obj.Checkbox
            value={obj.state[obj.c.label].lookup}
            onChange={(b: boolean, cb: Function) => {
              obj.setState((_: any) => ({
                ..._,
                [obj.c.label]: {
                  ...obj.state[obj.c.label],
                  lookup: b ? null : _[obj.c.label],
                },
              }));
              cb(!b);
            }}
          />
        </div>
        <div
          className={`arclight-m-auto ${
            obj.state[obj.c.label] &&
            obj.state[obj.c.label].type &&
            (obj.state[obj.c.label].type === "String" ||
              obj.state[obj.c.label].type === "Array")
              ? null
              : `arclight-opacity-30 arclight-pointer-events-none`
          }`}
        >
          Lookup
        </div>
        {obj.state[obj.c.label].lookup ? (
          <React.Fragment>
            <div className={`arclight-m-auto`}>
              <obj.Checkbox
                value={obj.state[obj.c.label].adminlookup ? true : false}
                onChange={(b: boolean, cb: Function) => {
                  obj.setState((_: any) => ({
                    ..._,
                    [obj.c.label]: {
                      ...obj.state[obj.c.label],
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
          <obj.Checkbox
            value={obj.state[obj.c.label].required}
            onChange={(b: boolean, cb: Function) => {
              obj.setState((_: any) => ({
                ..._,
                [obj.c.label]: {
                  ...obj.state[obj.c.label],
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
          {!obj.state[obj.c.label].system || true ? (
            <obj.Bttn
              t={"Remove"}
              a={() => {
                obj.setState((_: any) => ({ ..._, [obj.c.label]: undefined }));
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};
