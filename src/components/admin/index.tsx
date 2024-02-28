import { FC } from "react";
import Styles from "./styles";
import Drawer from "../drawer";
import AuthPage from "../authpage";
import FlexPanel from "./flexpanel";
import Page from "../page";
import Panels from "./panels/index";

import { useMediaQuery } from "react-responsive";

import database from "./indexitems/database";
import integration from "./indexitems/integration";
import script from "./indexitems/script";
import report from "./indexitems/reportsitems";
import form from "./indexitems/formsitems";
import app from "./indexitems/app";

import constructFromRecordList from "./stfns/constructfromrecordlist";
import constructFromDataModel from "./stfns/constructfromdatamodel";
import parseCode from "./stfns/parsecode";

const _HIDE_BREAKPOINT = "lg";

// const ItemsArray = [database, integration, event, script, report, form, app];
const ItemsArray = [database, integration, script, app, form];

const Admin: FC<{
  fns: {
    [key: string]: any;
  };
  backgroundImage: string;
  authBackgroundImage: string;
  D: { [key: string]: any };
  noSelect?: string;
  endpoint: string;
}> = ({ fns, backgroundImage, authBackgroundImage, D, noSelect, endpoint }) => {
  let authenticated = false;
  const Constructors: { [key: string]: any } = {
    constructFromRecordList: constructFromRecordList(D),
    constructFromDataModel: constructFromDataModel(D),
  };
  const iArray: { [key: string]: any } = [];
  ItemsArray.map((fn: Function) => {
    const _: { items: any; icon: string; text: string; cond: boolean } = fn(
      D,
      fns
    );
    if (_.cond) {
      authenticated = true;
      iArray.push(
        Object.assign(
          {
            color: "lightgray",
            italic: true,
            isExpanded: fns.parseAdminDomainState().section === _.text,
            onClick: () =>
              fns.setAdminDomainState(
                fns.parseAdminDomainState().section === _.text
                  ? undefined
                  : { section: _.text }
              ),
          },
          _
        )
      );
    }
  });
  return (
    <Styles.Container>
      <Page
        fns={fns}
        backgroundImage={{
          src: backgroundImage
            ? backgroundImage
            : `http://highmountainlabs.io/cdn/arclight/media/1.jpg`,
          opacity: 0.5,
        }}
      >
        <Styles.Body
          className={`arclight-flex arclight-flex-row xs:max-${_HIDE_BREAKPOINT}:arclight-hidden`}
        >
          <Styles.Drawer
            className={`arclight-block ${
              !authenticated ? "arclight-hidden" : ""
            }`}
          >
            <Drawer
              autoSort
              headerImg={
                useMediaQuery({ query: "(min-width: 1024px)" })
                  ? noSelect
                    ? noSelect
                    : `http://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png`
                  : undefined
              }
              startOpen={useMediaQuery({ query: "(min-width: 1024px)" })}
              locked={useMediaQuery({ query: "(min-width: 1024px)" })}
              animation={"slide"}
              buttonSide="left"
              side="left"
              items={iArray.sort((a: any, b: any) =>
                a.text < b.text ? -1 : 1
              )}
              signOut={() => fns.signOut()}
            />
          </Styles.Drawer>
          <Styles.Content>
            {!authenticated ? (
              <AuthPage
                headless
                disableNewRegistration
                fns={fns}
                D={D}
                authBackgroundImage={
                  authBackgroundImage
                    ? authBackgroundImage
                    : `http://highmountainlabs.io/cdn/arclight/media/2.jpg`
                }
                OATHOnly={false}
                OATH={[
                  {
                    type: "discord",
                    onClick: () =>
                      fns.calls && fns.calls.DiscordOATH2
                        ? fns.calls.DiscordOATH2({
                            domain: fns.readState().subdomain,
                          })
                        : null,
                  },
                ]}
              />
            ) : null}
            {authenticated && Object.keys(fns.calls).length ? (
              <FlexPanel
                publicURI={endpoint}
                fns={fns}
                noSelect
                D={D}
                searchOn={fns.parseAdminDomainState().item}
                callresolved={
                  D?.serversuccess ||
                  D?.servererror ||
                  D?.serverwarning ||
                  D?.servermessage
                    ? parseCode(D)
                    : 0
                }
                cols={0}
                items={Panels(D, Constructors, fns, endpoint)}
              />
            ) : null}
          </Styles.Content>
        </Styles.Body>
        <div
          className={`${_HIDE_BREAKPOINT}:arclight-hidden arclight-absolute arclight-left-1/2 arclight-top-1/2 -arclight-translate-x-1/2 -arclight-translate-y-1/2`}
        >
          <div className={`arclight-flex arclight-justify-center`}>
            <img
              src={`http://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png`}
              className={`arclight-w-44`}
            />
          </div>
          <div className={`arclight-flex arclight-justify-center`}>
            <div className={`arclight-mx-10 arclight-text-lg arclight-w-64`}>
              Arclight does not currently support this viewport.
            </div>
          </div>
        </div>
      </Page>
    </Styles.Container>
  );
};

export default { default: Admin };
