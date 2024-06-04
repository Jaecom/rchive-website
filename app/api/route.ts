import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("file") as any;

	return NextResponse.json({ filename: file?.name ?? "none" });
}
