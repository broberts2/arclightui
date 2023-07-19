import React, { FC } from "react";
import Styles from "./styles";
import FadeDivider from "../fadedivider";
import GoogleDoc from "../googledoc";

export interface PropTypes {
	fns: {
		[key: string]: any;
	};
	className?: string | object | null;
	bannerImg: string;
	ruby: string;
	googledoc: string;
	author?: string;
	nopage: string;
}

const ArticlePage: FC<PropTypes> = ({
	className,
	fns,
	bannerImg,
	ruby,
	googledoc,
	author,
	nopage,
}) => {
	return (
		<Styles.Container className={className}>
			{googledoc ? <FadeDivider img={bannerImg} ruby={ruby} /> : null}
			<Styles.Body>
				{googledoc ? (
					<GoogleDoc url={googledoc} author={author} />
				) : (
					<Styles.Nopage src={nopage} />
				)}
			</Styles.Body>
		</Styles.Container>
	);
};

export default ArticlePage;
