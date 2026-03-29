import { useState } from "react";

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-4">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">{tabs[active].content}</div>
    </div>
  );
}