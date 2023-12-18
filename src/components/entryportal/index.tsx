import React, { FC } from "react";
import Styles from "./styles";

import HeroPanel from "../heropanel";

export interface PropTypes {
  baseBackground: string;
  className?: string;
  rows?: number;
  cards: Array<{
    backgroundHover?: string | null;
    bgImg: string;
    subText: string;
    onClick?: Function | null;
    locked?: boolean | null;
    hoverComponent?: JSX.Element | null;
    active?: boolean | null;
  }>;
}

const EntryPortal: FC<PropTypes> = ({
  cards,
  baseBackground,
  className,
  rows,
}) => {
  const [h, setH] = React.useState(-1);
  const [index, setIndex] = React.useState(0);
  return (
    <Styles.Container
      className={`arclight-flex arclight-min-h-screen${
        className ? ` ${className}` : ""
      }`}
    >
      <Styles.BaseBackground
        src={baseBackground}
        style={{ opacity: h < 0 ? 0.1 : 0 }}
      />
      {cards.map((c, i) =>
        c.backgroundHover && !c.locked ? (
          <Styles.HoverBackground
            key={i}
            src={c.backgroundHover}
            style={{ opacity: h === i ? 0.1 : 0 }}
          />
        ) : null
      )}
      <Styles.Body className={`arclight-p-10 md:arclight-p-0`}>
        <HeroPanel
          rows={rows}
          index={rows ? index : undefined}
          pageCallback={rows ? (n: number) => setIndex(n) : undefined}
          cards={cards.map((c: any, i) => {
            if (c.backgroundHover && !c.locked) {
              c.onHover = () => setH(i);
              c.onHoverLeave = () => setH(-1);
            }
            return c;
          })}
        />
      </Styles.Body>
    </Styles.Container>
  );
};

export default EntryPortal;
