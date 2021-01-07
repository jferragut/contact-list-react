const getState = ({ getStore, getActions, setStore }) => {
	const baseURL = "https://assets.breatheco.de/apis/fake/contact";
	const agenda_slug = "jons_awesome_agenda";

	return {
		store: {
			contacts: [],
			message: {
				alert: false,
				text: "",
				type: ""
			}
		},
		actions: {
			// Use getActions to call a function within a fuction
			// getActions().changeColor(0, "green");
			syncContacts: () => {
				fetch(`${baseURL}/agenda/${agenda_slug}`)
					.then(resp => {
						if (!resp.ok) throw new Error(resp.statusText);
						return resp.json();
					})
					.then(data => setStore({ contacts: data }))
					.catch(err => console.error(err));
			},
			addContact: newContact => {
				newContact.agenda_slug = agenda_slug;

				return fetch(`${baseURL}/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newContact)
				})
					.then(resp => {
						if (!resp.ok) throw new Error(resp.statusText);
						return resp.json();
					})
					.then(data => {
						setStore({
							message: {
								alert: true,
								text: "Contact Successfully Added",
								type: "success"
							}
						});

						getActions().syncContacts();
						return true;
					})
					.catch(err => {
						setStore({
							message: {
								alert: true,
								text: err,
								type: "danger"
							}
						});
					});
			},
			updateContact: (contactID, contact) => {
				contact.agenda_slug = agenda_slug;

				return fetch(`${baseURL}/${contactID}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				})
					.then(resp => {
						if (!resp.ok) throw new Error(resp.statusText);
						return resp.json();
					})
					.then(data => {
						setStore({
							message: {
								alert: true,
								text: "Contact Successfully Updated",
								type: "success"
							}
						});

						getActions().syncContacts();
						return true;
					})
					.catch(err => {
						setStore({
							message: {
								alert: true,
								text: err,
								type: "danger"
							}
						});
					});
			},
			deleteContact: contactID => {
				fetch(`${baseURL}/${contactID}`, {
					method: "DELETE"
				})
					.then(resp => {
						if (!resp.ok) throw new Error(resp.statusText);
						return resp.json();
					})
					.then(data => {
						setStore({
							message: {
								alert: true,
								text: "Contact Successfully Deleted",
								type: "success"
							}
						});

						getActions().syncContacts();
					})
					.catch(err => {
						setStore({
							message: {
								alert: true,
								text: err,
								type: "danger"
							}
						});
					});
			},
			deleteAllContacts: () => {
				fetch(`${baseURL}/agenda/${agenda_slug}`, {
					method: "DELETE"
				})
					.then(resp => {
						if (!resp.ok) throw new Error(resp.statusText);
						return resp.json();
					})
					.then(data => {
						setStore({
							message: {
								alert: true,
								text: "All Contacts Successfully Deleted",
								type: "success"
							}
						});

						getActions().syncContacts();
					})
					.catch(err => {
						setStore({
							message: {
								alert: true,
								text: err,
								type: "danger"
							}
						});
					});
			},
			setMessage: data => {
				setStore({
					message: {
						alert: true,
						text: data.text,
						type: data.type
					}
				});
			},
			clearMessage: () => {
				setStore({
					message: {
						alert: false,
						text: "",
						type: ""
					}
				});
			}
		}
	};
};

export default getState;
