import Link from "next/link";
import "./error.css"
export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <img src="/images/404.png" alt="" />

        <Link href="/">بازگشت به صفحه اصلی</Link>
      </div>
    </main>
  );
}
