import { FC } from "react";
import Drawer from "../drawer";
import FontAwesome from "../fontawesome";
import Styles from "./styles";

export interface PropTypes {
	fns: { [key: string]: Function };
	logo: { route: string; src: string };
	linksRight?: Array<{ route: string; text: string; icon?: string | null }>;
	linksLeft?: Array<{ route: string; text: string; icon?: string | null }>;
	links?: Array<{ route: string; text: string; icon?: string | null }>;
	socialMediaRight?: Array<{ route: string; icon: string }>;
	socialMediaLeft?: Array<{ route: string; icon: string }>;
	socialMedia?: Array<{ route: string; icon: string }>;
}

const Header: FC<PropTypes> = ({
	linksLeft,
	linksRight,
	links,
	socialMedia,
	socialMediaRight,
	socialMediaLeft,
	logo,
	fns,
}) => {
	return (
		<Styles.Container className={"text-text-primary font-primary"}>
			<Drawer
				animation={"slide"}
				buttonSide="right"
				side="right"
				className={"lg:hidden"}
				// @ts-ignore
				items={
					linksRight && linksLeft
						? linksLeft.concat(linksRight).map((l) => ({
								icon: l.icon,
								text: l.text,
								onClick: () => fns.route(l.route),
						  }))
						: links
						? links.map((l) => ({
								icon: l.icon,
								text: l.text,
								onClick: () => fns.route(l.route),
						  }))
						: null
				}
			/>
			<div
				className={
					"lg:my-10 absolute left-1/2 transform -translate-x-1/2 w-full"
				}
				style={links ? { display: "none" } : {}}
			>
				<table className="table-fixed w-full">
					<tbody>
						<tr>
							<Styles.Td className="w-2/5 relative">
								<div className="flex m-auto gap-8 relative place-content-end">
									{linksLeft
										? linksLeft.map((l) => (
												<div
													className="text-xl font-bold whitespace-nowrap cursor-pointer"
													onClick={() => fns.route(l.route)}
												>
													{l.text}
												</div>
										  ))
										: null}
									<div className={"absolute top-12"}>
										<div className="flex m-auto gap-4">
											{socialMediaLeft
												? socialMediaLeft.map((l) => (
														<FontAwesome
															animation="none"
															icon={l.icon}
															size="xl"
															onClick={() => () => fns.route(l.route)}
														/>
												  ))
												: null}
										</div>
									</div>
								</div>
							</Styles.Td>
							<td className="w-1/5">
								<img
									onClick={() => fns.route(logo.route)}
									src={logo.src}
									className={"h-24 m-4 lg:h-36 lg:m-auto cursor-pointer"}
								/>
							</td>
							<Styles.Td className="w-2/5">
								<div className="flex m-auto gap-8 relative">
									{linksRight
										? linksRight.map((l) => (
												<div
													className="text-xl font-bold whitespace-nowrap cursor-pointer"
													onClick={() => fns.route(l.route)}
												>
													{l.text}
												</div>
										  ))
										: null}
									<div className={"absolute top-12"}>
										<div className="flex m-auto gap-4 place-content-start">
											{socialMediaRight
												? socialMediaRight.map((l) => (
														<FontAwesome
															animation="none"
															icon={l.icon}
															size="xl"
															onClick={() => fns.route(l.route)}
														/>
												  ))
												: null}
										</div>
									</div>
								</div>
							</Styles.Td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={"lg:py-10"} style={!links ? { display: "none" } : {}}>
				<table width={"100%"}>
					<tbody>
						<tr>
							<td className="w-1/5 relative">
								<img
									onClick={() => fns.route(logo.route)}
									src={logo.src}
									className={"h-16 m-4 lg:h-24 lg:m-auto cursor-pointer"}
								/>
							</td>
							<Styles.Td className="w-4/5 relative">
								<div className="flex m-auto gap-8 relative justify-center">
									{links
										? links.map((l) => (
												<div
													className="text-xl font-bold whitespace-nowrap cursor-pointer"
													onClick={() => fns.route(l.route)}
												>
													{l.text}
												</div>
										  ))
										: null}
									<div className={"absolute top-12"}>
										<div className="flex m-auto gap-4 place-content-start">
											{socialMedia
												? socialMedia.map((l) => (
														<FontAwesome
															animation="none"
															icon={l.icon}
															size="xl"
															onClick={() => fns.route(l.route)}
														/>
												  ))
												: null}
										</div>
									</div>
								</div>
							</Styles.Td>
						</tr>
					</tbody>
				</table>
			</div>
		</Styles.Container>
	);
};

export default Header;
