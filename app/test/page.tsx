"use client";
import React, { useState } from "react";
import axios from "axios";

function ㅖㅁㅎㄷ() {
	const [file, setFile] = useState(null);

	const handleFileChange = (e: any) => {
		setFile(e.target.files[0]);
	};

	const onOCRClick = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		const res = await axios.post("/api", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		console.log(res.data);
	};
	const onGPTClick = async () => {};

	return (
		<div>
			<div onClick={onOCRClick}>OCR</div>
			<input type="file" onChange={handleFileChange} />
			<div onClick={onGPTClick}>GPT</div>
		</div>
	);
}

export default ㅖㅁㅎㄷ;
