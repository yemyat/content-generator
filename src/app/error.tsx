"use client";

import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <Image
          src="/not-found.jpg"
          alt="Error"
          width={300}
          height={300}
          className="rounded-lg"
        />
        <h2 className="my-4 text-2xl font-semibold">ဝမ်းနည်းပါတယ်ရှင်</h2>
        <p className="mb-4 text-gray-600">
          အမှားတစ်ခုဖြစ်သွားပါတယ်။ ပြန်လည်ကြိုးစားကြည့်ပါ။
        </p>
        <Button onClick={reset} className="rounded-full">
          ပြန်လည်ကြိုးစားကြည့်ရန်
        </Button>
      </div>
    </div>
  );
}
