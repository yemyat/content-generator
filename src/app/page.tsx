import { HydrateClient } from "~/trpc/server";
import Generator from "./_components/generator";

export default async function Home() {
  return (
    <HydrateClient>
      <Generator />
    </HydrateClient>
  );
}
