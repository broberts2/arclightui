import React, { FC } from "react";
import {
  Bracket,
  IRoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  IRenderSeedProps,
} from "react-brackets";
import FontAwesome from "../fontawesome/index";
import Styles from "./styles";

export interface PropTypes {}

const TournamentBracket: FC<PropTypes> = ({}) => {
  const CustomSeed = ({
    seed,
    breakpoint,
    roundIndex,
    seedIndex,
  }: IRenderSeedProps) => {
    const SItem = (props) => (
      <SeedTeam
        className={`arclight-relative arclight-overflow-hidden arclight-cursor-pointer ${
          props.won ? `arclight-border-cyan-300 arclight-border-[0px]` : null
        }`}
      >
        <img
          src={props.img}
          className={`arclight-absolute arclight-opacity-10 arclight-top-0 arclight-left-0`}
        />
        <div
          className={"arclight-flex arclight-align-middle arclight-relative"}
        >
          <img
            src="http://titanesports.org:7000/static/media/TES-logo.png"
            className={`arclight-mr-5`}
            style={{ height: 35 }}
          />
          <div
            className={`arclight-flex arclight-flex-col arclight-justify-center`}
          >
            <div>{seed.teams[0]?.name || "NO TEAM "}</div>
          </div>
        </div>
      </SeedTeam>
    );
    return (
      <Seed mobileBreakpoint={breakpoint} style={{ fontSize: "12px" }}>
        <SeedItem>
          <div className={`arclight-bg-background-primary`}>
            <SItem
              img={"https://pbs.twimg.com/media/DTxLgmyXcAE7Z5c.jpg"}
              won
            />
            {seed.teams.length > 1 ? (
              <SItem img={"https://pbs.twimg.com/media/DTxLgmyXcAE7Z5c.jpg"} />
            ) : null}
          </div>
        </SeedItem>
      </Seed>
    );
  };
  const rounds: IRoundProps[] = [
    {
      title: "Quarter Finals",
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: "My Very Long Team Name" }, { name: "Team B" }],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: "Team C" }, { name: "Team D" }],
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: "Team E" }, { name: "Team F" }],
        },
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [{ name: "Team G" }, { name: "Team H" }],
        },
      ],
    },
    {
      title: "Semi-Finals",
      seeds: [
        {
          id: 5,
          date: new Date().toDateString(),
          teams: [{ name: "Team A" }, { name: "Team C" }],
        },
        {
          id: 6,
          date: new Date().toDateString(),
          teams: [{ name: "Team E" }, { name: "Team G" }],
        },
      ],
    },
    {
      title: "Finals",
      seeds: [
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Team A" }, { name: "Team E" }],
        },
      ],
    },
    {
      title: "Champions",
      seeds: [
        {
          id: 8,
          date: new Date().toDateString(),
          teams: [{ name: "Team A" }],
        },
      ],
    },
  ];
  return (
    <Styles.Container
      className={`arclight-flex arclight-font-primary arclight-text-text-primary`}
    >
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed} rtl={false} />
    </Styles.Container>
  );
};

export default TournamentBracket;
