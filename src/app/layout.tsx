import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { cookies } from "next/headers";
import { I18nProvider } from "@/lib/i18n/I18nContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claw3D",
  description: "Focused operator studio for the OpenClaw gateway.",
};

const display = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  fallback: ["PingFang SC", "Microsoft YaHei", "sans-serif"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  fallback: ["PingFang SC", "Microsoft YaHei", "sans-serif"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  fallback: ["PingFang SC", "Microsoft YaHei", "monospace"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  let initialLocale = "en";
  if (localeCookie === "zh" || localeCookie === "en") {
    initialLocale = localeCookie;
  } else {
    const headersList = await import("next/headers").then(m => m.headers());
    const acceptLang = headersList.get("accept-language");
    if (acceptLang?.toLowerCase().includes("zh")) {
      initialLocale = "zh";
    }
  }

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t?t==='dark':m;document.documentElement.classList.toggle('dark',d);var c=document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);var l=c?c[1]:(localStorage.getItem('i18n_locale')||(navigator.language.toLowerCase().includes('zh')?'zh':'en'));if(l==='zh'||l==='en'){document.documentElement.lang=l;}}catch(e){}})();",
          }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
        <I18nProvider initialLocale={initialLocale as "en" | "zh"}>
          <main className="h-screen w-screen overflow-hidden bg-background">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
