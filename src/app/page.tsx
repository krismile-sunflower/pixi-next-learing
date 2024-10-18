import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-5 flex-col text-center sm:flex-row">
      <Link href="/about">To About 页面</Link>
      <Link href="/container">To Container 页面</Link>
      <Link href="/tinting">To Tinting 页面</Link>
      <Link href="/meshplane">To MeshPlane 页面</Link>
      <Link href="/star">To Star 页面</Link>
    </div>
  );
}
