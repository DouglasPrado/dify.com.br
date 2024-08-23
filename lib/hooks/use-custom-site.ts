import { create } from "zustand";

type CustomSite = {
  colorBackground: string | null;
  colorText: string | null;
  colorPrimary: string | null;
  colorButton: string | null;
  colorTitleText: string | null;
  updateColor?: (color: string, key: string) => any;
  defaultColor?: (colors: any) => any;
};

export const useCustomSite = create<CustomSite>()((set) => ({
  colorBackground: null,
  colorText: null,
  colorPrimary: null,
  colorButton: null,
  colorTitleText: null,
  defaultColor: (colors: any) =>
    set(() => ({
      ...colors,
    })),
  updateColor: (newColor: string, key: string) =>
    set((state: any) => ({
      ...state,
      [key]: newColor,
    })),
}));
