"use client";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GradeIcon from "@mui/icons-material/Grade";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const [image, setImage] = useState<File>();
	const [stage, setStage] = useState({ stage: "upload", isLoading: false });
	const [preview, setPreview] = useState<string>();
	const [text, setText] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		if (!image) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		setImage(event.target.files[0]);
		setStage({ stage: "ocr", isLoading: false });
	};

	const handleOCR = async () => {
		if (!image) return;

		const formData = new FormData();
		formData.append("file", image);

		try {
			setStage({ stage: "ocr", isLoading: true });
			const { data: textData } = await axios.post("http://localhost:8080/image-ocr", formData);
			setText(textData.text);
			setStage({ stage: "gpt", isLoading: false });
		} catch (e) {
			console.log(e);
		}
	};

	const handleGPT = async () => {
		try {
			setStage({ stage: "gpt", isLoading: true });
			const { data: gptData } = await axios.post("http://localhost:8080/analyze-text", { text });
			setCategory(gptData.category);
			setStage({ stage: "done", isLoading: false });
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<main>
			<div className="min-h-screen flex justify-center p-10">
				<div className="w-[400px] flex flex-col items-center gap-y-5 mt-[100px]">
					<div className="flex flex-col items-center justify-center text-center">
						<h1 className="font-bold text-lg">R.Chive Prototype</h1>
						<h3 className="text-[14px]">Step by Step</h3>
					</div>
					<div className="bg-gray-200 h-[400px] w-[400px] relative rounded-md overflow-hidden shadow-lg">
						{preview && <Image src={preview} alt="uploaded image" fill className="object-cover" />}
					</div>
					<div className="flex flex-col w-full gap-y-5">
						{stage.stage === "upload" && (
							<Button component="label" role={undefined} variant="contained" startIcon={<CloudUploadIcon />}>
								Upload Letter
								<input accept=".png,.jpeg" type="file" className="hidden" onChange={handleFileChange}></input>
							</Button>
						)}

						{text && <p className="p-5 rounded-md shadow-lg bg-green-200">{text}</p>}
						{category && <p className="p-5 rounded-md shadow-lg bg-purple-200 text-center">{category}</p>}

						{stage.stage === "ocr" && (
							<Button onClick={handleOCR} variant="contained" color="success" startIcon={<GradeIcon />}>
								{stage.isLoading ? "Extracting text..." : "Extract Text"}
							</Button>
						)}

						{stage.stage === "gpt" && (
							<Button onClick={handleGPT} variant="contained" color="secondary" startIcon={<AutoAwesomeIcon />}>
								{stage.isLoading ? "Analyzing with GPT..." : "Analyze with GPT"}
							</Button>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
