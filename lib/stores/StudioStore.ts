import { Post } from "@prisma/client";
import { create } from "zustand";
import { getCollectionsFromSiteId } from "../actions/collections";
import { getMediasFromSiteId } from "../actions/medias";
import {
  getPostsWithoutIdFromSiteId,
  getPostWithCollectionsAndRelatedPostsId,
} from "../actions/posts";

type StudioStore = {
  media: any;
  relatedPosts: any;
  collections: any;
  post: any;
  getPost: (id: string) => void;
  getCollections: (siteId: string) => void;
  filterCollections: (search: string) => void;
  filterRelatedPosts: (search: string) => void;
  getRelatedPosts: (id: string, siteId: string) => void;
  getMedia: (siteId: string) => void;
  updatePost: (post: any) => void;
};

export const useStudioStore = create<StudioStore>((set) => {
  return {
    media: null,
    getMedia: (siteId: string) =>
      getMediasFromSiteId(siteId).then((media: any) => {
        set((state: any) => ({
          media,
        }));
      }),
    collections: null,
    getCollections: (siteId: string) =>
      getCollectionsFromSiteId(siteId).then((collections: any) => {
        set((state: any) => ({
          collections,
        }));
      }),
    filterCollections: (search: string) =>
      set((state: any) => ({
        collections: state.collections.filter((collection: any) =>
          collection.name.toLowerCase().includes(search.toLowerCase()),
        ),
      })),
    relatedPosts: null,
    getRelatedPosts: (id: string, siteId: string) =>
      getPostsWithoutIdFromSiteId(id, siteId).then((relatedPosts: any) => {
        set((state: any) => ({
          relatedPosts,
        }));
      }),
    filterRelatedPosts: (search: string) =>
      set((state: any) => ({
        relatedPosts: state.relatedPosts.filter((relatedPost: any) =>
          relatedPost.title.toLowerCase().includes(search.toLowerCase()),
        ),
      })),
    tags: null,
    getTags: () => {},
    post: null,
    getPost: (id: string) => {
      getPostWithCollectionsAndRelatedPostsId(id).then((post: any) => {
        set((state: any) => ({
          post,
        }));
      });
    },
    updatePost: (post: Post) =>
      set((state: any) => ({
        post,
      })),
  };
});
