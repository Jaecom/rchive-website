"use client";

import { use, useState } from "react";
import axios from "axios";
import StartPage from "./StartPage";
import ScanPage from "./ScanPage";
import ResultPage from "./ResultPage";
import { type ResultData } from "@/src/types/result-data";
import useURLPreview from "@/src/hooks/useURLPreview";
import LoadingElement from "@/src/components/LoadingElement";

const IndexPage = () => {
	const [stage, setStage] = useState("start");
	const [image, setImage] = useState<File | undefined>();
	const preview = useURLPreview(image);

	const [resultData, setResultData] = useState<ResultData>({
		emotions: [],
		date: "",
		sender: "",
		keywords: [],
		keyPhrase: "",
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
			const { emotions, date, sender, keywords, keyPhrase, bodyText } = gptData.data;

			setResultData({
				emotions,
				date,
				sender,
				keywords,
				keyPhrase,
				bodyText,
			});
			setImage(image);
			setStage("result");
		} catch (e) {
			setStage("scan");
			setImage(undefined);
		}
	};

	const fakeData = {
		bodyText:
			"To.5학년 3반 친구들\n 얘들아 안녕! 나 보민이야.\n 4학년 때는 시간이 정신없이 지났는데,\n 5학년이 되고 나서는 여러가지 감정을 느낄수 있었어.\n 나에게도 '행복' 이라는 감정을 선물해줘서 고마워.\n 이번한해가 코로나 때문에 기억에 남을 거야.\n 하지만 나는 너희와 같은 반에서 즐겁게 지낸게\n 기억에 남아 나에게 좋은 추억 만들어줘서 고마워!\n 2021/12/27\n From. 5학년이 행복했던 - 보민이가",
		emotions: ["감사", "축하", "우정"],
		date: "2022-01-01",
		sender: "재윤",
		keywords: ["행복", "코로나", "추억"],
		keyPhrase: "기억에 남아 나에게 좋은 추억 만들어줘서 고마워!",
	};

	return (
		<div className="w-full h-full flex justify-center">
			<div className="w-full">
				{stage === "start" && <StartPage onNextStage={() => setStage("scan")} />}
				{stage === "scan" && <ScanPage onScanComplete={handleScanComplete} />}
				{(stage === "ocr" || stage === "gpt") && (
					<LoadingElement
						color={stage === "ocr" ? "#afb2d0" : "#E16D6D"}
						text={stage === "ocr" ? "편지 인식중..." : "AI로 분석중..."}
					/>
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
};

export default IndexPage;
