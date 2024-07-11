import { create } from "zustand";
import {
  getSiteFromClusterId,
  getSiteFromCollectionId,
  getSiteFromPageId,
  getSiteFromPostId,
  getSiteFromProductId,
} from "../actions";
import { getSiteFromLaunchId } from "../actions/launch";
import { getSiteFromLinkId } from "../actions/links";
import { getSiteFromQueueId } from "../actions/queues";

type NavStore = {
  siteId: string | null;
  getSiteId: (segments: any, id: any, siteId: any) => void;
};

export const useNavStore = create<NavStore>((set) => {
  return {
    siteId: null,
    getSiteId: (segments: any, id: string, siteId: string) => {
      if (!siteId && siteId !== id) {
        if (segments[0] === "post" && id) {
          getSiteFromPostId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "planning" && id) {
          getSiteFromQueueId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "launch" && id) {
          getSiteFromLaunchId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "page" && id) {
          getSiteFromPageId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }

        if (segments[0] === "product" && id) {
          getSiteFromProductId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "clusters" && id) {
          getSiteFromClusterId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "social" && id) {
          getSiteFromClusterId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "link" && id) {
          getSiteFromLinkId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "collection" && id) {
          getSiteFromCollectionId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
      }
    },
  };
});
