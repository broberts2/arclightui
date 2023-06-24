import React, { FC } from "react";
import Styles from "./styles";
import Card from "../card";
import Page from "../page";
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
	return (
		<Styles.Container className={className} headless={headless}>
			<Styles.Body>
				<div className={`flex justify-center relative`}>
					<Card
						bgImg={authBackgroundImage}
						bodyComponent={
							<div className={`flex flex-col space-y-6 justify-center w-3/4`}>
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
											className={`flex flex-col space-y-2 justify-center w-full`}
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
											className={`border-b-2 border-b-text-primary ${
												OATHOnly ? "hidden" : null
											}`}
										/>
										<div
											className={`flex flex-${
												OATHOnly ? "col space-y-4 m-auto" : "row space-x-4"
											} w-3/4`}
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
														<div className={`w-full max-w-xs`}>
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
															<div className={`mt-3`}>
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
