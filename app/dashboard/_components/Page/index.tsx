"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { TabContainer, TabContents, TabItem, TabList } from "@/components/Tab";
import TableSection from "../TableSection";
import TextareaSection from "../TextareaSection";

export default function Page() {
  const data = useSelector((state: RootState) => state.user);

  return (
    <div className="flex w-1/2 flex-col gap-4">
      <div className="rounded bg-white px-4 py-2">
        <p>반가워요! {data.name.firstname} 👋</p>
      </div>

      <TabContainer defaultValue="T">
        <TabList>
          <TabItem value="T">테이블</TabItem>
          <TabItem value="I">입력</TabItem>
        </TabList>

        <TabContents value="T">
          <TableSection />
        </TabContents>

        <TabContents value="I">
          <TextareaSection />
        </TabContents>
      </TabContainer>
    </div>
  );
}
