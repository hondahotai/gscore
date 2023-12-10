import { TabsDivider } from "@/components/UI/TabsDivider/TabsDivider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TabsDivider />
      {children}
    </div>
  );
}
