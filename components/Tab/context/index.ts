import { Dispatch, SetStateAction, createContext } from "react";

type TabContext = {
  selectTab: string;
  setSelectTab: Dispatch<SetStateAction<string>>;
};

export const TabContext = createContext<TabContext | null>(null);
