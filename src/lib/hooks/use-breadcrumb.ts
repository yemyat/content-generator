import { usePathname } from "next/navigation";

interface Breadcrumb {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

const defaultLabels: Record<string, string> = {
  dashboard: "Dashboard",
  posts: "Posts",
  new: "New Post",
  campaigns: "Campaigns",
  brand: "Brand",
};

export function useBreadcrumb(): Breadcrumb[] {
  const pathname = usePathname();

  if (!pathname) return [];

  // Remove the first slash and split into segments
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumbs array
  return segments.map((segment, index) => {
    // Build the href by joining all segments up to current
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    // Get the label from our mapping, or capitalize the segment if not found
    const label =
      defaultLabels[segment] ??
      segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      label,
      href,
      isCurrentPage: index === segments.length - 1,
    };
  });
}
