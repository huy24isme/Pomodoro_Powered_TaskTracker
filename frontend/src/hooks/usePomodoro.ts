import { useState } from 'react';

export function usePomodoro(initialMinutes = 25) {
  const [minutes, setMinutes] = useState(initialMinutes);

  return {
    minutes,
    reset: () => setMinutes(initialMinutes),
    setMinutes,
  };
}
