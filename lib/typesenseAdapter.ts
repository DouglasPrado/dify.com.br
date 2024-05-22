import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

let TYPESENSE_SERVER_CONFIG: any = {
  apiKey: process.env.TYPESENSE_SEARCH_ONLY_API_KEY,
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: process.env.TYPESENSE_PORT,
      protocol: process.env.TYPESENSE_PROTOCOL,
    },
  ],
  connectionTimeoutSeconds: 1,
  numRetries: 8,
};
export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    query_by: "title,description",
    use_cache: true,
    num_typos: 3,
    typo_tokens_threshold: 1,
    per_page: 48,
  },
});

export const searchClient = typesenseAdapter.searchClient;
