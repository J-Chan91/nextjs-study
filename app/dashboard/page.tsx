"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import TableSection from "./_components/TableSection";
import TextareaSection from "./_components/TextareaSection";
import { TabContainer, TabContents, TabList } from "@/components/Tab";

export default function Dashboard() {
  const data = useSelector((state: RootState) => state.user);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-black">
      <div className="flex w-1/2 flex-col gap-4">
        <div className="rounded bg-white px-4 py-2">
          <p>반가워요! {data.name.firstname} 👋</p>
        </div>

        <TabContainer defaultValue="T">
          <TabList
            tabs={[
              { label: "테이블", id: "T" },
              { label: "입력", id: "I" },
            ]}
          />

          <TabContents value="T">
            <TableSection />
          </TabContents>

          <TabContents value="I">
            <TextareaSection />
          </TabContents>
        </TabContainer>
      </div>
    </main>
  );
}
