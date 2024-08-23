import { create } from "zustand";
import {
  deleteReference,
  generateReferenceText,
  generateReferenceURL,
  generateReferenceYoutube,
} from "../actions/reference";

export type TypeKnowledge = "text" | "youtube" | "url" | "pdf" | "sitemap";

type KnowledgeStore = {
  loadKnowledges: (knowledges: any) => void;
  type: TypeKnowledge;
  setType: (type: TypeKnowledge) => void;
  knowledges: any[];
  addKnowledge: (knowledge: FormData, id: string) => void;
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
    addKnowledge: (knowledge: FormData, id: string) => {
      set((state) => ({
        loading: true,
      }));
      switch (state().type) {
        case "youtube":
          generateReferenceYoutube(knowledge, id).then((resp) => {
            set((state) => ({
              ...state,
              knowledges: [...state.knowledges, resp],
              loading: false,
            }));
          });
          break;
        case "text":
          generateReferenceText(knowledge).then((resp) => {
            set((state) => ({
              ...state,
              knowledges: [...state.knowledges, resp],
              loading: false,
            }));
          });
          break;
        case "url":
          generateReferenceURL(knowledge, id).then((resp) => {
            set((state) => ({
              ...state,
              knowledges: [...state.knowledges, resp],
              loading: false,
            }));
          });
          break;
        case "pdf":
          generateReferenceYoutube(knowledge, id).then((resp) => {
            set((state) => ({
              ...state,
              knowledges: [...state.knowledges, resp],
              loading: false,
            }));
          });
          break;
        case "sitemap":
          generateReferenceYoutube(knowledge, id).then((resp) => {
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
      deleteReference(null, removeKnowledge.id, null).then((response) => {
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
