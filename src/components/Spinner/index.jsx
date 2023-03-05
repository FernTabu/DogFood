import React from "react";
import "./index.css";


const Spinner = () => {
	return (
		<div className="loader">
			<div className="spinner yellow" />
			<div className="spinner orange" />
			<div className="spinner red" />
			<div className="spinner pink" />
			<div className="spinner violet" />
			<div className="spinner mauve" />
			<div className="spinner light-yellow" />
		</div>
	);
};

export default Spinner;
