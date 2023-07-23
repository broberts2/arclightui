import React, { FC } from "react";
import Styles from "./styles";

import Card from "../card";
import SearchControls from "../searchcontrols";
import Loader from "../loader";
import Button from "../button";

export interface PropTypes {
  loadwatcher?: boolean;
  constrain?: boolean;
  autoSort?: boolean | null;
  line?: boolean | null;
  fns: any;
  Request: { type: string; search: any; local?: boolean; index: string };
  card: Function;
  D: any;
  controls?: Array<{
    icon: string;
    text: string;
    key: string;
  }>;
}

const mountAnim = (i: number) => ({
  anim: "flipInY",
  duration: "0.30s",
  delay: `${0.015 * i}s`,
});

const ListPanel: FC<PropTypes> = ({
  loadwatcher,
  autoSort,
  line,
  constrain,
  fns,
  Request,
  card,
  D,
  controls,
}) => {
  const [loading, setLoading] = React.useState(loadwatcher);
  const [sCards, setSCards] = React.useState<any>(<div />);
  const [nPerRow, setNPerRow] = React.useState(8);
  const [skip, setSkip] = React.useState(0);
  const [btnActive, setBtnActive] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  let cards = fns.e(
    D,
    fns.getCallType(Request.type, Request.index, Request.local)[0],
    {
      records: [],
    }
  );
  if (!cards) cards = { records: [] };
  if (Array.isArray(cards.records))
    cards = cards.records.map((_: any) => card(_));
  else cards = Object.keys(cards.records).map((_: any) => card(_));
  if (autoSort) cards = cards.sort((a, b) => (a.subText < b.subText ? -1 : 1));
  let row: any = [];
  const rows: any = [];
  const provideCard = (obj: { [key: string]: any }, i: number) => (
    <Card
      mountAnim={mountAnim(i)}
      index={skip * Request.search.limit + (i + 1)}
      small
      hoverComponent={obj.hoverComponent}
      locked={obj.locked}
      bgImg={obj.img}
      subText={obj.subtext}
      onClick={
        obj.onClick
          ? //@ts-ignore
            () => (obj.onClick ? obj.onClick() : null)
          : null
      }
    />
  );
  if (!line) {
    for (let i = 0; i < cards.length; i++) {
      if (i % nPerRow === 0 && i > 0) {
        rows.push(
          <div
            className={
              "flex flex-row w-full items-center justify-center m-auto gap-4 my-4"
            }
          >
            {row}
          </div>
        );
        row = [];
      }
      row.push(provideCard(cards[i], i));
    }
    if (row.length) {
      for (let i = row.length; i < nPerRow; i++) {
        row.push(<div style={{ width: `10rem` }} />);
      }
      rows.push(
        <div
          className={
            "flex flex-row w-full items-center justify-center m-auto gap-4 my-4"
          }
        >
          {row}
        </div>
      );
    }
  } else {
    for (let i = 0; i < cards.length; i++) {
      rows.push(provideCard(cards[i], i));
    }
  }
  const handleResize = () => {
    const _ = window.innerWidth;
    if (_ > 1280) setNPerRow(8);
    else if (_ > 1024) setNPerRow(8);
    else if (_ > 768) setNPerRow(4);
    else if (_ > 604) setNPerRow(3);
    else setNPerRow(3);
  };
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1);
    setSCards(rows);
  }, [D]);
  React.useEffect(() => {
    setSkip(0);
    setBtnActive(0);
    if (
      fns.calls &&
      fns.calls[fns.getCallType(Request.type, Request.local)[1]]
    ) {
      fns.calls[fns.getCallType(Request.type, Request.local)[1]]({
        index: Request.index,
        search: { ...Request.search, skip: 0 },
      });
    }
  }, [Request.type]);
  React.useEffect(() => {
    if (loadwatcher !== undefined) {
      setLoading(true);
      setSkip(0);
    }
  }, [loadwatcher]);
  return (
    <Styles.Container
      mh={(Request.search.limit / nPerRow) * 150}
      className={`${
        constrain
          ? `w-4/5 max-w-screen-xl m-auto`
          : `w-full flex flex-col flex-1`
      }`}
    >
      {!loading ? (
        <div>
          {sCards ? (
            <SearchControls
              hot={true}
              pagination={Object.assign(
                fns.e(
                  D,
                  fns.getCallType(
                    Request.type,
                    Request.index,
                    Request.local
                  )[0],
                  {
                    records: [],
                  }
                ),
                {
                  skip,
                  length: Request.search.limit
                    ? Request.search.limit
                    : undefined,
                  onClick: (n: number) => {
                    setSkip(skip + n);
                    setSCards(<div />);
                    fns.calls[fns.getCallType(Request.type, Request.local)[1]]({
                      index: Request.index,
                      search: {
                        ...Request.search,
                        skip:
                          (skip + n) *
                          (Request.search.limit ? Request.search.limit : 1),
                      },
                    });
                  },
                }
              )}
              constrain={constrain}
              textField={{
                label: "Search",
                value: searchValue,
                onChange: (e: any) => setSearchValue(e.target.value),
              }}
              btnActive={btnActive}
              setBtnActive={(n: number) => setBtnActive(n)}
              search={{
                onSubmit: (key, $regex) => {
                  const _ =
                    key && $regex ? { [key]: { $regex, $options: "i" } } : {};
                  fns.calls[fns.getCallType(Request.type, Request.local)[1]]({
                    index: Request.index,
                    search: {
                      ...Request.search,
                      ..._,
                    },
                  });
                },
              }}
              buttons={controls}
              className={``}
            >
              {sCards}
            </SearchControls>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <Loader loading={loading} />
      )}
    </Styles.Container>
  );
};

export default ListPanel;
