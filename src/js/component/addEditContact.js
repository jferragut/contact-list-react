import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

export const AddEditContact = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	let history = useHistory();
	const theid = params.theid;
	const [name, setName] = useState(typeof theid !== "undefined" ? store.contacts[theid].full_name : null);
	const [email, setEmail] = useState(typeof theid !== "undefined" ? store.contacts[theid].email : null);
	const [phone, setPhone] = useState(typeof theid !== "undefined" ? store.contacts[theid].phone : null);
	const [address, setAddress] = useState(typeof theid !== "undefined" ? store.contacts[theid].address : null);

	useEffect(
		() => {
			if (typeof theid === "undefined") {
				setName("");
				setEmail("");
				setPhone("");
				setAddress("");
			}
		},
		[theid]
	);

	const handleSubmit = async () => {
		if (typeof theid === "undefined") {
			// We are adding, not editing
			try {
				await actions.addContact({
					full_name: name,
					email: email,
					address: address,
					phone: phone
				});
				history.push("/");
			} catch {
				actions.setMessage({
					text: "Failed to add contact.",
					type: "danger"
				});
			}
		} else {
			// We are editing a contact
			try {
				await actions.updateContact(store.contacts[theid].id, {
					full_name: name,
					email: email,
					address: address,
					phone: phone
				});
				history.push("/");
			} catch {
				actions.setMessage({
					text: "Failed to update contact.",
					type: "danger"
				});
			}
		}
	};

	return (
		<div className="container">
			<h1>{typeof theid !== "undefined" ? "Edit" : "Add new"} Contact</h1>
			<form onSubmit={e => e.preventDefault()}>
				<div className="mb-3">
					<label htmlFor="fullName" className="form-label">
						Full Name
					</label>
					<input
						type="text"
						className="form-control"
						id="fullName"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">
						Phone
					</label>
					<input
						type="tel"
						className="form-control"
						id="phone"
						value={phone}
						onChange={e => setPhone(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">
						Address
					</label>
					<input
						type="text"
						className="form-control"
						id="address"
						value={address}
						onChange={e => setAddress(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
};
