import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Consultant | Expert in Design & Development",
  description: "Computer Science Engineer with Master's degrees in Frontend Design. Specializing in modern web development, UI/UX design, and technical consulting services.",
  keywords: ["frontend consultant", "web development", "UI/UX design", "React", "TypeScript", "Next.js", "technical consulting"],
  authors: [{ name: "Frontend Consultant" }],
  openGraph: {
    title: "Frontend Consultant | Expert in Design & Development",
    description: "Computer Science Engineer with Master's degrees in Frontend Design. Specializing in modern web development and technical consulting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
