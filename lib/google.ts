const { auth } = require("google-auth-library");
import { google } from "googleapis";
const customsearch = google.customsearch("v1");
const webmastertools = google.webmasters("v3");
export const searchGoogleImage = async (search?: string) => {
  try {
    return await customsearch.cse.list({
      auth: process.env.GAPI_API_KEY,
      cx: process.env.GAPI_SEARCH_ENGINE_ID,
      q: search,
      searchType: "image",
      imgSize: "huge",
      imgType: "photo",
      num: 9,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendSitemapForGoogle = async (site: string) => {
  try {
    return await webmastertools.sitemaps.submit({});
  } catch (error) {
    console.log(error);
  }
};

export const addSiteForGoogle = async (site: string) => {
  try {
    const SCOPES = ["https://www.googleapis.com/auth/webmasters"];

    const authClient = await auth.getClient({
      scopes: SCOPES,
    });

    const webmasters = google.webmasters({
      version: "v3",
      auth: "AIzaSyDY2PTCUkAej4sbEC770ODGSu2-WZ9ETnk",
    });
    console.log(webmasters);

    // Exemplo de chamada à API
    return await webmasters.sites.list();
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const searchAnalyticsForGoogle = async (site: string) => {
  try {
    return await webmastertools.searchanalytics.query({});
  } catch (error) {
    console.log(error);
  }
};
