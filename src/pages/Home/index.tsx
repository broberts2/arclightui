import React, { FC } from "react";
import {
  SlantedDivider,
  HeroPanel,
  MissionStatement,
  CompassViewer,
  Button,
  Page,
  FadeDivider,
  Picklist,
} from "../../components";

import Header from "../../projectcomponents/header";
import Footer from "../../projectcomponents/footer";

const Home: FC<{
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  endpoint?: string;
}> = ({ fns, D, endpoint }) => {
  return D && fns.calls ? (
    <Page
      fns={fns}
      backgroundImage={{
        src: `https://images2.alphacoders.com/128/1287858.jpg`,
        opacity: 0.5,
      }}
    >
      <Header main fns={fns} endpoint={endpoint} />
      <div className={`h-48 lg:h-96`} />
      {/* <SlantedDivider
				rotation={1}
				img={require("../../yone2.jpg")}
				ruby={require("../../lolicon.png")}
			/> */}
      {/* <FadeDivider
        ruby={
          "http://titanesports.org:7000/static/media/TES2023_website_summer.png"
        }
        fadeOpacity={0.05}
      /> */}
      <CompassViewer
        bgCompassElement={`${endpoint}/static/media/pyke.webm`}
        defaultSelection={1}
        items={[
          {
            bgImg: `${endpoint}/static/media/karma.jpg`,
            element: (
              <div>
                <MissionStatement
                  bgImg={`${endpoint}/static/media/karma.jpg`}
                  title={"Welcome to Titan Esports!"}
                  Message={
                    <table className={``}>
                      <tbody>
                        <tr>
                          <td className={`hidden sm:block`}>
                            <img
                              className={`w-[600px]`}
                              src={`${endpoint}/static/media/TES2023_website_summer.png`}
                            />
                          </td>
                          <td>
                            <div className={`pl-10`}>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  }
                />
              </div>
            ),
          },
          {
            bgImg: `${endpoint}/static/media/discord.png`,
            element: (
              <MissionStatement
                bgImg={`${endpoint}/static/media/discord.jpg`}
                title={"Come chat on Discord"}
                Message={
                  <div>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                }
                button={
                  <Button
                    label={"Titan Esports Discord"}
                    idleIcon={"discord"}
                    type={"button"}
                    size={"normal"}
                    animation={true}
                    onClick={(status: any) =>
                      fns.routeExternal(`https://discord.gg/kuWyKDxkR7`)
                    }
                  />
                }
              />
            ),
          },
          {
            bgImg: `${endpoint}/static/media/twitch.png`,
            element: (
              <div>
                <MissionStatement
                  bgImg={`${endpoint}/static/media/twitchtv.jpg`}
                  title={"Catch us on Twitch.tv"}
                  Message={
                    <div>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </div>
                  }
                  button={
                    <Button
                      label={"Titan Esports Twitch.tv"}
                      idleIcon={"twitch"}
                      type={"button"}
                      size={"normal"}
                      animation={true}
                      onClick={(status: any) =>
                        fns.routeExternal(`https://www.twitch.tv/titanesportz`)
                      }
                    />
                  }
                />
              </div>
            ),
          },
          {
            bgImg: `${endpoint}/static/media/youtube.jpg`,
            element: (
              <MissionStatement
                bgImg={`${endpoint}/static/media/youtube.jpg`}
                title={"Check out our Vods"}
                Message={
                  <div>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                }
                button={
                  <Button
                    label={"Titan Esports Youtube"}
                    idleIcon={"youtube"}
                    type={"button"}
                    size={"normal"}
                    animation={true}
                    onClick={(status: any) =>
                      fns.routeExternal(
                        `https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw/videos`
                      )
                    }
                  />
                }
              />
            ),
          },
          {
            bgImg: `${endpoint}/static/media/illaoi.jpg`,
            element: (
              <MissionStatement
                bgImg={`${endpoint}/static/media/illaoi.jpg`}
                title={"Catch us on Twitch.tv"}
                Message={
                  <div>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                }
              />
            ),
          },
        ]}
      />
      <MissionStatement
        title={"Titan Esports"}
        Message={
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
        }
      />
      <HeroPanel
        cards={fns
          .e(D, `D.getrecords_lolleague.init.records`, [])
          .map((league: { [key: string]: any }) => ({
            locked: league.locked,
            hoverComponent: (
              <img src={league.logo} className={`w-32 lg:w-64 object-cover`} />
            ),
            bgImg: league.img,
            subText: league.name,
            onClick: () => fns.route("/"),
          }))}
      />
      <Footer fns={fns} endpoint={endpoint} />
    </Page>
  ) : null;
};

export default Home;
