import { Chilanka } from "next/font/google";
import React from "react";

type Props = {
	onClick: () => void;
	children?: React.ReactNode;
	outline?: boolean;
	label: string;
};

const Button = ({ onClick, children, outline, label }: Props) => {
	return (
		<button
			className={`${outline ? "" : "bg-[#E16D6D]"} ${outline ? "text-[#E16D6D]" : "text-white"} py-2 px-5 rounded-md`}
			onClick={onClick}
		>
			<div className="font-semibold">{label}</div>
		</button>
	);
};

export default Button;
