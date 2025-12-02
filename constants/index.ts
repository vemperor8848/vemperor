import { arrowUp, discord, event2, event3, event4, insta, tutor1, tutor2, tutor3, tutor4, twitter, youtube } from "@/public";

export const navItemss = [
	{
		id: 1,
		title: "home",
		href: "/",
	},
   {
      id: 2,
      title: "about",
      href: "/about",
   },
   {
      id: 3,
      title: "imprints",
      href: "/imprints",
   },
   {
      id: 4,
      title: "toolbox",
      href: "/toolbox",
   },
	{
		id: 5,
		title: "blog",
		href: "/blog",
	},
];

export const eventItems = [
   {
      id: 1,
      src: "/event4.mp4",
      title1: "lab",
      title2: "notes",
      heading1: "V Emperor",
      heading2: "build log",
      date: "12 may 24",
      btn: "feature",
		color: "#fff",
		href: "#home",
	},
	{
		id: 2,
		src: event2,
      title1: "design",
      title2: "systems",
      heading1: "fractals of focus",
      heading2: "figma process",
		color: "#000",
		date: "18 apr 24",
		btn: "article",
		href: "#home",
	},
	{
		id: 3,
      src: event3,
      title1: "code",
      title2: "craft",
      heading1: "next.js + motion",
      heading2: "case study",
		color: "#fff",
		date: "08 mar 24",
		btn: "deep dive",
		href: "#home",
	},
	{
		id: 4,
      src: event4,
      title1: "studio",
      title2: "habits",
      heading1: "solo builder",
      heading2: "ops notes",
		color: "#000",
		date: "22 feb 24",
		btn: "notes",
		href: "#home",
	},
];

export const tutorsItems = [
   {
      id: 1,
      img: tutor1,
      title: "design systems",
      color: "#5546FF",
      btn: "longform series",
   },
   {
      id: 2,
      img: tutor2,
      title: "creative coding",
      color: "#FF7BCA",
      btn: "motion + 3d",
   },
   {
      id: 3,
      img: tutor3,
      title: "product stories",
      color: "#BFFF0A",
      btn: "case studies",
   },
   {
      id: 4,
      img: tutor4,
      title: "studio ops",
      color: "#FFFFFF",
      btn: "solo tooling",
   },
];

export const partyItems = [
   {
      id: 1,
      img: tutor1,
      title: "TypeScript-first UI kits I lean on",
      src: arrowUp,
   },
   {
      id: 2,
      img: tutor2,
      title: "Playful motion studies in WebGL",
      src: arrowUp,
   },
   {
      id: 3,
      img: tutor3,
      title: "Design system starter files I reuse",
      src: arrowUp,
   },
   {
      id: 4,
      img: tutor4,
      title: "Weekly notebook drops & resources",
      src: arrowUp,
   },
];

export const socialItem = [
   {
      id: 1,
      src: insta,
      href: "/",
   },
   {
      id: 2,
      src: discord,
      href: "/",
   },
   {
      id: 3,
      src: twitter,
      href: "/",
   },
   {
      id: 4,
      src: youtube,
      href: "/",
   },
];
