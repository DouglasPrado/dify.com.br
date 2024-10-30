import { create } from "zustand";
import {
  deleteKnowledgeItem,
  generateKnowledgeItemText,
  generateKnowledgeItemURL,
  generateKnowledgeItemYoutube,
} from "../actions/knowledge-item";

export type TypeKnowledge = "text" | "youtube" | "url" | "pdf" | "sitemap";

type KnowledgeStore = {
  loadKnowledges: (knowledges: any) => void;
  type: TypeKnowledge;
  setType: (type: TypeKnowledge) => void;
  knowledges: any[];
  addKnowledge: (
    knowledge: FormData,
    id: string,
    type: "post" | "product" | "knowledge",
  ) => void;
  removeKnowledge: (knowledge: any) => void;
  loading: boolean;
};

export const useKnowledgeStore = create<KnowledgeStore>((set, state) => {
  return {
    type: "youtube",
    setType: (type: TypeKnowledge) =>
      set((state) => ({
        ...state,
        type,
      })),
    knowledges: [],
    loadKnowledges: (knowledges) => {
      set((state) => ({
        ...state,
        knowledges,
      }));
    },
    addKnowledge: (
      knowledge: FormData,
      id: string,
      type: "post" | "product" | "knowledge",
    ) => {
      set((state) => ({
        loading: true,
      }));
      switch (state().type) {
        case "youtube":
          generateKnowledgeItemYoutube(knowledge, id, type).then((resp) => {
            set((state) => ({
              ...state,
              knowledges: [...state.knowledges, resp],
              loading: false,
            }));
          });
          break;
        case "text":
          generateKnowledgeItemText(knowledge, id, type).then((resp) => {
            set((state) => ({
              ...state,
              knowledges: [...state.knowledges, resp],
              loading: false,
            }));
          });
          break;
        case "url":
          generateKnowledgeItemURL(knowledge, id, type).then((resp) => {
            set((state) => ({
              ...state,
              knowledges: [...state.knowledges, resp],
              loading: false,
            }));
          });
          break;
        default:
          break;
      }
    },
    removeKnowledge: (removeKnowledge: any) => {
      set((state) => ({
        loading: true,
      }));
      deleteKnowledgeItem(null, removeKnowledge.id, null).then((response) => {
        set((state) => ({
          ...state,
          knowledges: state.knowledges.filter(
            (knowledge) => knowledge.id !== removeKnowledge.id,
          ),
          loading: false,
        }));
      });
    },
    loading: false,
  };
});
