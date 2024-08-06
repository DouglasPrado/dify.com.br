"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Use `window.gtag` if you initialized Google Analytics as this example:
    // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
    window.gtag("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ), // values must be integers
      event_label: metric.id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  });
  return <></>;
}
