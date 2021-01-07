import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Toast } from "react-bootstrap";

export const Alert = () => {
	const { store, actions } = useContext(Context);
	const { message } = store;

	return (
		<Toast
			aria-live="polite"
			aria-atomic="true"
			style={{
				position: "absolute",
				bottom: 0,
				right: 0
			}}
			className={`d-flex bg-${message.type}`}
			onClose={e => actions.clearMessage()}>
			<Toast.Header>
				<strong className="mr-auto">{message.text}</strong>
			</Toast.Header>
		</Toast>
	);
};
