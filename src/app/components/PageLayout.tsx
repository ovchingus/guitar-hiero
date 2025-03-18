import { HEADER_HEIGHT_UNITS } from "../lib/constant";

export default function PageLayout({children}: {children: React.ReactNode}) {
  return (
    <div className={`overflow-hidden p-4 mt-${HEADER_HEIGHT_UNITS} h-[calc(100vh---spacing(${HEADER_HEIGHT_UNITS}))]`}>
      {children}
    </div>
  )
}