import React, { useEffect, useState } from "react";

const useURLPreview = (image: File | undefined) => {
	const [preview, setPreview] = useState<string>();

	useEffect(() => {
		if (!image) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	return preview;
};

export default useURLPreview;
