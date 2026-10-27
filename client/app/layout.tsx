import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/providers/query-provider";
export const metadata: Metadata = {
  title: "chaiLLM — Your learning workspace",
  description: "Collect sources, ask questions, and create study tools with chaiLLM.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
              {children}
          </QueryProvider>         
        </ThemeProvider>
      </body>
    </html>
  );
}
