import React, { FC } from "react";
import Card from "../card";
import Styles from "./styles";

export interface PropTypes {
	defaultBackground: string;
	setModal: Function;
	modal: {
		bgImg?: string;
		noescape?: boolean;
		mode?: "full";
		body?: JSX.Element;
	} | null;
	fns: any;
	D: any;
}

let M = false;

const Modal: FC<PropTypes> = ({
	defaultBackground,
	modal,
	setModal,
	fns,
	D,
}) => {
	let Body;
	if (modal) M = true;
	if (modal && modal.body) Body = modal.body;
	const [exitButton, setExitButton] = React.useState(true);
	React.useEffect(() => fns.scrollLock(modal ? true : false), [modal]);
	return (
		<div
			className={`absolute top-0 ${M ? `opacity-100` : `opacity-0`}`}
			style={{
				zIndex: 9998,
				pointerEvents: !modal ? "none" : "auto",
			}}
		>
			<Styles.Container>
				<Styles.Backdrop
					onClick={() => (modal && !modal.noescape ? setModal(null) : null)}
					className={`bg-visibility-primary ${
						modal ? "opacity-100" : "opacity-0"
					} transition-opacity duration-300`}
				></Styles.Backdrop>
				<Styles.Element className={`flex justify-center`}>
					<Card
						modal={modal?.mode === "full"}
						exitButton={exitButton ? () => setModal(null) : undefined}
						mountAnim={{
							anim: modal ? "zoomIn" : "zoomOut",
							duration: "0.25s",
							delay: `0s`,
						}}
						hover={{
							onMouseEnter: () => {},
							onMouseLeave: () => {},
						}}
						bgImg={modal && modal.bgImg ? modal.bgImg : defaultBackground}
						bodyComponent={
							modal?.body ? (
								<Body
									setExitButton={setExitButton}
									D={D}
									fns={fns}
									setModal={setModal}
								/>
							) : null
						}
						onClick={() => null}
					/>
				</Styles.Element>
			</Styles.Container>
		</div>
	);
};

export default Modal;
