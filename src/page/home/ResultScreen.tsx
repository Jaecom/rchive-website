"use client";

import React, { useState } from "react";
import { type ResultData } from "@/src/types/result-data";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
	result: ResultData;
	preview: string;
};

const ResultScreen = ({ result, preview }: Props) => {
	const { emotions, date: dateRaw, sender, keywords, bodyText: textRaw, keyPhrase } = result;

	const [date, setDate] = useState(dateRaw);
	const [senderValue, setSender] = useState(sender);
	const [text, setText] = useState(textRaw);

	useGSAP(() => {
		const tl = gsap.timeline();

		tl.fromTo(
			"#result-key-text",
			{
				y: 200,
			},
			{
				y: 180,
				opacity: 1,
				ease: "power1.inOut",
				stagger: 0.1,
			}
		);
		tl.to("#result-key-text", { y: 0, delay: 1.3, ease: "power1.inOut" }, 0);
		tl.fromTo("#result-line", { y: 200 }, { y: 0, delay: 0.5, opacity: 1, ease: "power1.inOut" }, 1);
		tl.fromTo("#result-content", { y: 50 }, { y: 0, delay: 1, opacity: 1, ease: "power1.inOut" }, 1);

		gsap.fromTo("#result-content", {}, {});
	}, []);

	const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSender(e.target.value);
	};

	const handleBodyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDate(e.target.value);
	};
	return (
		<div className="p-4 mt-10">
			<div className="flex flex-col items-center">
				<div className="text-center">
					<div id="result-key-text" className="text-[15px]  opacity-0">
						<strong>{senderValue}</strong>에게
						<span className="text-primary">
							<strong> {date.slice(0, 4)}년 </strong>
						</span>
						온 편지입니다!
					</div>
					<div
						id="result-key-text"
						className="mx-auto max-w-[320px] mt-1 text-[22px] font-bold text-primary break-keep opacity-0"
					>
						“{keyPhrase}”
					</div>
				</div>
				<div id="result-line" className="my-5 w-[1.5px] h-[100px] bg-primary opacity-0" />
			</div>

			<div id="result-content" className="flex flex-col gap-y-5 opacity-0">
				<div className="relative h-[200px] w-full">
					<Image src={preview} fill alt="Letter Image" style={{ objectFit: "cover" }} />
				</div>

				<div className="flex flex-col gap-y-1 min-w-[200px]">
					<label className="text-[14px] text-gray-600">텍스트</label>
					<textarea
						className="bg-[#FFE6E6] rounded-lg py-2 px-3 min-h-[200px]"
						value={text}
						onChange={handleBodyTextChange}
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<label className="text-[14px] text-gray-600">보낸 사람</label>
					<input
						className="bg-[#FFE6E6] rounded-lg py-2 px-3"
						type="text"
						value={senderValue}
						onChange={handleSenderChange}
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<label className="text-[14px] text-gray-600">날짜</label>
					<input
						className="bg-[#FFE6E6] rounded-lg h-[40px] px-2"
						type="date"
						value={date}
						onChange={handleDateChange}
					/>
				</div>

				{emotions.length > 0 && (
					<div className="flex flex-col gap-y-1">
						<label className="text-[14px] text-gray-600">감정 기록</label>
						<ul className="flex gap-x-2 gap-y-2 flex-wrap">
							{emotions?.map((emotion, index) => (
								<li key={index} className="bg-[#FFE6E6] py-2 px-4 rounded-lg">
									{emotion}
								</li>
							))}
						</ul>
					</div>
				)}

				{keywords.length > 0 && (
					<div className="flex flex-col gap-y-1">
						<label className="text-[14px] text-gray-600">AI 키워드</label>
						<ul className="flex gap-x-2 gap-y-2 flex-wrap">
							{keywords?.map((keyword, index) => (
								<li key={index} className="bg-[#FFE6E6] py-2 px-4 rounded-lg">
									{keyword}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default ResultScreen;
