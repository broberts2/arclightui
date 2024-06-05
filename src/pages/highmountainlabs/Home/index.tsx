import React, { FC } from "react";
import { ArticlePage, FontAwesome, Page } from "../../../components";
import Styles from "./styles";
import init from "../../../projectcomponents/init";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const text = "Highmountain Labs";
  const [showText, setShowText] = React.useState("");
  React.useEffect(() => init(fns, D), [fns]);
  React.useEffect(() => {
    const re = async (_t = "") => {
      if (!_t.length) await new Promise((r) => setTimeout(r, 8000));
      if (showText.length < text.length) {
        setShowText(_t + text.charAt(_t.length));
        await new Promise((r) => setTimeout(r, 50));
        return await re(_t + text.charAt(_t.length));
      }
    };
    re();
  }, []);
  return D && fns.calls && D.getrecords_settings ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: D.getrecords_settings.init.records[0].highmountainlabsbg,
        loop: false,
        opacity: 0.5,
      }}
    >
      <div className={`arclight-h-screen arclight-flex`}>
        <Styles.ImgContainer
          mountAnim={{
            anim: "fadeIn",
            duration: "2s",
            delay: `4s`,
          }}
          className={`arclight-m-auto arclight-text-center arclight-flex-col arclight-space-y-3 arclight-pointer-events-none`}
        >
          <img
            src={`https://highmountainlabs.io/cdn/arclight/media/highmountainlabs.png`}
            className={`arclight-w-56 arclight-m-auto`}
          />
          <Styles.TextContainer
            mountAnim={{
              anim: "fadeIn",
              duration: "1s",
              delay: `5.5s`,
            }}
            className={`arclight-text-2xl arclight-flex arclight-space-x-3`}
          >
            <FontAwesome icon={"chevron-right"} size={"md"} />
            <div>{showText}</div>
            {showText.length < text.length ? (
              <Styles.Cursor>_</Styles.Cursor>
            ) : null}
          </Styles.TextContainer>
        </Styles.ImgContainer>
      </div>
    </Page>
  ) : null;
};

export default Home;
