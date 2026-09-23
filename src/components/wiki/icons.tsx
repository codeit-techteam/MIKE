import type { ReactNode } from "react";
import type { WikiIconName } from "./data";

const stroke = "currentColor";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function WikiIcon({ name }: { name: WikiIconName }) {
  switch (name) {
    case "person":
    case "personAlt":
      return (
        <Svg>
          <circle cx="12" cy="8" r="3.2" stroke={stroke} strokeWidth="1.5" />
          <path
            d="M5.5 19.2c1.4-3 3.7-4.5 6.5-4.5s5.1 1.5 6.5 4.5"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </Svg>
      );
    case "restaurant":
      return (
        <Svg>
          <path
            d="M8 4v7.5M8 11.5H6.2A1.2 1.2 0 0 1 5 10.3V7.8M8 11.5v8.5M16 4v16M16 4c2.2 0 3.5 1.4 3.5 3.5S18.2 11 16 11"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "heart":
      return (
        <Svg>
          <path
            d="M12 19.2s-6.5-4.1-6.5-9A3.7 3.7 0 0 1 12 7.2a3.7 3.7 0 0 1 6.5 3c0 4.9-6.5 9-6.5 9Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "home":
      return (
        <Svg>
          <path
            d="M4.5 11.2 12 5l7.5 6.2M7 10.5V19h10v-8.5"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "car":
      return (
        <Svg>
          <path
            d="M4.5 14.5h15M6.2 14.5l1.4-4.2A2 2 0 0 1 9.5 9h5a2 2 0 0 1 1.9 1.3l1.4 4.2M6.5 17.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm11 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "check":
      return (
        <Svg>
          <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke={stroke} strokeWidth="1.5" />
          <path
            d="m8.5 12.2 2.4 2.4 4.6-4.9"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    default:
      return null;
  }
}

export function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M9 6.5 14.5 12 9 17.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
