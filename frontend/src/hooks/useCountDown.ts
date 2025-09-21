import { useEffect, useState } from "react";

/**
 * Countdown hook
 * @param start - number of seconds to count down from
 * @returns remaining seconds
 */
export const useCountdown = (start: number) => {
  const [time, setTime] = useState(start);

  useEffect(() => {
    if (time <= 0) return;

    const id = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, [time]);

  return time;
};
