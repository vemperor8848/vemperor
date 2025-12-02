import { Navbar } from "@/components";
import "@/styles/globals.css";
import type { Metadata } from "next";
import Provider from "@blog/components/provider";
export const metadata: Metadata = {
	title: "TheFlow Party",
	description: "Flow Party Website Clone By Devwithzain",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<Navbar />
					{children}
				</Provider>
			</body>
		</html>
	);
}
