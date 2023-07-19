import React, { FC } from "react";
import Styles from "./styles";

export interface PropTypes {
	url: string;
	author?: string;
}

const GoogleDoc: FC<PropTypes> = ({ url, author }) => {
	const docref = React.useRef(null);
	const [docImport, setDocImport] = React.useState<JSX.Element | null>(null);
	React.useEffect(() => {
		(async () => {
			const _ = await fetch(url)
				.then((res) => res.text())
				.then((__html) => (
					<div
						ref={docref}
						dangerouslySetInnerHTML={{
							__html,
						}}
					/>
				));
			setDocImport(_);
		})();
	}, [url]);
	React.useEffect(() => {
		if (docref && docref.current) {
			setDocImport(
				<Styles.Document
					scrolling="no"
					frameBorder="0"
					width={"817px"}
					//@ts-ignore
					height={docref.current.scrollHeight - docref.current.offsetTop}
					src={url}
				/>
			);
		}
	}, [docImport]);
	return (
		<Styles.Container className={""}>
			<Styles.Body className={`m-10`}>
				{docImport}
				{author ? (
					<Styles.Author className={`p-5 text-xl`}>
						{author.split("(M) ")[1]}
					</Styles.Author>
				) : null}
			</Styles.Body>
		</Styles.Container>
	);
};

export default GoogleDoc;
