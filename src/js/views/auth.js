import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import React, { useContext } from "react";
import CryptoJS from "crypto-js";

import "../../styles/auth.scss";
import PropTypes from "prop-types";

export const Auth = props => {
	const { store, actions } = useContext(Context);
	const { register, handleSubmit, watch, errors } = useForm();

	const onSubmit = data => {
		let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.SECRET).toString();
		let bytes = CryptoJS.AES.decrypt(ciphertext, process.env.SECRET);
		let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		actions.signIn(ciphertext, props.history);
	};

	return (
		<div className="text-center mt-5">
			<form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
				<h1 className="h1">
					Wall
					<span className="h4 text-monospace">app</span>
				</h1>
				<h5 className="h5 mb-3 font-weight-normal">Please sign in</h5>
				<label htmlFor="inputEmail" className="sr-only">
					Email address
				</label>
				<input
					type="email"
					id="inputEmail"
					className="form-control"
					placeholder="Email address"
					required
					autoFocus
					name="email"
					ref={register({ required: true })}
				/>
				<label htmlFor="inputPassword" className="sr-only">
					Password
				</label>
				<input
					type="password"
					id="inputPassword"
					className="form-control"
					placeholder="Password"
					required
					name="password"
					ref={register({
						required: true,
						max: 12,
						min: 6,
						maxLength: 20,
						pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
					})}
				/>
				<div className="checkbox mb-3 d-flex justify-content-between px-2">
					<label>
						<input type="checkbox" defaultValue="remember-me" /> Remember me
					</label>
					<Link to="/register">
						<span className="text-decoration-none">Register here</span>
					</Link>
				</div>
				<button className="btn btn-lg btn-success btn-block" type="submit">
					Sign in
				</button>
			</form>
			<div className="form-signin pt-0">
				<Link to="/wall" className="btn btn-lg btn-info btn-block">
					Visit as guest
				</Link>
			</div>
		</div>
	);
};

Auth.propTypes = {
	history: PropTypes.object
};
