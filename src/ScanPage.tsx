import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import Button from "./components/Button";
import CameraIcon from "@/public/icons/camera_icon.svg";
import CheckIcon from "@/public/icons/check_icon.svg";
import RedoIcon from "@/public/icons/return_icon.svg";
import Webcam from "react-webcam";
import { dataURLToFile } from "./utils/date-url-to-file";

const videoConstraints = {
	width: 1920,
	height: 1080,
	facingMode: process.env.NODE_ENV === "production" ? { exact: "environment" } : "user",
};

type Props = {
	onScanComplete: (image: File) => void;
	onImageChange: (image: File) => void;
};

const ScanPage = (props: Props) => {
	const [preview, setPreview] = useState<string>();
	const [image, setImage] = useState<File>();
	const webcamRef = React.useRef<any>(null);
	const [isWebcamLoaded, setIsWebcamLoaded] = useState(false);

	const handleCameraCapture = React.useCallback(() => {
		if (!webcamRef.current) return;

		const imageSrc = webcamRef.current.getScreenshot({ width: 1920, height: 1080 });
		try {
			const file = dataURLToFile(imageSrc, "webcam-image.jpeg");
			setImage(file);
		} catch (e) {}
	}, [webcamRef]);

	useEffect(() => {
		if (!image) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	const handleTakePhotoAgain = () => {
		setIsWebcamLoaded(false);
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
				<div>
					{!isWebcamLoaded && <div className="w-full relative pt-[56.25%] bg-gray-100" />}
					{preview ? (
						<div className="w-full relative pt-[56.25%]">
							<Image src={preview} alt="Image of photo" fill style={{ objectFit: "cover" }} />
						</div>
					) : (
						<Webcam
							audio={false}
							height={1080}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							width={1920}
							videoConstraints={videoConstraints}
							onUserMedia={() => setIsWebcamLoaded(true)}
						/>
					)}
				</div>
				<div className="flex flex-col gap-1 items-center">
					{image ? (
						<>
							<Button onClick={handleScanComplete} label="스캔완료" icon={<CheckIcon />} />
							<Button outline onClick={handleTakePhotoAgain} label="다시 찍기" icon={<RedoIcon />} />
						</>
					) : (
						<>
							{isWebcamLoaded && <Button onClick={handleCameraCapture} label="편지 사진 찍기" icon={<CameraIcon />} />}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ScanPage;
