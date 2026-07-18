import { Suspense,type ReactNode } from "react";
export default function AdminLayout({children}:{children:ReactNode}){return <Suspense fallback={<main className="grid min-h-screen place-items-center text-slate-500">Loading school workspace…</main>}>{children}</Suspense>}
