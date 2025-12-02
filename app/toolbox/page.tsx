import { partyItems } from "@/constants";

export default function ToolboxPage() {
	return (
		<div className="min-h-screen bg-[#FF7BCA] text-[#1c1c1c]">
			<div className="max-w-6xl mx-auto px-6 py-28 flex flex-col gap-10">
				<div className="flex flex-col gap-4">
					<p className="text-sm uppercase font-helveticaNeue tracking-[0.2em]">
						Toolbox
					</p>
					<h1 className="text-[12vw] md:text-[140px] leading-[0.9] font-humaneMedium uppercase tracking-tight">
						Resources & rituals
					</h1>
					<p className="text-lg md:text-2xl leading-relaxed uppercase font-helveticaNeue text-black/70">
						The kits, plugins, and practices that keep builds flowing. Borrow
						what helps, remix the rest.
					</p>
				</div>
				<div className="flex flex-col divide-y divide-black/20 rounded-[32px] border border-black/10 overflow-hidden bg-white/30 backdrop-blur">
					{partyItems.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between px-6 py-5 hover:bg-black/5 transition-colors">
							<h3 className="text-[28px] md:text-[38px] uppercase font-humaneMedium leading-tight">
								{item.title}
							</h3>
							<span className="text-sm font-helveticaNeue uppercase text-black/60">
								Updated often
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
