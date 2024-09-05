import { Product, Template } from "@prisma/client";
import { create } from "zustand";
import { updatePostMetadata } from "../actions";
import { getProductsFromPostId } from "../actions/posts";
import { getProductsFromSiteId } from "../actions/product";
import { getTemplateFromSiteId } from "../actions/template";
export type TypeSettingsPost = "empty" | "product" | "compare" | "list";
type SettingsPostStore = {
  ref: string | null;
  type: TypeSettingsPost | null;
  setType: (type: TypeSettingsPost, id: string) => void;
  products: Product[];
  selectedProducts: string[];
  getProducts: (siteId: string, id: string) => void;
  addProduct: (product: Product, id: string) => void;
  removeProduct: (product: Product, id: string) => void;
  filterProducts: (search: string) => void;
  loading: boolean;
  templates: Template[];
  getTemplates: (siteId: string) => void;
};

export const useSettingsPostStore = create<SettingsPostStore>((set) => {
  return {
    type: null,
    ref: null,
    setType: (type: TypeSettingsPost, id: string) => {
      set((state) => ({
        ...state,
        type,
      }));
      const formData = new FormData();
      formData.append("template", type);
      updatePostMetadata(formData, id, "template").then((response) => {});
    },
    products: [],
    selectedProducts: [],
    getProducts: (siteId: string, id: string) => {
      getProductsFromPostId(id).then((selectedProducts) =>
        set((state: any) => ({
          ...state,
          selectedProducts: selectedProducts.map((product) => product.id),
        })),
      );
      getProductsFromSiteId(siteId).then((products) =>
        set((state: any) => ({
          ...state,
          products,
        })),
      );
    },
    filterProducts: (search: string) =>
      set((state: any) => ({
        products: state.products.filter(
          (product: any) =>
            product.title &&
            product.title
              ?.toLowerCase()
              .trim()
              .includes(search.toLowerCase().trim()),
        ),
      })),
    addProduct: (product: Product, id: string) => {
      set((state) => ({
        ...state,
        loading: true,
        ref: product.id,
      }));
      const formData = new FormData();
      formData.append("product", product.id);
      updatePostMetadata(formData, id, "product").then((response) => {
        set((state) => ({
          ...state,
          selectedProducts: [...state.selectedProducts, product.id],
          loading: false,
          ref: null,
        }));
      });
    },
    removeProduct: (product: Product, id: string) => {
      set((state) => ({
        ...state,
        loading: true,
        ref: product.id,
      }));
      const formData = new FormData();
      formData.append("remove_product", product.id);
      updatePostMetadata(formData, id, "remove_product").then((response) => {
        set((state) => ({
          ...state,
          selectedProducts: state.selectedProducts.filter(
            (selectedProduct) => product.id !== selectedProduct,
          ),
          loading: false,
          ref: null,
        }));
      });
    },
    loading: false,
    templates: [],
    getTemplates: (siteId: string) => {
      getTemplateFromSiteId(siteId).then((templates) =>
        set((state: any) => ({
          ...state,
          templates,
        })),
      );
    },
  };
});
