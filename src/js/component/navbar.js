import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = props => {
	const { store, actions } = useContext(Context);

	const handledLogout = () => {
		console.log(props);
		actions.logout(props.history);
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<h1 className="h1">
						Wall
						<span className="h4 text-monospace">app</span>
					</h1>
				</span>
			</Link>
			<div className="ml-auto">
				<button className="btn btn-primary" onClick={() => handledLogout()}>
					{typeof store.session.email !== "undefined" ? "Log out" : "Sign in"}
				</button>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	history: PropTypes.object
};

export default withRouter(Navbar);
