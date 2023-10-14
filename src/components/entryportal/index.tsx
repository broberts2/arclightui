import React, { FC } from "react";
import Styles from "./styles";

import HeroPanel from "../heropanel";

export interface PropTypes {
  baseBackground: string;
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

const EntryPortal: FC<PropTypes> = ({ cards, baseBackground }) => {
  const [h, setH] = React.useState(-1);
  return (
    <Styles.Container className={"arclight-flex arclight-min-h-screen"}>
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
      <Styles.Body>
        <HeroPanel
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
