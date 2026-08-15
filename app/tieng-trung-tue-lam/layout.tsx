import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function TiengTrungTueLamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${beVietnamPro.variable} font-sans`}>
      {children}
    </div>
  );
}
