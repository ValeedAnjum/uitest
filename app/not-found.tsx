import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ height: "calc(100vh - 98px)" }}>
      <h2>Not Found</h2>
      <Link href="/asset">Return Asset</Link>
    </div>
  );
}
