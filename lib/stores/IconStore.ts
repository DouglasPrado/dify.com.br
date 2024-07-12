import { create } from "zustand";
import { getIcons } from "../actions";

type IconStore = {
  icons: any;
  getIcons: (filter?: string) => void;
};

export const useIconStore = create<IconStore>((set) => {
  return {
    icons: [],
    getIcons: (filter?: string) =>
      getIcons(filter).then((icons) =>
        set((state: any) => ({
          icons,
        })),
      ),
  };
});
