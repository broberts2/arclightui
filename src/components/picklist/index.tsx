import React, { FC } from "react";
import Styles from "./styles";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField as _TextField,
} from "@mui/material";
import __TextField from "../textfield";
import Checkbox from "../checkbox";
import Button from "../button";
import Loader from "../loader";

const _picklistSizeLimit = 10;

export interface PropTypes {
  unlinked?: boolean;
  type?: string;
  span?: boolean | null;
  keyname: number | string;
  label: string;
  variant: any;
  onChange: Function;
  hot?: boolean;
  value?: string | Array<any>;
  list: Array<{ value: any; text: string }>;
  multiple?: boolean;
  disallowNone?: boolean;
  D: any;
  fns: any;
  id?: any;
  searchkey?: string;
}

const __val = (obj: any, value: boolean = false) => {
  if (!obj.D) return;
  const _ = obj.label === "model";
  if (
    _ &&
    obj.D.getdatamodels &&
    obj.D.getdatamodels[`model__${obj.label}value-${obj.keyname}`]
  ) {
    return obj.D.getdatamodels[`model__${obj.label}value-${obj.keyname}`];
  } else if (
    obj.D[`getrecords_${obj.type}`] &&
    obj.D[`getrecords_${obj.type}`][`${obj.label}`]
  ) {
    return obj.D[`getrecords_${obj.type}`][
      `${obj.label}${value ? "value" : ""}`
    ];
  }
};

const __condition1 = (obj: any) => {
  return !obj.loading && !obj.disableSearch && __val(obj);
};

const __renderValue = (obj: {
  D: any;
  type?: string;
  label: string;
  keyname: string | number;
  list?: any;
  value?: any;
  unlinked?: boolean;
}) => {
  const v = obj.unlinked
    ? {
        records: Array.isArray(obj.value)
          ? obj.list.filter((el: any) => obj.value.includes(el.value))
          : [obj.list.find((el: any) => el.value === obj.value)],
      }
    : __val(obj, true);
  if (v && v.records) {
    return v.records
      .map((_: any) => {
        if (!_) return;
        const arr = ["_type", "username", "name", "text"];
        for (let i = 0; i < arr.length; i++) if (_[arr[i]]) return _[arr[i]];
      })
      .join(", ");
  }
  return "";
};

const __query = (obj: any) => {
  const _ = obj.type === "model";
  const __ = obj.label === "model";
  if (!__ && obj.fns.calls[_ ? "getdatamodels" : `getrecords_${obj.type}`]) {
    obj.fns.calls[_ ? "getdatamodels" : `getrecords_${obj.type}`]({
      index: !_ ? obj.label : undefined,
      search: {
        [obj.searchkey]: obj.searchFilterValue
          ? { $regex: obj.searchFilterValue, $options: "i" }
          : undefined,
        limit: _picklistSizeLimit,
        skip: obj.skip * _picklistSizeLimit,
      },
    });
  }
  if (obj.value && obj.value.length) {
    if (!obj.fns.calls[__ ? `getdatamodels` : `getrecords_${obj.type}`]) return;
    const _id = Array.isArray(obj[__ ? "id" : "value"])
      ? { $in: obj[__ ? "id" : "value"] }
      : obj[__ ? "id" : "value"];
    obj.fns.calls[__ ? `getdatamodels` : `getrecords_${obj.type}`]({
      index: `${__ ? "model__" : ""}${obj.label}value${
        __ ? `-${obj.keyname}` : ""
      }`,
      search: {
        _id,
      },
    });
  }
};

const PickList: FC<PropTypes> = ({
  type,
  multiple,
  keyname,
  label,
  variant,
  span,
  onChange,
  hot,
  value,
  list,
  disallowNone,
  D,
  fns,
  id,
  unlinked,
  searchkey,
}) => {
  const [_searchkey, setSearchKey] = React.useState(searchkey);
  const [skip, setSkip] = React.useState(0);
  const [loading, setLoading] = React.useState(!unlinked && id);
  const [searchFilterValue, setSearchFilterValue] = React.useState<
    string | undefined
  >(undefined);
  const None =
    !loading && !multiple && !disallowNone ? (
      <MenuItem value="" sx={{ backgroundColor: "transparent" }}>
        <div className={`arclight-text-text-primary arclight-font-primary`}>
          <em>None</em>
        </div>
      </MenuItem>
    ) : null;
  const Items =
    list && !loading ? (
      list
        .concat({ value, text: "" })
        .map((el: { value: any; text: string }) => {
          return (
            <MenuItem
              value={el.value}
              sx={{
                backgroundColor: "transparent",
                display: !el.text || !el.text.length ? "none" : "",
              }}
            >
              <div
                className={`arclight-text-text-primary arclight-font-primary`}
              >
                {multiple ? (
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Checkbox
                            value={
                              value && Array.isArray(value)
                                ? value.some((val: any) => val === el.value)
                                : false
                            }
                          />
                        </td>
                        {multiple ? <td>{el.text}</td> : null}
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  el.text
                )}
              </div>
            </MenuItem>
          );
        })
    ) : (
      <div style={{ minHeight: "180px" }}>
        <Loader loading={loading} />
      </div>
    );
  React.useEffect(() => {
    if (unlinked) return;
    setLoading(false);
  }, [D]);
  React.useEffect(() => {
    if (unlinked) return;
    if (!fns) return;
    __query({
      searchFilterValue,
      type,
      fns,
      label,
      value,
      skip,
      keyname,
      id,
      searchkey: _searchkey,
    });
  }, [skip]);
  return !(!Array.isArray(value) && multiple) ? (
    <Styles.Container span={span}>
      <FormControl
        variant={variant}
        style={{ width: "100%", textAlign: "left" }}
      >
        <InputLabel
          style={{
            color: "inherit",
            fontFamily: "inherit",
            width: "100%",
          }}
        >
          {label}
        </InputLabel>
        <Select
          multiple={multiple}
          value={value}
          renderValue={() => {
            return __renderValue({
              D,
              type,
              label,
              keyname,
              list,
              value,
              unlinked,
            });
          }}
          onOpen={() => {
            setSearchFilterValue(undefined);
            if (unlinked) return;
            setSkip(0);
            if (id) setLoading(true);
            __query({
              type,
              fns,
              label,
              value,
              skip,
              keyname,
              id,
              searchkey: _searchkey,
            });
          }}
          onChange={(d: any) => {
            if (hot) {
              if (!unlinked && d.target.value && d.target.value.length) {
                const _ = label === "model";
                const _id = _
                  ? id
                  : Array.isArray(d.target.value)
                  ? { $in: d.target.value }
                  : d.target.value;
                const index = _
                  ? `model__${label}value-${keyname}`
                  : `${label}value`;
                fns.calls[_ ? `getdatamodels` : `getrecords_${type}`]({
                  index,
                  search: {
                    _id,
                  },
                });
              }
              onChange(d);
            }
          }}
          onBlur={(d: any) => {
            if (!hot) onChange(d);
          }}
          style={{
            color: "inherit",
            fontFamily: "inherit",
            width: "100%",
          }}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": {
                backgroundColor: "rgb(32,32,32)",
              },
              "&& .Mui-selected": {
                //backgroundColor: "pink",
              },
            },
            //transitionDuration: 200
          }}
        >
          {__condition1({ D, loading, type, keyname, label }) ? (
            <div
              className={`arclight-text-text-primary arclight-font-primary arclight-m-5 arclight-mb-0 arclight-mt-0 arclight-max-w-sm`}
            >
              <__TextField
                value={searchFilterValue}
                hot={hot}
                onChange={(data: any) =>
                  setSearchFilterValue(data.target.value)
                }
                type={"text"}
                key={1}
                label={"Search"}
                variant="standard"
              />
              <div
                className={`arclight-flex arclight-flex-row arclight-justify-start`}
              >
                <Button
                  label={"Search"}
                  idleIcon={null}
                  type={"button"}
                  size={"normal"}
                  animation={true}
                  className={`arclight-m-1 lg:arclight-block`}
                  onClick={() => {
                    __query({
                      searchFilterValue,
                      type,
                      fns,
                      label,
                      value,
                      skip,
                      keyname,
                      id,
                      searchkey: _searchkey,
                    });
                    setSkip(0);
                  }}
                />
                <div
                  className={`arclight-flex arclight-flex-row arclight-justify-end arclight-w-full`}
                >
                  <Button
                    label={"Last"}
                    idleIcon={"arrow-left"}
                    type={"button"}
                    size={"normal"}
                    animation={true}
                    className={`arclight-m-1 lg:arclight-block ${
                      skip < 1
                        ? `arclight-opacity-30 arclight-pointer-events-none`
                        : ""
                    }`}
                    onClick={() => setSkip(skip - 1)}
                  />
                  <Button
                    label={"Next"}
                    idleIcon={"arrow-right"}
                    type={"button"}
                    size={"normal"}
                    animation={true}
                    className={
                      D[`getrecords_${type}`] && D[`getrecords_${type}`][label]
                        ? `arclight-m-1 lg:arclight-block ${
                            skip * _picklistSizeLimit >
                            D[`getrecords_${type}`][label].totalcount -
                              _picklistSizeLimit
                              ? `arclight-opacity-30 arclight-pointer-events-none`
                              : ""
                          }`
                        : ``
                    }
                    onClick={() => setSkip(skip + 1)}
                  />
                </div>
              </div>
            </div>
          ) : null}
          {None}
          {Items}
        </Select>
      </FormControl>
    </Styles.Container>
  ) : null;
};

export default PickList;
