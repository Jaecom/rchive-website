import { NextResponse } from "next/server";
import axios from "axios";
export const dynamic = "force-dynamic";
import sharp from "sharp";

export async function POST(request: Request) {
	const data = await request.formData();
	const file = data.get("file") as File;

	const formData = new FormData();

	const imageBuffer = await file.arrayBuffer();

	const resizedBuffer = await sharp(Buffer.from(imageBuffer)).jpeg({ quality: 70 }).toBuffer();

	formData.append("file", new Blob([resizedBuffer], { type: file.type }));

	formData.append(
		"message",
		JSON.stringify({
			version: "V2",
			requestId: "1",
			timestamp: 0,
			images: [{ format: "jpg", name: "string" }],
		})
	);

	try {
		const { data } = await axios.post(process.env.CLOVA_URL ?? "", formData, {
			headers: {
				"X-OCR-SECRET": process.env.CLOVA_SECRET ?? "",
				"Content-Type": "multipart/form-data",
			},
		});

		const text = data.images[0].fields.reduce((acc: string, field: any) => {
			return `${acc} ${field.inferText}${field.lineBreak ? "\n" : ""}`;
		}, "");
		console.log(text);

		return NextResponse.json({ text });
	} catch (error) {
		console.error("Error uploading file:", error);
		return NextResponse.json({ error: "Error uploading file" });
	}
}
