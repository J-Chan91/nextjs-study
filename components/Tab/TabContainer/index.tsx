import { useState } from "react";
import { TabContext } from "../context";

type Props = {
  defaultValue: string;
  children: React.ReactNode | React.ReactNode[];
};

export default function TabContainer({ defaultValue, children }: Props) {
  const [selectTab, setSelectTab] = useState<string>(defaultValue);

  return (
    <TabContext.Provider value={{ selectTab, setSelectTab }}>
      {children}
    </TabContext.Provider>
  );
}
