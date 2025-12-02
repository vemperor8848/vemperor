import { Menu } from "@/components";

export default function Navbar() {
	return (
		<div className="fixed top-0 left-0 w-full flex items-center py-5 px-6 sm:px-10 z-[200]">
			<div className="flex-1 flex justify-start">
				<Menu />
			</div>
			<div className="flex-1" />
		</div>
	);
}
