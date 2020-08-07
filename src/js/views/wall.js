import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import React, { useContext, useEffect } from "react";
import CryptoJS from "crypto-js";

import "../../styles/wall.scss";

export const Wall = () => {
	const { store, actions } = useContext(Context);
	const { register, handleSubmit, watch, errors } = useForm();

	const onSubmit = data => {
		let ciphertext = CryptoJS.AES.encrypt(
			JSON.stringify({ ...data, user_email: store.session.email }),
			process.env.SECRET
		).toString();
		// let bytes = CryptoJS.AES.decrypt(ciphertext, process.env.SECRET);
		// let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		actions.sendComment(ciphertext);
	};

	const findUser = user_id => {
		let fullname = store.users.map(element => {
			if (element.id == user_id) {
				return element.firstName + " " + element.lastName;
			}
		});
		return fullname;
	};

	useEffect(
		() => {
			actions.getComments();
		},
		[store]
	);

	return (
		<div className="container w-50">
			{typeof store.session.email !== "undefined" ? (
				<div className="row text-center mt-5  mx-auto">
					{/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
					<form className="form-comment col" onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="FormControlTextarea1">Leave a comment in our awesome Wall</label>
						<textarea
							name="comment_area"
							className="form-control"
							id="FormControlTextarea1"
							rows="3"
							required
							placeholder="Write something cool !"
							ref={register({ required: true, maxLength: 350 })}
						/>
						<div className="row text-right">
							<div className="col text-right">
								<input className="btn btn-sm btn-primary btn-block" type="submit" />
							</div>
						</div>
					</form>
				</div>
			) : (
				<br />
			)}
			<div className="row">
				<div className="container-fluid d-md-flex flex-column-reverse">
					{store.comments &&
						store.comments.map((e, index) => {
							return (
								<div key={index} className="card flex-fill m-4">
									<div className="card-header">Quote</div>
									<div className="card-body">
										<blockquote className="blockquote mb-0">
											<p>{e.comment}</p>
											<footer className="blockquote-footer">
												The famous <cite title="Source Title">{findUser(e.user_id)}</cite>
											</footer>
										</blockquote>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};
