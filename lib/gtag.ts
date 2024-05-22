export const pageview = async (url: string) => {
  if (typeof window !== "undefined") {
    const getWindow: any = window;
    getWindow.gtag("config", "GA_TRACKING_ID", {
      page_path: url,
    });
  }
};

export const event = ({ action }: any) => {
  if (typeof window !== "undefined") {
    const getWindow: any = window;
    getWindow.gtag("event", action);
  }
};
