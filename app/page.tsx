"use client";

import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import StartPage from "@/src/StartPage";
import ScanPage from "@/src/ScanPage";
import ResultPage from "@/src/ResultPage";
import { type ResultData } from "@/src/types/result-data";

export default function Home() {
	const [stage, setStage] = useState("start");
	const [preview, setPreview] = useState<string>();
	const [image, setImage] = useState<File>();
	const [resultData, setResultData] = useState<ResultData>({
		text: "",
		emotions: [],
		date: "",
		sender: "",
		keywords: [],
		keyPhrase: "",
	});

	useEffect(() => {
		if (!image) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	const handleScanComplete = async (image: File) => {
		try {
			setStage("ocr");
			const formData = new FormData();
			formData.append("file", image);
			const { data: textData } = await axios.post("/clova", formData);

			const { text } = textData;

			setStage("gpt");
			const { data: gptData } = await axios.post("/gpt", { text }, { headers: { "Content-Type": "application/json" } });
			const { emotions, date, sender, keywords, keyPhrase } = gptData.data;

			setResultData({
				text,
				emotions,
				date,
				sender,
				keywords,
				keyPhrase,
			});

			setStage("result");
		} catch (e) {
			setStage("scan");
			setImage(undefined);
		}
	};

	const fakeData = {
		text: "To.5학년 3반 친구들\n 얘들아 안녕! 나 보민이야.\n 4학년 때는 시간이 정신없이 지났는데,\n 5학년이 되고 나서는 여러가지 감정을 느낄수 있었어.\n 나에게도 '행복' 이라는 감정을 선물해줘서 고마워.\n 이번한해가 코로나 때문에 기억에 남을 거야.\n 하지만 나는 너희와 같은 반에서 즐겁게 지낸게\n 기억에 남아 나에게 좋은 추억 만들어줘서 고마워!\n 2021/12/27\n From. 5학년이 행복했던 - 보민이가",
		emotions: ["감사", "축하", "우정"],
		date: "2022-01-01",
		sender: "재윤",
		keywords: ["행복", "코로나", "추억"],
		keyPhrase: "대학에서도 화이팅!",
	};

	const cubeStyle = {
		"--bg-color": stage === "ocr" ? "#74c69d" : "#9d4edd",
	} as React.CSSProperties;

	return (
		<div className="w-full h-full flex justify-center">
			<div className="w-full">
				{stage === "start" && <StartPage onNextStage={() => setStage("scan")} />}
				{stage === "scan" && (
					<ScanPage onScanComplete={handleScanComplete} onImageChange={(image) => setImage(image)} />
				)}
				{(stage === "ocr" || stage === "gpt") && (
					<div className="h-full w-full flex flex-col justify-center items-center">
						<div className="sk-folding-cube" style={cubeStyle}>
							<div className="sk-cube1 sk-cube"></div>
							<div className="sk-cube2 sk-cube"></div>
							<div className="sk-cube4 sk-cube"></div>
							<div className="sk-cube3 sk-cube"></div>
						</div>
						<div className={stage === "ocr" ? "text-[#74c69d]" : "text-[#9d4edd]"}>
							{stage === "ocr" ? "편지 인식중..." : "AI로 분석중..."}
						</div>
					</div>
				)}

				{stage === "result" && (
					<ResultPage
						result={resultData}
						preview={
							preview ??
							"https://images.unsplash.com/photo-1718049720096-7f1af82d69af?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
						}
					/>
				)}
			</div>
		</div>
	);
}
