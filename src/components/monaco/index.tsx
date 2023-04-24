import React, { FC } from "react";
import Editor from "@monaco-editor/react";
import Button from "../button";
import Styles from "./styles";

export interface PropTypes {
	language?: string;
	defaultValue?: string;
	state?: { [key: string]: any };
	setState?: Function;
	refName: string;
}

const Monaco: FC<PropTypes> = ({
	language,
	defaultValue,
	state,
	setState,
	refName,
}) => {
	const MonacoRef = React.useRef(null);
	React.useEffect(() => {
		//@ts-ignore
		if (
			MonacoRef &&
			MonacoRef.current &&
			//@ts-ignore
			MonacoRef.monaco &&
			//@ts-ignore
			MonacoRef.monaco.editor
		) {
			//@ts-ignore
			MonacoRef.monaco.editor.setModelLanguage(
				//@ts-ignore
				MonacoRef.monaco.editor.getModels()[0],
				language
			);
			//@ts-ignore
			MonacoRef.current.setValue(defaultValue);
			//@ts-ignore
			MonacoRef.current.getAction("editor.action.formatDocument").run();
		}
	}, [language, defaultValue, refName]);
	return (
		<Styles.Container>
			<Editor
				height={"100%"}
				width={"100%"}
				theme={"vs-dark"}
				defaultLanguage={language ? language : "javascript"}
				defaultValue={defaultValue ? defaultValue : ""}
				onMount={(editor, monaco) => {
					if (setState && MonacoRef) {
						const stateMonacoRef =
							state && state.MonacoRef ? state.MonacoRef : {};
						MonacoRef.current = editor;
						//@ts-ignore
						MonacoRef.monaco = monaco;
						stateMonacoRef[refName] = MonacoRef;
						setState((_: { [key: string]: any }) => ({
							..._,
							MonacoRef: stateMonacoRef,
						}));
						[10, 20, 40, 80].map((n: number) =>
							setTimeout(
								() => editor.getAction("editor.action.formatDocument").run(),
								n
							)
						);
					}
				}}
			/>
			<Styles.FormatButton>
				<Button
					idleIcon={"code"}
					type={"button"}
					size={"sm"}
					animation={true}
					isIconButton={true}
					onClick={(status: any) =>
						MonacoRef && MonacoRef.current
							? MonacoRef.current
									//@ts-ignore
									.getAction("editor.action.formatDocument")
									.run()
							: null
					}
				/>
			</Styles.FormatButton>
		</Styles.Container>
	);
};

export default Monaco;
