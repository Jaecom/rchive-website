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
				y: -30,
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
				<div className="translate-x-5 translate-y-6">
					<CharacterIcon />
				</div>
			</div>
			<div id="start-image" className="absolute inset-0">
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
			</div>

			<div className="text-center text-primary">
				<p
					id="start-logo"
					className="text-[50px] font-extrabold opacity-0"
					style={{
						textShadow: "1px 1px 2px #00000010",
					}}
				>
					R.Chive
				</p>
				<p
					id="start-content"
					className="text-[19px] font-medium mt-[-10px] opacity-0"
					style={{
						textShadow: "1px 1px 2px #00000010",
					}}
				>
					편지 등록을 시작해보세요
				</p>
			</div>
			<button
				id="start-button"
				className="bg-primary font-medium text-white py-2 px-8 rounded-[10px] opacity-0 shadow-md"
				onClick={props.onNextStage}
			>
				시작하기
			</button>
		</div>
	);
};

export default StartScreen;
