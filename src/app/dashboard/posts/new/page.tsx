import { PlateEditor } from "~/components/editor/plate-editor";

export default function DashboardPage() {
  return (
    <div className="h-full w-full" data-registry="plate">
      <PlateEditor />
    </div>
  );
}
