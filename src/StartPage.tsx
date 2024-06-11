import React from "react";

type Props = {
	onNextStage: () => void;
};

const StartPage = (props: Props) => {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			<p>알알이 편지 등록을 시작해볼까요?</p>
			<button className="bg-[#E16D6D] text-white py-2 px-4 rounded-md" onClick={props.onNextStage}>
				시작하기
			</button>
		</div>
	);
};

export default StartPage;
