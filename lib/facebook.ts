import {
  AdsPixel,
  Content,
  CustomData,
  DeliveryCategory,
  EventRequest,
  FacebookAdsApi,
  ServerEvent,
  UserData,
} from "facebook-nodejs-business-sdk";

export const eventPageView = (access_token: string, pixel_id: string) => {
  if (access_token === undefined || pixel_id === undefined) {
    throw new Error(
      `"Missing required test config. Got pixel_id: '${pixel_id}', access_token: '${access_token}'"`,
    );
  }
  const api = FacebookAdsApi.init(access_token);
  api.setDebug(true);
  const date: any = new Date();
  let current_timestamp = Math.floor(date / 1000);

  let fields: any, params: any;
  fields = [];
  params = {
    data: [
      {
        event_name: "PageView",
        event_time: current_timestamp,
      },
    ],
  };

  const events = new AdsPixel(pixel_id).createEvent(fields, params);

  Promise.all([events]).then(
    (response) => {
      console.log("Execute 2 Requests OK. Response: ", response);
    },
    (err) => {
      console.log("Error: ", err);
    },
  );
};

export const eventServer = (
  access_token: string,
  pixel_id: string,
  eventName: string,
  name: string,
  email: string,
  phoneNumber: string,
  url: string,
  productId: string,
  price: number,
  request: any,
) => {
  if (access_token === undefined || pixel_id === undefined) {
    throw new Error(
      `"Missing required test config. Got pixel_id: '${pixel_id}', access_token: '${access_token}'"`,
    );
  }
  const api = FacebookAdsApi.init(access_token);
  api.setDebug(true);
  const date: any = new Date();
  let current_timestamp = Math.floor(date / 1000);

  const userData = new UserData()
    .setFirstName(name)
    .setEmail(email)
    .setPhone(phoneNumber)
    .setClientIpAddress(request?.connection?.remoteAddress)
    .setClientUserAgent(request.headers["user-agent"]);

  const content = new Content()
    .setId(productId)
    .setQuantity(1)
    .setDeliveryCategory(DeliveryCategory.IN_STORE);

  const customData = new CustomData()
    .setContents([content])
    .setCurrency("BRL")
    .setValue(price);

  const serverEvent = new ServerEvent()
    .setEventName(eventName)
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setCustomData(customData)
    .setEventSourceUrl(url)
    .setActionSource("website");

  const eventRequest = new EventRequest(access_token, pixel_id).setEvents([
    serverEvent,
  ]);

  Promise.all([eventRequest.execute()]).then(
    (response) => {
      console.log("Execute Requests OK. Response: ", response);
    },
    (err) => {
      console.log("Error: ", err);
    },
  );
};
