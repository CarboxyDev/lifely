import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/util";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lifely - Life Simulator",
  description: "A text based life online life simulator.",
  authors: [{ name: "CarboxyDev", url: "https://carboxy.tech" }],
  category: "Game",
  keywords: ["life", "simulator", "life simulator", "life game"],
  metadataBase: new URL("https://lifely.carboxy.tech"),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          process.env.DEV == "true" && "debug-screens",
          "bg-dark-950 text-dark-100"
        )}>
        {children}
      </body>
    </html>
  );
}
