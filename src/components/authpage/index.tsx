import React, { FC } from "react";
import Styles from "./styles";
import Card from "../card";
import Page from "../page";
import Button from "../button";
import TextField from "../textfield";

export interface PropTypes {
	fns: {
		[key: string]: any;
	};
	authBackgroundImage: string;
	OATH?: Array<{ type: string; onClick: Function }> | null;
	OATHOnly?: boolean | null;
	disableNewRegistration?: boolean | null;
	className?: string | object | null;
	redirect?: string;
}

const AuthPage: FC<PropTypes> = ({
	fns,
	authBackgroundImage,
	OATH,
	OATHOnly,
	disableNewRegistration,
	className,
	redirect,
}) => {
	const [credentials, setCredentials] = React.useState({
		username: "",
		password: "",
	});
	return (
		<Styles.Container className={className}>
			<Page fns={fns}>
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
												label={"Username or Email"}
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
												{!disableNewRegistration ? (
													<Button
														span
														label={"Register New User"}
														type={"button"}
														size={"tiny"}
														animation={true}
														onClick={(status: any) => null}
													/>
												) : null}
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
																? s.type.charAt(0).toUpperCase() +
																  s.type.slice(1)
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
								</div>
							}
						/>
					</div>
				</Styles.Body>
			</Page>
		</Styles.Container>
	);
};

export default AuthPage;
