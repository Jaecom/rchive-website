import React, { useState } from "react";
import { type ResultData } from "@/src/types/result-data";
import Image from "next/image";

type Props = {
	result: ResultData;
	preview: string;
};

const ResultPage = ({ result, preview }: Props) => {
	const { emotions, date, sender, keywords, bodyText: textRaw, keyPhrase } = result;

	const [dateValue, setDate] = useState(date);
	const [senderValue, setSender] = useState(sender);
	const [text, setText] = useState(textRaw);

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
		<div className="p-4">
			<div className="flex flex-col gap-y-5">
				<div className="text-[20px]">“{keyPhrase}”</div>
				<div className="text-[20px]">
					<strong>{senderValue}</strong>에게{" "}
					<span className="text-[#E16D6D]">
						<strong>{dateValue.slice(0, 4)}년 </strong>
					</span>
					온 편지입니다!
				</div>
				<div className="relative h-[200px] w-full">
					<Image src={preview} fill alt="Letter Image" style={{ objectFit: "cover" }} />
				</div>
				<div className="flex flex-col gap-y-1 min-w-[200px]">
					<label className="text-[14px] text-gray-600">텍스트</label>
					<textarea
						className="bg-[#FFE6E6] rounded-lg p-2 min-h-[200px]"
						value={text}
						onChange={handleBodyTextChange}
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<label className="text-[14px] text-gray-600">보낸 사람</label>
					<input
						className="bg-[#FFE6E6] rounded-lg p-2"
						type="text"
						value={senderValue}
						onChange={handleSenderChange}
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<label className="text-[14px] text-gray-600">날짜</label>
					<input className="bg-[#FFE6E6] rounded-lg p-2" type="date" value={dateValue} onChange={handleDateChange} />
				</div>
				<div className="flex flex-col gap-y-1">
					<label className="text-[14px] text-gray-600">감정 기록</label>
					<ul className="flex gap-x-4 gap-y-2 flex-wrap">
						{emotions?.map((emotion, index) => (
							<li key={index} className="bg-[#FFE6E6] py-2 px-5 rounded-lg">
								{emotion}
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-y-1">
					<label className="text-[14px] text-gray-600">AI 키워드</label>
					<ul className="flex gap-x-4 gap-y-2 flex-wrap">
						{keywords?.map((keyword, index) => (
							<li key={index} className="bg-[#FFE6E6] py-2 px-5 rounded-lg">
								{keyword}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ResultPage;
