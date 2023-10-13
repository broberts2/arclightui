import React, { FC } from "react";
import Styles from "./styles";
import Button from "../../button";
import Picklist from "../../picklist";
import FontAwesome from "../../fontawesome/index";
import Loader from "../../loader";
import controlselector from "./controlselector";
import Item from "./item";

const Bttn = (props: { a: Function; t: string; span?: boolean }) => (
  <Button
    span={props.span}
    label={props.t}
    type={"button"}
    size={"md"}
    animation={true}
    disabled={false}
    block={false}
    rounded={false}
    square={false}
    isIconButton={false}
    onClick={(status: any) => props.a()}
  />
);

const FlexPanel: FC<{
  className?: string | object;
  items: any;
  cols: number;
  callresolved: number;
  D: any;
  searchOn: string;
  noSelect?: string;
  fns: { [key: string]: any };
  publicURI: string;
}> = ({
  className,
  items,
  cols,
  callresolved,
  D,
  searchOn,
  noSelect,
  fns,
  publicURI,
}) => {
  const activePanel = fns.parseAdminDomainState().activePanel;
  const defState: { [key: string]: any } = {
    _isLoading: false,
    _id: fns.parseAdminDomainState().id ? fns.parseAdminDomainState().id : null,
  };
  const [state, setState] = React.useState(defState);
  state._items = items.map((fn: any) => fn(state, setState));
  const [colNum, setColNum] = React.useState(cols);
  const resize = (n: number) => {
    if (n < 768) setColNum(1);
    else if (n < 1280) setColNum(2);
    else setColNum(cols);
  };
  const rows: any = [];
  let row: any = [];
  for (let i = 0; i < state._items.length; i++) {
    state[`_waitingItems${state._items[i].bound}`] = false;
    if (state._items.bound && state._items[i].boundOpen)
      state[`_showingItems${state._items[i].bound}`] = true;
    if (i % colNum === 0 && i > 0) {
      rows.push(<tr>{row}</tr>);
      row = [];
    }
    const map: { [key: string]: number } = {};
    row.push(
      <Item
        managed={state._items[i].managed}
        D={D}
        Bttn={Bttn}
        Picklist={Picklist}
        Styles={Styles}
        listquery={state._items[i].listquery}
        fns={fns}
        constrain={state._items[i].constrain}
        title={state._items[i].title}
        state={state}
        backgroundImg={state._items[i].backgroundImg}
        setState={(s: Object) => setState(s)}
        onCreate={state._items[i].onCreate}
        onSubmit={state._items[i].onSubmit}
        onUpdate={state._items[i].onUpdate}
        onDelete={state._items[i].onDelete}
        onBack={state._items[i].onBack}
        onAddField={state._items[i].onAddField}
        onExecute={state._items[i].onExecute}
        onRecursiveInit={state._items[i].onRecursiveInit}
        onLog={state._items[i].onLog}
        onPublicRead={state._items[i].onPublicRead}
        onPublicCreate={state._items[i].onPublicCreate}
        onPublicEdit={state._items[i].onPublicEdit}
        onPublicDelete={state._items[i].onPublicDelete}
        onOwnerRead={state._items[i].onOwnerRead}
        onOwnerCreate={state._items[i].onOwnerCreate}
        onOwnerEdit={state._items[i].onOwnerEdit}
        onOwnerDelete={state._items[i].onOwnerDelete}
        onAccessType={state._items[i].onAccessType}
        onScript={state._items[i].onScript}
        active={
          state._items[i].bound
            ? state[`_showingItems${state._items[i].bound}`]
            : cols === 0
            ? activePanel === i
            : true
        }
      >
        {state._items[i].bound ? (
          <FontAwesome
            size={"lg"}
            icon={"chain"}
            className={`arclight-absolute arclight-top-5 arclight-right-5 lg:arclight-top-10 lg:arclight-right-10`}
          />
        ) : null}
        {state._items[i].controls
          ? state._items[i].controls.map((c: any, i: number) => {
              return controlselector({
                c,
                D,
                state,
                searchOn,
                i,
                setState,
                fns,
                Bttn,
                publicURI,
              });
            })
          : null}
      </Item>
    );
  }
  if (row && row.length > 0) rows.push(<tr>{row}</tr>);
  React.useEffect(() => {
    if (callresolved) {
      if (callresolved > 1) {
        fns.setAdminDomainState({
          ...fns.parseAdminDomainState(),
          activePanel: fns.parseAdminDomainState().activePanel - 1,
        });
        if (state._primemodal) state._primemodal(D);
      }
      setState((_: any) => ({
        ..._,
        _id: callresolved < 2 ? _._id : null,
        _isLoading: false,
        _primemodal: undefined,
      }));
    }
  }, [callresolved]);
  React.useEffect(() => {
    resize(window.innerWidth);
    window.addEventListener("resize", (n: any) => {
      const _ = n.currentTarget.innerWidth;
      resize(_);
    });
  }, []);
  return (
    <Styles.Container
      className={`arclight-p-2 ${
        state._isLoading ? "arclight-pointer-events-none" : null
      }`}
    >
      {!state._isLoading && rows && row && row.length ? (
        <Styles.Table
          className={`arclight-h-full arclight-text-text-primary arclight-font-primary`}
        >
          <tbody>{rows}</tbody>
        </Styles.Table>
      ) : noSelect ? (
        <Styles.NoSelect mountAnim={{ anim: "fadeIn", duration: "0.5s" }}>
          <img
            src={noSelect}
            className={
              "arclight-w-1/2 md:arclight-w-1/4 arclight-m-auto arclight-justify-center arclight-align-middle"
            }
          />
        </Styles.NoSelect>
      ) : null}
      <Loader loading={state._isLoading} />
    </Styles.Container>
  );
};

export default FlexPanel;
