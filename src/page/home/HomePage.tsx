"use client";

import { use, useState } from "react";
import axios from "axios";
import StartScreen from "./StartScreen";
import ScanScreen from "./ScanScreen";
import ResultScreen from "./ResultScreen";
import { type ResultData } from "@/src/types/result-data";
import useURLPreview from "@/src/hooks/useURLPreview";
import LoadingElement from "@/src/components/LoadingElement";
import { fakeData } from "@/src/utils/fake-data";

const IndexPage = () => {
	const [stage, setStage] = useState("start");
	const [image, setImage] = useState<File | undefined>();
	const preview = useURLPreview(image);

	const [resultData, setResultData] = useState<ResultData>({
		emotions: [],
		date: "",
		sender: "",
		keywords: [],
		keySentence: "",
		bodyText: "",
	});

	const handleScanComplete = async (image: File) => {
		try {
			setStage("ocr");
			const formData = new FormData();
			formData.append("file", image);
			const { data: textData } = await axios.post("/clova", formData);

			const { text } = textData;

			setStage("gpt");
			const { data: gptData } = await axios.post("/gpt", { text }, { headers: { "Content-Type": "application/json" } });
			const { emotions, date, sender, keywords, keySentence, bodyText } = gptData.data;

			setResultData({
				emotions,
				date,
				sender,
				keywords,
				keySentence,
				bodyText,
			});
			setImage(image);
			setStage("result");
		} catch (e) {
			setStage("scan");
			setImage(undefined);
		}
	};

	return (
		<div className="w-full h-full flex justify-center">
			<div className="w-full">
				{stage === "start" && <StartScreen onNextStage={() => setStage("scan")} />}
				{stage === "scan" && <ScanScreen onScanComplete={handleScanComplete} />}
				{(stage === "ocr" || stage === "gpt") && (
					<LoadingElement
						color={stage === "ocr" ? "#afb2d0" : "#E16D6D"}
						text={stage === "ocr" ? "편지 인식중..." : "AI로 분석중..."}
					/>
				)}
				{stage === "result" && (
					<ResultScreen
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
};

export default IndexPage;
