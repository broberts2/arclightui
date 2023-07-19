import { Snackbar } from "@material-ui/core";
import { AlertProps } from "@mui/material/Alert";
import { Alert as MuiAlert } from "@mui/material";
import React, { FC } from "react";
import Styles from "./styles";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface PropTypes {
	hide: Function;
	D: any;
}

const buildMessage = (D: any, setMessage: Function) => {
	if (D && D.serversuccess)
		return setMessage({
			msg: D.serversuccess,
			severity: "success",
		});
	else if (D && D.servererror)
		return setMessage({
			msg: D.servererror,
			severity: "error",
		});
	else if (D && D.serverwarning)
		return setMessage({
			msg: D.serverwarning,
			severity: "warning",
		});
	else if (D && D.servermessage)
		return setMessage({
			msg: D.servermessage,
			severity: "info",
		});
};

const Snack: FC<PropTypes> = React.memo(({ hide, D }) => {
	const [message, setMessage] = React.useState({ severity: "info", msg: "" });
	React.useEffect(
		() => buildMessage(D, setMessage),
		[
			D ? D.serversuccess : null,
			D ? D.servererror : null,
			D ? D.serverwarning : null,
			D ? D.servermessage : null,
		]
	);
	return (
		<Styles.Container>
			<Snackbar
				open={
					D &&
					(D.serversuccess ||
						D.servererror ||
						D.serverwarning ||
						D.servermessage)
				}
				autoHideDuration={6000}
				onClose={() => hide()}
			>
				{/* @ts-ignore */}
				<Alert onClose={() => hide()} severity={message.severity}>
					{message.msg}
				</Alert>
			</Snackbar>
		</Styles.Container>
	);
});

export default Snack;
