import { create } from "zustand";
import {
  getSiteFromClusterId,
  getSiteFromCollectionId,
  getSiteFromPageId,
  getSiteFromPostId,
  getSiteFromProductId,
  getSiteIdData,
} from "../actions";
import { getSiteFromCategoryId } from "../actions/category";
import { getSiteFromLaunchId } from "../actions/launch";
import { getSiteFromLinkId } from "../actions/links";
import { getSiteFromQueueId } from "../actions/queues";
import { getSiteFromTemplateId } from "../actions/template";

type NavStore = {
  site: any;
  siteId: string | null;
  getSiteId: (segments: any, id: any, siteId: any) => void;
};

export const useSiteStore = create<NavStore>((set, state) => {
  return {
    site: null,
    siteId: null,
    getSiteId: (segments: any, id: string, siteId: string) => {
      const getState = state();
      if (segments.length === 0 || segments[0] === "sites") {
        if (getState.site || getState.siteId) {
          set((state: any) => ({
            site: null,
            siteId: null,
          }));
        }
      }
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
        if (segments[0] === "category" && id) {
          getSiteFromCategoryId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (segments[0] === "template" && id) {
          getSiteFromTemplateId(id).then((id: any) => {
            set((state: any) => ({
              siteId: id,
            }));
          });
        }
        if (id && segments[0] === "site" && getState?.site?.id !== siteId) {
          getSiteIdData(id).then((res: any) => {
            set((state: any) => ({
              site: res,
              siteId: id,
            }));
          });
        }
      }
    },
  };
});
