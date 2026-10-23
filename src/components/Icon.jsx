import React from "react";

export default function Icon({ name, size = 20, fill = "none" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    library: <><path d="M4 4v16M9 4v16M14 5l4-1 3 15-4 1z" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    heart: <path d="M20.8 8.7c0 4.5-8.8 10-8.8 10s-8.8-5.5-8.8-10A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />,
    play: <path d="m8 5 12 7-12 7z" />,
    pause: <><path d="M8 5h3v14H8zM15 5h3v14h-3z" /></>,
    next: <><path d="m6 5 10 7-10 7zM19 5v14" /></>,
    previous: <><path d="m18 5-10 7 10 7zM5 5v14" /></>,
    volume: <><path d="M4 10v4h4l5 4V6l-5 4z" /><path d="M17 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12" /></>,
    shuffle: <path d="m18 14 3 3-3 3M18 4l3 3-3 3M3 7h2c5 0 7 10 12 10h4M3 17h2c2.3 0 3.8-2.2 5.2-4.7M14 7h3" />,
    repeat: <path d="m17 2 3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}
