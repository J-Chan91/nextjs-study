import { useContext } from "react";

import { cn } from "@/util/cn";
import { TabContext } from "../context";

type Props = {
  value: string;
  children: React.ReactNode | React.ReactNode[];
};

export default function TabItem({ value, children }: Props) {
  const context = useContext(TabContext);

  if (!context) {
    return null;
  }

  const tabClick = (id: string) => {
    context.setSelectTab(id);
  };

  return (
    <button
      role="tab"
      className={cn(
        "min-w-[140px] p-1 text-sm text-gray-400 transition",
        value === context.selectTab &&
          "rounded bg-white font-bold text-gray-800",
      )}
      value={value}
      onClick={() => tabClick(value)}
    >
      {children}
    </button>
  );
}
