import React, { FC } from "react";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";
import { Page, Application, HeroPanel } from "../../components";

const ApplicationPage: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  const [opacity, setOpacity] = React.useState(0.35);
  React.useEffect(() => {
    const onScroll = () => {
      const n = 0.35 - window.scrollY * 0.0003;
      setOpacity(n > 0.035 ? n : 0.035);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const _f = fns.readState().query;
  const bg = (t: string) => {
    const _ = fns
      .e(D, `D.getformtemplates.records`, [])
      .find((f: any) => f.title === t);
    if (_) return _.backgroundimage;
    return "";
  };
  const [index, setIndex] = React.useState(0);
  const [hItem, setHItem] = React.useState(_f && _f.f ? _f.f : "Ban Appeal");
  const [form, setForm] = React.useState(null);
  React.useEffect(() => {
    const _f = fns.readState().query;
    setForm(null);
    if (D && D.getformtemplates && D.getformtemplates.records)
      setTimeout(
        () =>
          setForm(
            D.getformtemplates.records.find((f: any) => f.title === hItem)
          ),
        1
      );
    fns.setQueryParams({ f: hItem });
  }, [hItem, D]);
  React.useEffect(() => {
    if (fns.calls && fns.calls.getformtemplates && !D.getformtemplates)
      fns.calls.getformtemplates();
  }, [fns.calls]);
  return D && fns.calls ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: "",
        opacity: 0.5,
      }}
    >
      <Header fns={fns} endpoint={endpoint} />
      {/* <PageTitle
        orientation={"center"}
        text={"Applications"}
        fns={fns}
        img={Settings.titleimage}
        bg={"http://localhost:7000/static/media/background2.mp4"}
        bgOffset={50}
      /> */}
      <HeroPanel
        small
        index={index}
        rows={1}
        pageCallback={setIndex}
        cards={fns.e(D, `D.getformtemplates.records`, []).map((c: any) => ({
          active: hItem === c.title,
          locked: false,
          bgImg: bg(c.title),
          subText: c.title,
          onClick: () => {
            setHItem(c.title);
          },
        }))}
      />
      <Application D={D} fns={fns} form={form} className={`p-20`} />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default ApplicationPage;
