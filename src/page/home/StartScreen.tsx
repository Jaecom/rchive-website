"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import CharacterIcon from "@/public/icons/character_icon.svg";

gsap.registerPlugin(useGSAP);

type Props = {
	onNextStage: () => void;
};

const StartScreen = (props: Props) => {
	useGSAP(() => {
		const tl = gsap.timeline();

		tl.fromTo(
			"#start-logo",
			{
				opacity: 0,
				y: -20,
			},
			{
				opacity: 1,
				y: 0,
				ease: "power1.out",
				duration: 0.6,
			}
		);

		tl.fromTo(
			"#start-content",
			{
				opacity: 0,
				y: 30,
			},
			{
				opacity: 1,
				y: 0,
				ease: "power1.out",
				duration: 0.6,
			},
			0.1
		);

		tl.fromTo(
			"#start-button",
			{
				opacity: 0,
				y: 20,
			},
			{
				opacity: 1,
				y: 0,
				ease: "power1.inOut",
			},
			0.6
		);

		tl.fromTo(
			"#start-character",
			{
				x: -10,
				rotation: -5,
			},
			{
				x: 0,
				opacity: 1,
				ease: "power1.inOut",
				rotation: 0,
				duration: 0.4,
			}
		);
	}, []);

	return (
		<div className="h-full flex flex-col gap-y-4 justify-center items-center relative overflow-hidden">
			<div id="start-character" className="absolute right-0 bottom-0 opacity-0">
				<div className="translate-x-10 translate-y-10">
					<CharacterIcon />
				</div>
			</div>
			{/* <div id="start-image" className="absolute inset-0">
				<Image
					priority
					src={"/images/envelope_background.jpg"}
					fill
					style={{
						objectFit: "cover",
					}}
					alt="background"
					className="z-[-2]"
					quality={100}
				/>
			</div> */}

			<div className="flex flex-col gap-y-[20px] text-center">
				<p id="start-logo" className="text-[22px] font-black opacity-0 text-primary">
					R.Chive
				</p>
				<p id="start-content" className="text-[20px] leading-[1.3] text-gray-500 font-extrabold mt-[-10px] opacity-0">
					알알이와 편지 등록을 시작해볼까요?
				</p>
			</div>
			<button
				id="start-button"
				className="bg-primary mt-[86px] font-medium text-white py-2 px-8 rounded-[10px] opacity-0 shadow-md"
				onClick={props.onNextStage}
			>
				시작하기
			</button>
		</div>
	);
};

export default StartScreen;
