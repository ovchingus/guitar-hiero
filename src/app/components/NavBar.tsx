import Link from "next/link";
import { HEADER_HEIGHT_UNITS } from "../lib/constant";

export default function NavBar({children}: {children: React.ReactNode}) {
  return (
<nav className={`gap-4 fixed top-0 left-0 right-0 bg-white dark:bg-black border-b border-black/[.1] dark:border-white/[.1] px-4 h-${HEADER_HEIGHT_UNITS} flex items-center`}>
          {children}
        </nav>
  )
}