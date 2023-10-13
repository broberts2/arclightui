import React, { FC } from "react";
import Styles from "./styles";
import DiamondSelector from "../diamondselector/index";
import MiniDiamondPicker from "../minidiamondpicker";

export interface PropTypes {
  items: Array<{ bgImg: string; element: any }>;
  defaultSelection?: number;
  bgCompassElement?: any;
}

const CompassViewer: FC<PropTypes> = ({
  items,
  defaultSelection,
  bgCompassElement,
}) => {
  const [expanded, setExpanded] = React.useState(
    defaultSelection ? true : false
  );
  const [selected, setSelected] = React.useState(
    defaultSelection ? defaultSelection - 1 : 0
  );
  const [batch, setBatch] = React.useState(0);
  const RenderItem = React.useMemo(
    () => (
      <Styles.Item
        key={selected}
        mountAnim={{
          anim: "fadeIn",
          duration: "750ms",
        }}
      >
        {items[selected].element}
      </Styles.Item>
    ),
    [selected]
  );
  return (
    <Styles.Container
      className={
        "arclight-text-text-primary arclight-font-primary arclight-w-full"
      }
    >
      <table className={"arclight-w-full arclight-overflow-hidden"}>
        <tbody>
          <tr>
            <td
              className={"arclight-transition-all arclight-duration-500"}
              align={"center"}
              width={expanded ? "25%" : "100%"}
              onClick={() => setExpanded(true)}
            >
              <DiamondSelector
                callback={(value: number) => setSelected(value)}
                offset={batch * 4}
                bgElement={bgCompassElement}
                items={items
                  .slice(4 * batch, 4 * (batch + 1))
                  .map((el) => ({ bgImg: el.bgImg }))}
                defaultSelection={defaultSelection}
              />
              {items && items.length > 4 ? (
                <MiniDiamondPicker
                  columns={4}
                  index={batch}
                  count={items.length}
                  cb={setBatch}
                />
              ) : null}
            </td>
            <Styles.TdLg expanded={expanded}>
              <Styles.ViewItem
                className={`${
                  expanded ? "arclight-w-full" : "arclight-w-0"
                } arclight-transition-all arclight-duration-300 arclight-px-12`}
              >
                {RenderItem}
              </Styles.ViewItem>
            </Styles.TdLg>
          </tr>
          <tr className={`xl:arclight-hidden`}>
            <Styles.TdSm expanded={expanded}>
              <Styles.ViewItem
                className={`${
                  expanded ? "arclight-w-full" : "arclight-w-0"
                } arclight-transition-all arclight-duration-300 arclight-px-10`}
              >
                {RenderItem}
              </Styles.ViewItem>
            </Styles.TdSm>
          </tr>
        </tbody>
      </table>
    </Styles.Container>
  );
};

export default CompassViewer;
