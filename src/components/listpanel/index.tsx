import React, { FC } from "react";
import Styles from "./styles";
import { useMediaQuery } from "react-responsive";
import Card from "../card";
import SearchControls from "../searchcontrols";
import Loader from "../loader";

export interface PropTypes {
  loadwatcher?: boolean;
  constrain?: boolean;
  autoSort?: boolean | null;
  line?: boolean | null;
  linesmall?: boolean | null;
  fns: any;
  Request: {
    type?: string;
    search: any;
    local?: boolean;
    index: string;
    script?: string;
  };
  card: Function;
  D: any;
  controls?: Array<{
    icon: string;
    text: string;
    key: string;
  }>;
}

const mountAnim = (i: number) => ({
  anim: "fadeIn",
  duration: "0.30s",
  delay: `${0.01 * i}s`,
});

const ListPanel: FC<PropTypes> = ({
  loadwatcher,
  autoSort,
  line,
  linesmall,
  constrain,
  fns,
  Request,
  card,
  D,
  controls,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const max = isTabletOrMobile ? 10 : 32;
  if (
    Request &&
    Request.search &&
    Request.search.limit &&
    Request.search.limit > max
  )
    Request.search.limit = max;
  const sizeRef = React.useRef<any>(null);
  const [minHeight, setMinHeight] = React.useState(0);
  const [loading, setLoading] = React.useState(loadwatcher);
  const [sCards, setSCards] = React.useState<any>(<div />);
  const [nPerRow, setNPerRow] = React.useState(8);
  const [skip, setSkip] = React.useState(0);
  const [btnActive, setBtnActive] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  let cards = fns.e(
    D,
    Request.script
      ? `D.${Request.script}.${Request.index}`
      : fns.getCallType(Request.type, Request.index, Request.local)[0],
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
  const provideCard = (obj: { [key: string]: any }, i: number) => {
    return (
      <Card
        managed={obj.managed}
        line={line}
        linesmall={linesmall}
        mountAnim={mountAnim(i)}
        index={skip * Request.search.limit + (i + 1)}
        small={!line && !linesmall}
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
  };
  if (!line && !linesmall) {
    for (let i = 0; i < cards.length; i++) {
      if (i % nPerRow === 0 && i > 0) {
        rows.push(
          <div
            className={
              "arclight-flex arclight-flex-row arclight-w-full arclight-items-center arclight-justify-center arclight-m-auto arclight-gap-4 arclight-my-4"
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
        row.push(<div className={`arclight-w-40`} />);
      }
      rows.push(
        <div
          className={
            "arclight-flex arclight-flex-row arclight-w-full arclight-items-center arclight-justify-center arclight-m-auto arclight-gap-4 arclight-my-4"
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
    if (!sizeRef?.current?.clientHeight) return;
    window.addEventListener("resize", handleResize);
    handleResize();
    setMinHeight(sizeRef.current.clientHeight - 25);
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
      fns.calls[
        Request.script || fns.getCallType(Request.type, Request.local)[1]
      ]
    ) {
      fns.calls[
        Request.script
          ? Request.script
          : fns.getCallType(Request.type, Request.local)[1]
      ]({
        index: Request.index,
        search: { ...Request.search, skip: 0 },
      });
    }
  }, [Request.type]);
  React.useEffect(() => {
    if (loadwatcher) {
      setLoading(true);
      setSkip(0);
    }
  }, [loadwatcher]);
  return (
    <Styles.Container
      mh={(Request.search.limit / nPerRow) * 150}
      className={`${
        constrain
          ? `arclight-w-4/5 arclight-max-w-screen-xl arclight-m-auto`
          : `arclight-w-full arclight-flex arclight-flex-col arclight-flex-1`
      }`}
    >
      {!loading ? (
        <div ref={sizeRef}>
          {sCards ? (
            <div style={{ height: "100%" }}>
              <SearchControls
                minHeight={minHeight}
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
                      fns.calls[
                        Request.script
                          ? Request.script
                          : fns.getCallType(Request.type, Request.local)[1]
                      ]({
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
                    fns.calls[
                      Request.script
                        ? Request.script
                        : fns.getCallType(Request.type, Request.local)[1]
                    ]({
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
            </div>
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
