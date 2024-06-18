"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

type Props = {
	onNextStage: () => void;
};

const StartPage = (props: Props) => {
	useGSAP(() => {
		gsap.fromTo(
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

		gsap.fromTo(
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
				delay: 0.1,
			}
		);

		gsap.fromTo(
			"#start-button",
			{
				opacity: 0,
				y: 20,
			},
			{
				opacity: 1,
				y: 0,
				ease: "power1.inOut",
				duration: 0.4,
				delay: 0.6,
			}
		);
	}, []);

	return (
		<div className="h-full flex flex-col gap-y-6 justify-center items-center relative">
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

export default StartPage;
