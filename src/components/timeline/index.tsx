import React, { FC } from "react";
import Styles from "./styles";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import FontAwesome from "../fontawesome";
import Card from "../card";
import "react-vertical-timeline-component/style.min.css";

const DescComponent = (props: {
  title: string;
  text: string;
  date: string;
}) => (
  <Styles.DescriptionComponent
    className={`arclight-font-primary arclight-text-text-primary`}
  >
    <div className={`arclight-text-2xl`}>{props.title}</div>
    <div className={`arclight-text-lg`}>{props.text}</div>
    <div className={`arclight-text-sm`}>{props.date}</div>
  </Styles.DescriptionComponent>
);

const Timeline: FC<{
  bgVideo: string;
  elements: Array<{ [key: string]: any }>;
}> = ({ bgVideo, elements }) => {
  const [scale, setScale] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  return (
    <Styles.Container className={`arclight-mt-10`}>
      <div
        className={`arclight-relative arclight-group arclight-m-auto arclight-border-4 arclight-border-white arclight-w-32 arclight-h-32 arclight-rounded-full arclight-flex arclight-align-middle arclight-justify-center arclight-cursor-pointer arclight-overflow-hidden`}
        onClick={() => {
          if (loaded) {
            setScale(0);
            setTimeout(() => setLoaded(false), 150);
          } else {
            setScale(100);
            setLoaded(true);
          }
        }}
      >
        <video
          src={bgVideo}
          className={`arclight-absolute arclight-h-full arclight-object-cover`}
          loop
          muted
          autoPlay
        />
        <div
          className={`arclight-relative arclight-flex arclight-flex-col arclight-justify-center`}
        >
          <FontAwesome
            icon={"hurricane"}
            size={"4x"}
            className={`arclight-scale-100 group-hover:arclight-rotate-180 group-hover:arclight-scale-125 arclight-transition-all arclight-duration-300`}
          />
        </div>
      </div>
      {loaded ? (
        <VerticalTimeline
          layout={"2-columns"}
          lineColor={"white"}
          className={`arclight-origin-top ${
            scale ? `arclight-scale-100` : `arclight-scale-0`
          } arclight-transition-transform arclight-duration-300`}
        >
          {[
            {
              bgImg: "http://localhost:7000/static/media/ionia.jpg",
              hoverComponent: <div>A New Dynasty Begins</div>,
              descriptionComponent: (
                <DescComponent
                  title={"A New Dynasty Begins"}
                  text={"Org Alcatraz joins Titan Esports"}
                  date={"March 21, 2022"}
                />
              ),
              icon: "champagne-glasses",
              color: "rgb(33, 150, 243)",
            },
            {
              bgImg: "http://localhost:7000/static/media/jadevi.jpg",
              hoverComponent: <div>Alcatraz Gains Steam</div>,
              descriptionComponent: (
                <DescComponent
                  title={"Alcatraz Gains Steam"}
                  text={"Team Alcatraz defeats Team Phoenix Acsent 2-0"}
                  date={"April 13, 2022"}
                />
              ),
              icon: "hand-fist",
              color: "purple",
            },
            {
              bgImg: "http://localhost:7000/static/media/kayn.jpg",
              hoverComponent: <div>You Can't Wim 'Em All</div>,
              descriptionComponent: (
                <DescComponent
                  title={"You Can't Wim 'Em All"}
                  text={
                    "Team Alcatraz loses 1-2 to Team Deadly Gale in a tight series"
                  }
                  date={"April 29, 2022"}
                />
              ),
              icon: "skull-crossbones",
              color: "maroon",
            },
            {
              bgImg: "http://localhost:7000/static/media/jadewukong.jpg",
              hoverComponent: <div>Legends In The Making</div>,
              descriptionComponent: (
                <DescComponent
                  title={"Legends In The Making"}
                  text={
                    "Team Alcatraz takes 2nd in their first Divinity League debut"
                  }
                  date={"June 11, 2022"}
                />
              ),
              icon: "ribbon",
              color: "gold",
            },
            {
              locked: true,
              bgImg: "http://localhost:7000/static/media/general.jpg",
              hoverComponent: <div>End Of An Era</div>,
              descriptionComponent: (
                <DescComponent
                  title={"End Of An Era"}
                  text={"Org Alcatraz departs from Titan Esports"}
                  date={"December 2, 2022"}
                />
              ),
              icon: "face-sad-cry",
              color: "black",
            },
          ].map((el: any) => (
            <VerticalTimelineElement
              className={``}
              contentStyle={{
                background: "transparent",
                boxShadow: "none",
              }}
              contentArrowStyle={{ borderRight: `0px solid` }}
              date={el.descriptionComponent}
              iconStyle={{ background: el.color }}
              icon={<FontAwesome icon={el.icon} size={"4x"} />}
            >
              <div className={"arclight-flex arclight-justify-center"}>
                <Card
                  medium
                  index={0}
                  hoverComponent={el.hoverComponent}
                  locked={el.locked}
                  bgImg={el.bgImg}
                  subText={el.subText}
                  onClick={() => null}
                />
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      ) : null}
    </Styles.Container>
  );
};

export default Timeline;
