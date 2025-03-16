"use client"

import { cn } from '@/libs/utils';
import { useState } from 'react'

const TitleText = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <span
      className="text-2xl font-bold text-gray-800"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      TU<span className={cn(
        isHovering ? 'text-[#f687b3]' : 'inherit',
        'transition-colors duration-300'
      )}>CMC</span> APP
    </span>
  );
}

export default TitleText;
