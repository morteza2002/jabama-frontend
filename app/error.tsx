"use client";

import { useEffect } from "react";
import "./error.css"
import Link from "next/link";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="error-page">
      <div className="error-content">
        <h1>مشکلی پیش آمده</h1>

        <p>
          متأسفانه در پردازش درخواست شما مشکلی به وجود آمد.
          لطفاً دوباره تلاش کنید.
        </p>

        <button onClick={() => reset()}>
          تلاش دوباره
        </button>

           <Link href="/">بازگشت به صفحه اصلی</Link>
      </div>
    </main>
  );
}