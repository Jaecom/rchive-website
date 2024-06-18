import { Chilanka } from "next/font/google";
import React from "react";

type Props = {
	onClick: () => void;
	outline?: boolean;
	label: string;
	icon?: React.ReactNode;
	className?: string;
};

const Button = ({ onClick, outline, label, icon, className }: Props) => {
	return (
		<button
			className={`${outline ? "" : "bg-[#E16D6D]"} ${
				outline ? "text-[#E16D6D]" : "text-white"
			} py-2 px-5 rounded-md ${className}`}
			onClick={onClick}
		>
			<div className="flex justify-center items-center gap-x-1.5">
				<div className="font-semibold">{label}</div>
				{icon}
			</div>
		</button>
	);
};

export default Button;
