import React, { FC } from "react";
import Styles from "./styles";
import Card from "../card";
import Button from "../button";
import TextField from "../textfield";
import Loader from "../loader";

export interface PropTypes {
  fns: {
    [key: string]: any;
  };
  D: { [key: string]: any };
  authBackgroundImage: string;
  OATH?: Array<{ type: string; onClick: Function }> | null;
  OATHOnly?: boolean | null;
  disableNewRegistration?: boolean | null;
  className?: string | object | null;
  redirect?: string;
  headless?: boolean;
}

const AuthPage: FC<PropTypes> = ({
  fns,
  D,
  authBackgroundImage,
  OATH,
  OATHOnly,
  disableNewRegistration,
  className,
  redirect,
  headless,
}) => {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  React.useEffect(() => {
    if (D && D.DiscordOATH2 && D.DiscordOATH2.url)
      window.location.replace(D.DiscordOATH2.url);
  }, [D]);
  return (
    <Styles.Container className={className} headless={headless}>
      <Styles.Body>
        <div
          className={`arclight-flex arclight-justify-center arclight-relative xs:max-md:arclight-w-3/4 xs:max-md:arclight-mx-auto`}
        >
          <Card
            bgImg={authBackgroundImage}
            bodyComponent={
              <div
                className={`arclight-flex arclight-flex-col arclight-space-y-6 arclight-justify-center arclight-w-3/4 arclight-m-auto`}
              >
                {!OATHOnly ? (
                  <React.Fragment>
                    <TextField
                      hot
                      onChange={(data: any) =>
                        setCredentials((_: any) => ({
                          ..._,
                          username: data.target.value,
                        }))
                      }
                      value={credentials.username}
                      span
                      type={"text"}
                      key={1}
                      label={"Username"}
                      variant={"standard"}
                    />
                    <TextField
                      hot
                      onChange={(data: any) =>
                        setCredentials((_: any) => ({
                          ..._,
                          password: data.target.value,
                        }))
                      }
                      value={credentials.password}
                      span
                      type={"password"}
                      key={1}
                      label={"Password"}
                      variant={"standard"}
                    />
                    <div
                      className={`arclight-flex arclight-flex-col arclight-space-y-2 arclight-justify-center arclight-w-full`}
                    >
                      <Button
                        span
                        label={"Sign In"}
                        type={"button"}
                        size={"large"}
                        animation={true}
                        onClick={(status: any) =>
                          fns.authenticate(credentials, redirect)
                        }
                      />
                    </div>
                  </React.Fragment>
                ) : null}
                {OATH ? (
                  <React.Fragment>
                    <div
                      className={`arclight-border-b-2 arclight-border-b-text-primary ${
                        OATHOnly ? "hidden" : null
                      }`}
                    />
                    <div
                      className={`arclight-flex arclight-flex-${
                        OATHOnly
                          ? "arclight-col arclight-space-y-4 arclight-m-auto"
                          : "arclight-row arclight-space-x-4"
                      } arclight-w-3/4`}
                    >
                      {OATH.map((s) => (
                        <Button
                          span={OATHOnly}
                          label={
                            OATHOnly
                              ? s.type.charAt(0).toUpperCase() + s.type.slice(1)
                              : null
                          }
                          idleIcon={s.type.toLowerCase()}
                          type={"button"}
                          size={"large"}
                          animation={true}
                          isIconButton={OATHOnly ? false : true}
                          onClick={(status: any) =>
                            s.onClick ? s.onClick() : null
                          }
                        />
                      ))}
                    </div>
                  </React.Fragment>
                ) : null}
                {!disableNewRegistration && !OATHOnly ? (
                  <Button
                    span
                    label={"Don't have an account?"}
                    type={"button"}
                    size={"small"}
                    animation={true}
                    onClick={(status: any) =>
                      fns.setModal({
                        noescape: true,
                        body: function Body(props) {
                          const [loading, setLoading] = React.useState(false);
                          const [username, setUsername] = React.useState("");
                          const [password, setPassword] = React.useState("");
                          const [verifyPassword, setVerifyPassword] =
                            React.useState("");
                          const [email, setEmail] = React.useState("");
                          React.useEffect(() => {
                            if (!props.D.serversuccess) setLoading(false);
                            if (props.D.serversuccess) props.setModal(false);
                          }, [
                            props.D.serversuccess,
                            props.D.servererror,
                            props.D.serverwarning,
                            props.D.servermessage,
                          ]);
                          React.useEffect(
                            () =>
                              props.setExitButton
                                ? props.setExitButton(!loading)
                                : null,
                            [loading]
                          );
                          return !loading ? (
                            <div
                              className={`arclight-w-full arclight-max-w-xs`}
                            >
                              <div>Register a New Account</div>
                              {[
                                {
                                  defaultValue: "",
                                  type: "text",
                                  label: "Username",
                                  v: username,
                                  fn: setUsername,
                                },
                                {
                                  defaultValue: "",
                                  type: "password",
                                  label: "Password",
                                  v: password,
                                  fn: setPassword,
                                },
                                {
                                  defaultValue: "",
                                  type: "password",
                                  label: "Verify Password",
                                  v: verifyPassword,
                                  fn: setVerifyPassword,
                                },
                                {
                                  defaultValue: "",
                                  type: "text",
                                  label: "Email",
                                  v: email,
                                  fn: setEmail,
                                },
                              ].map((el, i) => (
                                <TextField
                                  span
                                  hot
                                  value={el.v}
                                  onChange={(e: any) => el.fn(e.target.value)}
                                  type={el.type}
                                  key={i}
                                  label={el.label}
                                  variant="standard"
                                />
                              ))}
                              <div className={`arclight-mt-3`}>
                                <Button
                                  span={true}
                                  label={"submit"}
                                  type={"button"}
                                  size={"md"}
                                  animation={true}
                                  disabled={false}
                                  block={false}
                                  rounded={false}
                                  square={false}
                                  isIconButton={false}
                                  onClick={(status: any) => {
                                    if (
                                      fns &&
                                      fns.calls &&
                                      fns.calls.registeruser
                                    ) {
                                      setLoading(true);
                                      fns.calls.registeruser({
                                        username,
                                        password,
                                        email,
                                        redirect: `http://leagueoflegends.localhost:3000/login`,
                                      });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <Loader loading={true} />
                          );
                        },
                        bgImg: `https://wallpaperaccess.com/full/6843267.jpg`,
                      })
                    }
                  />
                ) : null}
              </div>
            }
          />
        </div>
      </Styles.Body>
    </Styles.Container>
  );
};

export default AuthPage;
