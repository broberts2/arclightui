import React, { FC } from "react";
import Styles from "./styles";
import Button from "../button";
import TextField from "../textfield";

export interface PropTypes {
  minHeight: number;
  textField: any;
  buttons?: Array<{
    icon: string | null;
    text: string | null;
    key: string | null;
  }> | null;
  className?: string | null;
  children: JSX.Element | JSX.Element[];
  constrain?: boolean;
  hot?: boolean;
  pagination?: any;
  btnActive?: number;
  setBtnActive?: Function;
  search?: any;
  picklist?: boolean;
}

const SearchControls: FC<PropTypes> = ({
  minHeight,
  textField,
  buttons,
  className,
  children,
  constrain,
  hot,
  pagination,
  btnActive,
  setBtnActive,
  search,
  picklist,
}) => {
  const [searchKey, setSearchKey] = React.useState(
    buttons ? buttons[0].key : null
  );
  const a = pagination ? pagination.skip * pagination.length + 1 : null;
  const b = pagination
    ? pagination.skip * pagination.length + pagination.length
    : null;
  const c = pagination ? pagination.totalcount : null;
  const bb = pagination ? (b > c ? c : b) : null;
  const NextLast = (props) => (
    <React.Fragment>
      <Button
        className={`arclight-hidden arclight-m-1 lg:arclight-block arclight-min-w-max ${
          pagination.skip > 0
            ? "arclight-pointer-events-auto"
            : "arclight-opacity-30 arclight-pointer-events-none"
        }`}
        label={"Last"}
        idleIcon={"arrow-left"}
        type={"button"}
        size={"normal"}
        animation={true}
        onClick={(status: any) => pagination.onClick(-1)}
      />
      <Button
        className={`arclight-block arclight-m-1 lg:arclight-hidden ${
          pagination.skip > 0
            ? "arclight-pointer-events-auto"
            : "arclight-opacity-30 arclight-pointer-events-none"
        }`}
        label={props.isTop ? undefined : "Last"}
        idleIcon={"arrow-left"}
        type={"button"}
        size={"small"}
        animation={true}
        onClick={(status: any) => pagination.onClick(-1)}
      />
      <Button
        className={`arclight-hidden arclight-m-1 lg:arclight-block ${
          (pagination.skip + 1) * pagination.length < pagination.totalcount
            ? "arclight-pointer-events-auto"
            : "arclight-opacity-30 arclight-pointer-events-none"
        } arclight-min-w-max`}
        label={"Next"}
        idleIcon={"arrow-right"}
        type={"button"}
        size={"normal"}
        animation={true}
        onClick={(status: any) => pagination.onClick(1)}
      />
      <Button
        className={`arclight-block arclight-m-1 lg:arclight-hidden ${
          (pagination.skip + 1) * pagination.length < pagination.totalcount
            ? "arclight-pointer-events-auto"
            : "arclight-opacity-30 arclight-pointer-events-none"
        }`}
        label={props.isTop ? undefined : "Next"}
        idleIcon={"arrow-right"}
        type={"button"}
        size={"small"}
        animation={true}
        onClick={(status: any) => pagination.onClick(1)}
      />
    </React.Fragment>
  );
  return (
    <Styles.Container
      picklist={picklist}
      className={`arclight-text-text-primary arclight-font-primary ${className}`}
    >
      {textField ? (
        <div style={{ textAlign: "left" }}>
          <TextField
            value={textField?.value}
            hot={hot}
            onChange={(data: string) => {
              if (textField && textField.onChange) textField.onChange(data);
            }}
            type={"text"}
            key={1}
            label={textField.label}
            variant="standard"
          />
        </div>
      ) : null}
      {buttons && search ? (
        <React.Fragment>
          <div className={`arclight-flex arclight-flex-row`}>
            <Button
              label={"Search"}
              idleIcon={null}
              type={"button"}
              size={"normal"}
              animation={true}
              className={`arclight-hidden arclight-m-1 lg:arclight-block`}
              onClick={() =>
                search
                  ? search.onSubmit(
                      searchKey ? searchKey : "name",
                      textField?.value
                    )
                  : null
              }
            />
            <Button
              label={"Search"}
              idleIcon={null}
              type={"button"}
              size={"small"}
              animation={true}
              className={`arclight-block arclight-m-1 lg:arclight-hidden`}
              onClick={() =>
                search
                  ? search.onSubmit(
                      searchKey ? searchKey : "name",
                      search.value
                    )
                  : null
              }
            />
            <NextLast isTop={true} />
            <div
              className={`arclight-hidden arclight-flex-row arclight-justify-end arclight-w-full lg:arclight-flex`}
            >
              {buttons.map((b: any, i) => (
                <Button
                  label={b.text ? b.text : null}
                  idleIcon={b.icon ? b.icon : null}
                  type={"button"}
                  size={"normal"}
                  animation={true}
                  className={`arclight-m-1 ${
                    i === btnActive ? "" : "arclight-opacity-30"
                  }`}
                  onClick={() => {
                    if (setBtnActive) setBtnActive(i);
                    setSearchKey(b.key);
                  }}
                />
              ))}
            </div>
            <div
              className={`arclight-flex arclight-flex-row arclight-justify-end arclight-w-full lg:arclight-hidden`}
            >
              {buttons.map((b: any, i) => (
                <Button
                  label={null}
                  idleIcon={b.icon ? b.icon : null}
                  type={"button"}
                  size={"small"}
                  animation={true}
                  className={`arclight-m-1 ${
                    i === btnActive ? "" : "arclight-opacity-30"
                  }`}
                  onClick={() => {
                    if (setBtnActive) setBtnActive(i);
                    setSearchKey(b.key);
                  }}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ) : null}
      {(pagination && pagination.totalcount) ||
      (Array.isArray(children) && children.length > 1) ||
      true ? (
        <div style={{ minHeight: minHeight + 25 }}>
          <Styles.Children
            className={`arclight-relative arclight-z-0 arclight-h-full`}
            style={{ height: `${!constrain ? `100%` : null}` }}
          >
            {children}
          </Styles.Children>
        </div>
      ) : (
        <div
          className={`arclight-absolute arclight-top-1/2 arclight-left-1/2 -arclight-translate-x-1/2 -arclight-translate-y-1/2`}
        >
          No Data
        </div>
      )}
      <div
        className={`arclight-absolute arclight-w-full arclight-pointer-events-none arclight-bottom-0`}
        style={{
          top: constrain ? "100%" : "125%",
          display: Array.isArray(children) && children.length > 1 ? "" : "",
        }}
      >
        {pagination && pagination.totalcount ? (
          <div
            className={`arclight-flex arclight-items-center arclight-justify-center`}
          >
            <NextLast />
          </div>
        ) : null}
        {pagination && pagination.totalcount ? (
          <div className="arclight-text-center arclight-pointer-events-auto">
            <div
              className={
                "arclight-text-text-primary arclight-font-primary arclight-text-lg"
              }
            >
              Showing {a}-{bb} of {c}
            </div>
          </div>
        ) : null}
      </div>
    </Styles.Container>
  );
};

export default SearchControls;
