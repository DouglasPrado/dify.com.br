import { Post } from "@prisma/client";
import { create } from "zustand";
import { getCollectionsFromSiteId } from "../actions/collections";
import { getMediasFromSiteId } from "../actions/medias";
import {
  getPostsWithoutIdFromSiteId,
  getPostWithCollectionsAndRelatedPostsId,
} from "../actions/posts";
import { getTagsFromSiteId } from "../actions/tags";

type StudioStore = {
  media: any;
  tags: any;
  relatedPosts: any;
  collections: any;
  post: any;
  getPost: (id: string) => void;
  getTags: (id: string) => void;
  filterTags: (search: string) => void;
  getCollections: (siteId: string) => void;
  filterCollections: (search: string) => void;
  filterRelatedPosts: (search: string) => void;
  getRelatedPosts: (id: string, siteId: string) => void;
  getMedia: (siteId: string) => void;
  updatePost: (post: any) => void;
  resetPost: () => void;
  editor: any;
  setEditor: (editor: any) => void;
};

export const useStudioStore = create<StudioStore>((set) => {
  return {
    media: null,
    getMedia: (siteId: string) =>
      siteId &&
      getMediasFromSiteId(siteId).then((media: any) => {
        set((state: any) => ({
          media,
        }));
      }),
    collections: null,
    getCollections: (siteId: string) =>
      siteId &&
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
      siteId &&
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
    getTags: (siteId: string) =>
      getTagsFromSiteId(siteId).then((tags) =>
        set((state) => ({
          tags,
        })),
      ),
    filterTags: (search: string) =>
      set((state: any) => ({
        tags: state.tags.filter((tag: any) =>
          tag.name.toLowerCase().includes(search.toLowerCase()),
        ),
      })),
    post: null,
    getPost: (id: string) => {
      getPostWithCollectionsAndRelatedPostsId(id).then((post: any) => {
        set((state: any) => ({
          post,
        }));
      });
    },
    resetPost: () =>
      set((state: any) => ({
        post: null,
        editor: null,
      })),
    updatePost: (post: Post) =>
      set((state: any) => ({
        post,
      })),
    editor: null,
    setEditor: (editor: any) =>
      set((state: any) => ({
        editor,
      })),
  };
});
