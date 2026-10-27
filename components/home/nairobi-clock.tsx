"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Nairobi",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const NairobiClock = () => {
  // Empty until mounted so the server and client markup match.
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className="site-clock" suppressHydrationWarning>
      {time || "--:--:--"}
    </time>
  );
};
