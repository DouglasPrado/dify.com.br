import Script from "next/script";

const GoogleAnalytics = ({
  gaTrackingId,
  gtag,
}: {
  gaTrackingId: string;
  gtag?: string;
}) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        defer
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaTrackingId}', {
              page_path: window.location.pathname,
              });
              ${gtag}
            `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
