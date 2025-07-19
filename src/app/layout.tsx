
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modern Portfolio - Bento Box Design",
  description: "A stunning portfolio with bento box grid layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}



// function CustomColorDemo() {
//   const tabs = [
//     { title: "Profile", icon: User },
//     { title: "Messages", icon: Mail },
//     { type: "separator" as const },
//     { title: "Documents", icon: FileText },
//     { title: "Privacy", icon: Lock },
//   ]

//   return (
//     <div className="flex flex-col gap-4">
//       <ExpandedTabs
//         tabs={tabs}
//         activeColor="text-blue-500"
//         className="border-blue-200 dark:border-blue-800"
//       />
//     </div>
//   )
// }
