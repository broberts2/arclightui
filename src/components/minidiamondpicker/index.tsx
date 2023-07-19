import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
	count: number;
	cb?: Function;
	index?: number;
	columns: number;
}

const Checkbox: FC<PropTypes> = ({ count, cb, index, columns }) => {
	return (
		<Styles.Container className={`h-12`}>
			<div className={`relative`}>
				<div className={`absolute left-1/2 -translate-x-1/2 -bottom-10`}>
					<div className={`flex flex-row justify-center space-x-10`}>
						{/* @ts-ignore */}
						{(() => {
							const _: any = [];
							for (let i = 0; i < Math.ceil(count / columns); i++)
								_.push(
									<div
										onClick={() => (cb ? cb(i) : null)}
										className={`bg-background-quarternary ${
											index === i ? "w-8 h-8" : "w-6 h-6"
										} rotate-45 border-${
											index === i ? "2" : "0"
										} border-background-tertiary cursor-pointer transition-all duration-200 ${
											index === i ? "opacity-100" : "opacity-30"
										}`}
									/>
								);
							return _;
						})()}
					</div>
				</div>
			</div>
		</Styles.Container>
	);
};

export default Checkbox;
