import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactList = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
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
												onClick={e => actions.deleteContact(contact.id)}
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
	);
};

ContactList.propTypes = {
	match: PropTypes.object
};
