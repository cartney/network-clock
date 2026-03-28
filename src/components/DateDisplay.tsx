import React, { useState, useEffect } from 'react';

interface DateDisplayProps {
  fontSize?: number;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ fontSize = 32 }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekDay = weekDays[date.getDay()];
    
    return `${year}年${month}月${day}日 ${weekDay}`;
  };

  return (
    <div className="date-display" style={{ fontSize: `${fontSize}px` }}>
      {formatDate(date)}
    </div>
  );
};
