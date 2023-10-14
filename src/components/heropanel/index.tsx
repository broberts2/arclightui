import React, { FC } from "react";
import Styles from "./styles";

import Card from "../card/index";
import MiniDiamondPicker from "../minidiamondpicker";

export interface PropTypes {
  left?: boolean | null;
  rows?: number;
  pageCallback?: Function;
  index?: number;
  cards: Array<{
    bgImg: string;
    subText?: string;
    onClick?: Function | null;
    locked?: string | boolean | null;
    hoverComponent?: JSX.Element | null;
    active?: boolean | null;
    onHover?: Function | null;
    onHoverLeave?: Function | null;
    bodyComponent?: JSX.Element | null;
  }>;
  autoSort?: boolean | null;
  small?: boolean | null;
  title?: string | null;
  singleSmall?: boolean;
}

const HeroPanel: FC<PropTypes> = React.memo(
  ({
    cards,
    autoSort,
    small,
    title,
    left,
    rows,
    pageCallback,
    index,
    singleSmall,
  }) => {
    const MAX_C = singleSmall ? 1 : 3;
    const CL = cards.length;
    if (rows && index)
      cards = cards.filter((c: any, i: number) => i >= index * (rows * 3));
    const className = `arclight-flex arclight-flex-col lg:arclight-flex-row arclight-w-full arclight-items-center arclight-justify-${
      left ? "start" : "center"
    } arclight-m-auto arclight-gap-7 lg:arclight-gap-7 xl:arclight-gap-7 arclight-my-7`;
    const [hItem, setHItem] = React.useState(-1);
    if (autoSort)
      cards = cards.sort((a, b) =>
        a.subText && b.subText && a.subText < b.subText ? -1 : 1
      );
    let row: any = [];
    const _rows: any = [];
    _rows.push(
      <div className={className}>
        <div className="arclight-text-text-primary arclight-font-primary arclight-text-3xl arclight-text-start">
          {title}
        </div>
      </div>
    );
    for (let i = 0; i < (rows ? rows * 3 : cards.length); i++) {
      if (i % 3 === 0 && i > 0) {
        _rows.push(<div className={className}>{row}</div>);
        row = [];
      }
      if (cards[i])
        row.push(
          <Card
            hover={{
              onMouseEnter: () => {
                //@ts-ignore
                if (cards[i].onHover) cards[i].onHover();
                setHItem(i);
              },
              onMouseLeave: () => {
                //@ts-ignore
                if (cards[i].onHover) cards[i].onHoverLeave();
                setHItem(-1);
              },
            }}
            active={
              cards[i].active !== null && cards[i].active !== undefined
                ? cards[i].active || hItem === i
                : null
            }
            medium={small}
            hoverComponent={cards[i].hoverComponent}
            locked={cards[i].locked}
            bgImg={cards[i].bgImg}
            subText={cards[i].subText}
            bodyComponent={cards[i].bodyComponent}
            onClick={
              cards[i].onClick
                ? //@ts-ignore
                  () => (cards[i].onClick ? cards[i].onClick() : null)
                : null
            }
          />
        );
    }
    if (row.length > 0) _rows.push(<div className={className}>{row}</div>);
    return (
      <Styles.Container className={"lg:arclight-px-20"}>
        {_rows}
        {rows && CL > 3 ? (
          <MiniDiamondPicker
            index={index}
            columns={3}
            count={CL}
            cb={pageCallback}
          />
        ) : null}
      </Styles.Container>
    );
  }
);

export default HeroPanel;
