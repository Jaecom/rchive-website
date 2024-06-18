"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import Button from "../../components/Button";
import CameraIcon from "@/public/icons/camera_icon.svg";
import CheckIcon from "@/public/icons/check_icon.svg";
import RedoIcon from "@/public/icons/return_icon.svg";
import Webcam from "react-webcam";
import { dataURLToFile } from "../../utils/date-url-to-file";
import useIsMobile from "../../hooks/useIsMobile";
import useURLPreview from "../../hooks/useURLPreview";

const ASPECT_RATIO = {
	width: 1920,
	height: 1080,
};

type Props = {
	onScanComplete: (image: File) => void;
};

const ScanPage = (props: Props) => {
	const [image, setImage] = useState<File>();
	const webcamRef = useRef<any>(null);
	const isMobile = useIsMobile();
	const preview = useURLPreview(image);

	const handleCameraCapture = React.useCallback(() => {
		if (!webcamRef.current) return;

		const imageSrc = webcamRef.current.getScreenshot({ width: ASPECT_RATIO.width, height: ASPECT_RATIO.height });

		try {
			const file = dataURLToFile(imageSrc, "webcam-image.jpeg");
			setImage(file);
		} catch (e) {}
	}, [webcamRef]);

	const handleTakePhotoAgain = () => {
		setImage(undefined);
	};

	const handleScanComplete = () => {
		if (!image) return;

		props.onScanComplete(image);
	};

	return (
		<div className="p-5 h-full flex flex-col">
			<div className="flex flex-col gap-y-5 mt-[25vh]">
				<p className="text-center">편지를 프레임에 맞춰 스캔해주세요.</p>
				<div className="outline outline-4 outline-[#E16D6D] relative bg-gray-100">
					{preview && (
						<div
							className="relative"
							style={{
								paddingTop: `${(ASPECT_RATIO.height / ASPECT_RATIO.width) * 100}%`,
							}}
						>
							<Image src={preview} alt="Image of photo" fill style={{ objectFit: "cover" }} />
						</div>
					)}

					<Webcam
						height={ASPECT_RATIO.height}
						width={ASPECT_RATIO.width}
						ref={webcamRef}
						style={{ display: preview ? "none" : "block" }}
						screenshotFormat="image/jpeg"
						videoConstraints={{
							//Inverse due to portrait mode
							height: ASPECT_RATIO.width,
							width: ASPECT_RATIO.height,
							facingMode: "environment",
						}}
					/>
				</div>
				<div className="flex flex-col gap-1 items-center">
					{image ? (
						<>
							<Button className="shadow-md" onClick={handleScanComplete} label="스캔완료" icon={<CheckIcon />} />
							<Button outline onClick={handleTakePhotoAgain} label="다시 찍기" icon={<RedoIcon />} />
						</>
					) : (
						<>
							<Button
								className="shadow-md"
								onClick={handleCameraCapture}
								label="편지 사진 찍기"
								icon={<CameraIcon />}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ScanPage;
