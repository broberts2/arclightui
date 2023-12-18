import React, { FC } from "react";
import Card from "../card";
import Styles from "./styles";

export interface PropTypes {
  defaultBackground: string;
  setModal: Function;
  modal: {
    events?: Array<any>;
    bgImg?: string;
    noescape?: boolean;
    mode?: boolean;
    body?: JSX.Element;
  } | null;
  fns: any;
  D: any;
}

let M = false;

const Modal: FC<PropTypes> = ({
  defaultBackground,
  modal,
  setModal,
  fns,
  D,
}) => {
  let Body;
  if (modal) M = true;
  if (modal && modal.body) Body = modal.body;
  const [exitButton, setExitButton] = React.useState(true);
  React.useEffect(() => fns.scrollLock(modal ? true : false), [modal]);
  const [activeEvent, setActiveEvent] = React.useState(0);
  return (
    <div
      className={`arclight-absolute arclight-top-0 ${
        M ? `arclight-opacity-100` : `arclight-opacity-0`
      }`}
      style={{
        pointerEvents: !modal ? "none" : "auto",
      }}
    >
      <Styles.Container>
        <Styles.Backdrop
          onClick={() => (modal && !modal.noescape ? setModal(null) : null)}
          className={`arclight-bg-visibility-primary ${
            modal ? "arclight-opacity-100" : "arclight-opacity-0"
          } arclight-transition-opacity arclight-duration-300`}
        ></Styles.Backdrop>
        <Styles.Element
          className={`arclight-flex arclight-justify-center relative`}
        >
          <Card
            modal={true}
            exitButton={
              exitButton
                ? () => {
                    setActiveEvent(0);
                    setModal(null);
                  }
                : undefined
            }
            mountAnim={{
              anim: modal ? "zoomIn" : "zoomOut",
              duration: "0.25s",
              delay: `0s`,
            }}
            hover={{
              onMouseEnter: () => {},
              onMouseLeave: () => {},
            }}
            bgImg={modal && modal.bgImg ? modal.bgImg : defaultBackground}
            bodyComponent={
              modal?.body ? (
                <div className={`relative arclight-w-full arclight-h-full`}>
                  {modal.events && modal.events.length ? (
                    <div
                      className={`arclight-bg-background-primary arclight-absolute arclight-left-0 arclight-top-3 -arclight-translate-x-44 arclight-w-40 flex-col arclight-space-y-1 arclight-border-0 arclight-rounded arclight-pr-6`}
                    >
                      <div className={`arclight-text-lg`}>Events</div>
                      {modal.events.map((el: any, i: number) => {
                        return (
                          <div className={``}>
                            <Card
                              className={`arclight-border-[1px] arclight-border-white arclight-rounded`}
                              active={activeEvent === i}
                              linesmall
                              hover={{
                                onMouseEnter: () => {},
                                onMouseLeave: () => {},
                              }}
                              bgImg={el.info.img}
                              bodyComponent={
                                <div className={`arclight-text-xs`}>
                                  {el._id ? el.info.text : "+ New Event"}
                                </div>
                              }
                              onClick={() => {
                                const Body = modal?.events ? (
                                  modal.events[i].info.body
                                ) : (
                                  <div />
                                );
                                setActiveEvent(i);
                                setModal({
                                  noescape: modal.noescape,
                                  body: () => (
                                    <div
                                      className={`arclight-flex arclight-flex-col arclight-justify-center arclight-align-middle arclight-w-full arclight-h-full arclight-rounded`}
                                    >
                                      {Body}
                                    </div>
                                  ),
                                  events: modal.events,
                                  bgImg: el.info.img,
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  <Body
                    setExitButton={setExitButton}
                    D={D}
                    fns={fns}
                    setModal={setModal}
                  />
                </div>
              ) : null
            }
            onClick={() => null}
          />
        </Styles.Element>
      </Styles.Container>
    </div>
  );
};

export default Modal;
