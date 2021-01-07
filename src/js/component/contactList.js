import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";

export const ContactList = props => {
	const [show, setShow] = useState(false);
	const [currentContact, setCurrentContact] = useState(null);
	const { store, actions } = useContext(Context);
	const params = useParams();

	const handleDelete = contact => {
		setCurrentContact(contact);
		setShow(true);
	};

	const resetContact = () => {
		setShow(false);
		setCurrentContact(null);
	};

	return (
		<>
			<ul className="list-group container mb-5">
				{store.contacts.map((contact, index) => {
					return (
						<li className="list-group-item" key={index}>
							<div className="row py-4">
								<div className="col-3">
									<img
										src="https://randomuser.me/api/portraits/men/40.jpg"
										alt="contact avatar"
										className="rounded-circle"
									/>
								</div>
								<div className="col-6 text-left">
									<p className="h4 mb-3">{contact.full_name}</p>
									<ul className="list-unstyled">
										<li>
											<div className="row">
												<div className="col">
													<i className="fas fa-map-marker-alt" />
												</div>
												<div className="col-11">{contact.address}</div>
											</div>
										</li>
										<li className="my-2">
											<div className="row">
												<div className="col">
													<i className="fas fa-phone" />
												</div>
												<div className="col-11">{contact.phone}</div>
											</div>
										</li>
										<li>
											<div className="row">
												<div className="col">
													<i className="fas fa-envelope" />
												</div>
												<div className="col-11">{contact.email}</div>
											</div>
										</li>
									</ul>
								</div>
								<div className="col-3">
									<ul className="list-unstyled list-inline text-right pr-5">
										<li className="list-inline-item mr-5">
											<Link to={`/edit/${index}`}>
												<i className="fas fa-pencil-alt fa-lg" />
											</Link>
										</li>
										<li className="list-inline-item">
											<Link to={`#`}>
												<i
													className="fas fa-trash-alt  fa-lg"
													onClick={e => handleDelete(contact)}
												/>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
			{currentContact && (
				<Modal show={show} onHide={e => setShow(false)} backdrop="static" centered>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Delete</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>
							Are you sure that you&apos;d like to delete the selected contact, {currentContact.full_name}
							?
						</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={resetContact}>
							Cancel
						</Button>
						<Button
							variant="danger"
							onClick={e => {
								actions.deleteContact(currentContact.id);
								resetContact();
							}}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
};

ContactList.propTypes = {
	match: PropTypes.object
};
