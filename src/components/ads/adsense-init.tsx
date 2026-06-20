import Script from "next/script";

export function AdSenseInit() {
  return (
    <Script
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2561562961967046"
    />
  );
}
