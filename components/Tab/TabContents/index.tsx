import { Fragment, useContext } from "react";
import { TabContext } from "../context";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  value: string;
};

export default function TabContents({ value, children }: Props) {
  const context = useContext(TabContext);

  if (!context) {
    return null;
  }

  return (
    <Fragment>
      {value === context.selectTab && <Fragment>{children}</Fragment>}
    </Fragment>
  );
}
