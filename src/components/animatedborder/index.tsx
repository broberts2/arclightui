import React, { FC } from "react";
import Styles from "./styles";

import ClippingMask from "../clippingmask";

export interface PropTypes {
	src: any;
	video: any;
	className?: string | object | null;
	borderWidth: number;
	heightOffset?: number;
	fns: {
		[key: string]: any;
	};
}

const Footer: FC<PropTypes> = ({
	src,
	video,
	className,
	borderWidth,
	heightOffset,
	fns,
}) => {
	return (
		<Styles.Container
			className={className}
			style={{ width: src.props.width, height: src.props.width }}
		>
			<div
				className={`absolute`}
				style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
			>
				<ClippingMask
					fns={fns}
					clippingMask={src}
					src={video}
					width={parseInt(src.props.width.split("px")[0])}
					height={
						parseInt(src.props.width.split("px")[0]) +
						(heightOffset ? heightOffset : 0)
					}
				/>
			</div>
			<Styles.Img
				src={src.props.src}
				style={{
					width: `calc(${src.props.width} - ${borderWidth} * 2)`,
					marginLeft: borderWidth,
				}}
			/>
		</Styles.Container>
	);
};

export default Footer;
