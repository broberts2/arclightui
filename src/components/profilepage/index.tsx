import React, { FC } from "react";
import Button from "../button";
import Card from "../card";
import Timeline from "../timeline";
import Styles from "./styles";

export interface PropTypes {
  fns: any;
  Panel?: JSX.Element;
  title: string;
  panelImg: string;
  profileImg: string;
  timeline?: { bgVideo: string; elements: Array<{ [key: string]: any }> };
}

const ProfilePage: FC<PropTypes> = ({
  fns,
  Panel,
  title,
  panelImg,
  profileImg,
  timeline,
}) => {
  return (
    <div>
      <div className={`arclight-flex arclight-justify-end`}>
        <Button
          label={"Customize Page"}
          className={`arclight-mx-8`}
          // idleIcon={"gears"}
          type={"button"}
          size={"normal"}
          animation={true}
          onClick={(status: any) =>
            fns.setModal({
              noescape: true,
              body: (props) => <div>Shalom</div>,
            })
          }
        />
      </div>
      <Styles.Container
        className={`arclight-relative flex arclight-justify-center`}
      >
        <Styles.ProfileImg
          className={`arclight-absolute arclight-bg-background-secondary`}
        >
          <img
            src={profileImg}
            className={`arclight-border-2 arclight-border-l-4 arclight-border-r-4 arclight-border-b-8 arclight-border-background-tertiary`}
          />
        </Styles.ProfileImg>
        <Card
          max
          bgImg={panelImg}
          noBodyComponentAbsolute
          bodyComponent={
            <Styles.Content
              className={`arclight-mt-32 md:arclight-mt-60 arclight-mb-18 md:arclight-mb-24 arclight-flex arclight-flex-col arclight-space-y-0 arclight-w-full`}
            >
              <div className={`arclight-text-4xl md:arclight-text-6xl`}>
                {title}
              </div>
              {Panel}
            </Styles.Content>
          }
        />
      </Styles.Container>
      {timeline ? (
        <Timeline bgVideo={timeline.bgVideo} elements={timeline.elements} />
      ) : null}
    </div>
  );
};

export default ProfilePage;
