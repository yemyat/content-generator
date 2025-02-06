import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "New Post | Dashboard",
  description: "Create a new social media post with AI assistance",
};

export default function NewPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
