export function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className={`gap-4 top-0 left-0 right-0 bg-white dark:bg-black border-b border-black/[.1] dark:border-white/[.1] px-4 h-14 flex items-center shrink-0`}
    >
      {children}
    </nav>
  );
}
