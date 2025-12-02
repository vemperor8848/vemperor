import { Parallax, Sticky } from "@portfolio/animation";
import {
	About,
	Footer,
	Hero,
	Process,
	FrontEnd,
	Testimonials,
	Services,
} from "@portfolio/components";

export default function Home() {
	return (
		<>
			<div className="sm:hidden block">
				<Sticky />
			</div>
			<Hero />
			<div className="px-[50px]">
				<About />
			</div>
			<Process />
			<Parallax />
			<FrontEnd />
			<Testimonials />
			<Services />
			<div className="px-[50px]">{<Footer />}</div>
		</>
	);
}
