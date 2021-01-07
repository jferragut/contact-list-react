import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { ContactList } from "../component/contactList";

export const Home = () => (
	<div className="text-center mt-5">
		<ContactList />
	</div>
);
