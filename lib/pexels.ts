import { createClient } from "pexels";
const client = createClient(process.env.PEXELS_API as string);

export const searchPexelsImage = async (query: string) => {
  try {
    return await client.photos.search({
      query,
      per_page: 12,
    });
  } catch (error) {
    console.log(error);
  }
};
