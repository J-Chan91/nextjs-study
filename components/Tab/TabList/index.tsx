import { cn } from "@/util/cn";
import { useContext } from "react";
import { TabContext } from "../context";

type TabItem = {
  label: string;
  id: "T" | "I";
};

type Props = {
  tabs: Array<TabItem>;
  defaultValue?: string;
};

export default function TabList({ tabs }: Props) {
  const context = useContext(TabContext);

  if (!context) {
    return null;
  }

  const tabClick = (id: string) => {
    context.setSelectTab(id);
  };

  return (
    <div className="w-full bg-white/90">
      <div className="flex items-center gap-1 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className={cn(
              "min-w-[140px] p-1 text-sm text-gray-400 transition",
              tab.id === context.selectTab &&
                "rounded bg-white font-bold text-gray-800",
            )}
            value={tab.id}
            onClick={() => tabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
