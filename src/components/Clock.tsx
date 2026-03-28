import React, { useState, useEffect } from 'react';

interface ClockProps {
  fontSize?: number;
}

export const Clock: React.FC<ClockProps> = ({ fontSize = 120 }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="clock" style={{ fontSize: `${fontSize}px` }}>
      {formatTime(time)}
    </div>
  );
};
