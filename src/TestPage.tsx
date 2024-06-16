"use client";

import React from "react";
import Webcam from "react-webcam";
import useIsMobile from "@/src/hooks/useIsMobile";

const TestPage = () => {
	const isMobile = useIsMobile();

	const videoConstraints = {
		width: 1080,
		height: 1920,
		facingMode: "environment",
	};

	return (
		<div>
			<Webcam width={1920} height={1920} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
		</div>
	);
};

export default TestPage;
