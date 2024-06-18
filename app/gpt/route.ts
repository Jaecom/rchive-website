import { NextResponse } from "next/server";
import axios from "axios";
const emotions = ["축하", "위로", "사랑", "우정", "감사", "응원", "조언"];

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	const { text } = await request.json();

	const { data: responseData } = await axios.post(
		"https://api.openai.com/v1/chat/completions",
		{
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `You are a letter analyst.
	          You are trying to decipher the key emotion the writer is expressing with the letter.
	          Select one or more emotions from this array: [${emotions}].
	          Please provide the emotion words separated by commas.
	          Also, extract the date and the sender of the text, if available.
	          Here is the text: ${text}
            The response should be in the format of {
              "emotions": ["emotion1", ...],
              "date": "date",
              "sender": "sender",
              "keywords": ["keyword1", ...],
							"bodyText": "bodyText"
							"keySentence": "Key sentence from the bodyText that is the core of the letter",
            }.
            Put empty string if the field cannot be found.
            Date should be in the format of YYYY-MM-DD.`,
				},
			],
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.GPT_SECRET}`,
			},
		}
	);

	const data = responseData.choices[0].message.content;
	const dataJSON = JSON.parse(data);

	return NextResponse.json({ data: dataJSON });
}
