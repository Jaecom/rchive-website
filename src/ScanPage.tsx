import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import Button from "./components/Button";
import CameraIcon from "@/public/icons/camera_icon.svg";
import CheckIcon from "@/public/icons/check_icon.svg";
import RedoIcon from "@/public/icons/return_icon.svg";
import Webcam from "react-webcam";
import { dataURLToFile } from "./utils/date-url-to-file";
import useIsMobile from "./hooks/useIsMobile";
import useURLPreview from "./hooks/useURLPreview";

const ASPECT_RATIO = {
	width: 1920,
	height: 1080,
};

type Props = {
	onScanComplete: (image: File) => void;
};

const ScanPage = (props: Props) => {
	const [image, setImage] = useState<File>();
	const webcamRef = React.useRef<any>(null);
	const isMobile = useIsMobile();
	const preview = useURLPreview(image);

	const videoConstraints = {
		height: isMobile ? ASPECT_RATIO.width : ASPECT_RATIO.height,
		width: isMobile ? ASPECT_RATIO.height : ASPECT_RATIO.width,
		facingMode: process.env.NODE_ENV === "production" ? { exact: "environment" } : "user",
	};

	const [isWebcamLoaded, setIsWebcamLoaded] = useState(false);

	const handleCameraCapture = React.useCallback(() => {
		if (!webcamRef.current) return;

		const imageSrc = webcamRef.current.getScreenshot({ width: ASPECT_RATIO.width, height: ASPECT_RATIO.height });

		try {
			const file = dataURLToFile(imageSrc, "webcam-image.jpeg");
			setImage(file);
		} catch (e) {}
	}, [webcamRef]);

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

					{!preview && (
						<Webcam
							height={ASPECT_RATIO.height}
							width={ASPECT_RATIO.width}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
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
