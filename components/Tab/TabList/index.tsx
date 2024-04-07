type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export default function TabList({ children }: Props) {
  return (
    <div className="w-full bg-white/90">
      <div className="flex items-center gap-1 p-1">{children}</div>
    </div>
  );
}
