import React, { useEffect, useState } from "react";

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const userAgent = navigator.userAgent;
		const isMobile = /Mobile/.test(userAgent);

		setIsMobile(isMobile);
	}, []);

	return isMobile;
};

export default useIsMobile;
