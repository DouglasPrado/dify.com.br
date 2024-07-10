import { Post } from "@prisma/client";
import { create } from "zustand";
import { getPostWithCollectionsAndRelatedPostsId } from "../actions/posts";

type StudioStore = {
  post: any;
  getPost: (id: string) => void;
  updatePost: (post: any) => void;
};

export const useStudioStore = create<StudioStore>((set) => {
  return {
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
