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

export const searchAnalyticsForGoogle = async (site: string) => {
  try {
    return await webmastertools.searchanalytics.query({});
  } catch (error) {
    console.log(error);
  }
};

export const addURLIndexGoogle = async (url: string) => {
  const SCOPES = ["https://www.googleapis.com/auth/indexing"];
  try {
    const jwtClient = new google.auth.JWT({
      email: process.env.GOOGLEAPI_CLIENT_EMAIL,
      key: process.env.GOOGLEAPI_PRIVATE_KEY,
      scopes: SCOPES,
    });
    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.error("Error authorizing client:", err);
        return;
      }
      console.log("Successfully authorized.");
    });

    const endpoint =
      "https://indexing.googleapis.com/v3/urlNotifications:publish";
    const body = {
      url: url,
      type: "URL_UPDATED",
    };

    const res = await jwtClient.request({
      url: endpoint,
      method: "POST",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data, "resultado");
    return res.data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
