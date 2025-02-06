import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { SidebarTrigger } from "./ui/sidebar";

export function NavBar() {
  return (
    <header className="flex flex-col items-start justify-between gap-3 border-b border-gray-200 bg-background px-4 py-3 md:flex-row md:items-center">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-2">
        <SidebarTrigger />

        <div className="flex w-full items-center space-x-2">
          <h1 className="text-xl text-gray-800">Content Creator</h1>
        </div>
        <div className="flex w-full items-center justify-end space-x-2">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
