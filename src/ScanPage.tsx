import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import Button from "./components/Button";
import CameraIcon from "@/public/icons/camera_icon.svg";
import CheckIcon from "@/public/icons/check_icon.svg";
import RedoIcon from "@/public/icons/return_icon.svg";

type Props = {
	onScanComplete: (image: File) => void;
	onImageChange: (image: File) => void;
};

const ScanPage = (props: Props) => {
	const [preview, setPreview] = useState<string>();
	const [image, setImage] = useState<File>();
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!image) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		setImage(file);
		props.onImageChange(file);
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleScanComplete = () => {
		if (!image) return;

		props.onScanComplete(image);
	};

	return (
		<div className="p-5 h-full flex flex-col justify-center">
			<div className="flex flex-col gap-y-5">
				<p className="text-center">편지를 프레임에 맞춰 스캔해주세요.</p>
				<div className="w-full h-[200px] x-2 bg-gray-200 relative">
					{preview && <Image src={preview} alt="Image of photo" fill style={{ objectFit: "cover" }} />}
				</div>
				<div className="flex flex-col gap-1 items-center">
					{image ? (
						<>
							<Button onClick={handleScanComplete} label="스캔완료" icon={<CheckIcon />} />
							<Button outline onClick={handleButtonClick} label="다시 찍기" icon={<RedoIcon />} />
						</>
					) : (
						<Button onClick={handleButtonClick} label="편지 사진 찍기" icon={<CameraIcon />} />
					)}
				</div>
			</div>

			<input
				type="file"
				accept="image/*"
				capture="environment"
				onChange={handleFileChange}
				ref={fileInputRef}
				style={{ display: "none" }}
			/>
		</div>
	);
};

export default ScanPage;
