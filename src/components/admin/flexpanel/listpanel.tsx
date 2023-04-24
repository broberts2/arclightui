export default (
  c: { [key: string]: any },
  i: any,
  ListPanel: any,
  state: { [key: string]: any },
  setState: Function
) => (
  <div style={{ height: "400px" }}>
    <ListPanel
      autoSort
      cards={c.cards ? c.cards : []}
      line={false}
      fns={{}}
      constrain={state._items[i].constrain}
    />
  </div>
);
