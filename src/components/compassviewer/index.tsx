import React, { FC } from "react";
import Styles from "./styles";

import DiamondSelector from "../diamondselector/index";

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
		<Styles.Container className={"text-text-primary font-primary"}>
			<table className={"w-full overflow-hidden"}>
				<tbody>
					<tr>
						<td
							className={"transition-all duration-500"}
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
								<div className={`relative mb-40`}>
									<div
										className={`absolute left-1/2 -translate-x-1/2 -bottom-10`}
									>
										<div className={`flex flex-row justify-center space-x-10`}>
											{/* @ts-ignore */}
											{(() => {
												const _: any = [];
												for (let i = 0; i < Math.ceil(items.length / 4); i++)
													_.push(
														<div
															onClick={() => setBatch(i)}
															className={`bg-background-quarternary ${
																batch === i ? "w-8 h-8" : "w-6 h-6"
															} rotate-45 border-${
																batch === i ? "2" : "0"
															} border-background-tertiary cursor-pointer transition-all duration-200 ${
																batch === i ? "opacity-100" : "opacity-30"
															}`}
														/>
													);
												return _;
											})()}
										</div>
									</div>
								</div>
							) : null}
						</td>
						<Styles.TdLg expanded={expanded}>
							<Styles.ViewItem
								className={`${
									expanded ? "w-full" : "w-0"
								} transition-all duration-300 px-12`}
							>
								{RenderItem}
							</Styles.ViewItem>
						</Styles.TdLg>
					</tr>
					<tr className={`xl:hidden`}>
						<Styles.TdSm expanded={expanded}>
							<Styles.ViewItem
								className={`${
									expanded ? "w-full" : "w-0"
								} transition-all duration-300 px-16`}
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
