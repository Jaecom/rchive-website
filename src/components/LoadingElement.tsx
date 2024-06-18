import React from "react";

type Props = {
	color: string;
	text: string;
};

const LoadingElement = ({ color, text }: Props) => {
	const cubeStyle = {
		"--bg-color": color,
	} as React.CSSProperties;

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<div className="sk-folding-cube" style={cubeStyle}>
				<div className="sk-cube1 sk-cube"></div>
				<div className="sk-cube2 sk-cube"></div>
				<div className="sk-cube4 sk-cube"></div>
				<div className="sk-cube3 sk-cube"></div>
			</div>
			<div style={{ color }}>{text}</div>
		</div>
	);
};

export default LoadingElement;
