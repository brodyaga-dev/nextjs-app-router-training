import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function PathnameBar() {
  const pathname = usePathname();
  const currentParts = useMemo(
    () => pathname.replace("/examples", "").split("/"),
    [pathname],
  );
  const [prevParts, setPrevParts] = useState<string[]>(currentParts);
  const [diffIndex, setDiffIndex] = useState(-1);

  useEffect(() => {
    const diffIndex = currentParts.findIndex(
      (part, index) => part !== prevParts[index],
    );

    setPrevParts(currentParts);

    if (diffIndex === -1) {
      return;
    }
    setDiffIndex(diffIndex);
  }, [currentParts, prevParts]);

  return (
    <div className="py-1 px-4 bg-gray-700 bg-opacity-30 border-b border-b-gray-600 text-sm text-gray-400 flex gap-1">
      {currentParts.map((part, i) => (
        <div key={`${part}_${i}`} className="flex gap-1">
          <span
            className={[
              /* don't include root path */ diffIndex > 0 && i >= diffIndex
                ? "text-gray-300 animate-[path-highlight_1s_ease-in-out_1]"
                : "",
            ].join("")}
          >
            {part}
          </span>
          <span>/</span>
        </div>
      ))}
    </div>
  );
}
