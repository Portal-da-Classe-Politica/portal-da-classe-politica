'use client';

import { useRef, useState } from 'react';

export const CarouselTabs = ({
  tabs,
  contents,
  initialTab = 0,
  className = '',
  selectedClassName = '',
  unSelectedClassName = '',
  onTabChange = () => {},
}: {
  tabs: React.ReactNode[];
  contents: React.ReactNode[];
  initialTab?: number;
  className?: string;
  selectedClassName?: string;
  unSelectedClassName?: string;
  onTabChange?: (_tab: number, _previousTab?: number) => void;
}) => {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = (index: any) => {
    setCurrentTab(index);

    if (tabsRef.current[index]) {
      tabsRef.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className={`max-w-[1298px] ${className}`}>
      <div className="flex overflow-x-auto">
        {tabs.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                handleClick(idx);
                onTabChange(idx, currentTab);
              }}
              ref={el => {
                tabsRef.current[idx] = el;
              }}
              className={`${
                currentTab === idx
                  ? `bg-orange text-white text-b1 md:text-4 font-bold rounded-t-[10px] py-4 px-8 ${selectedClassName}`
                  : `text-orange text-b1 md:text-4 py-4 px-8 ${unSelectedClassName}`
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="flex p-4 md:py-10 md:px-7 bg-orange">{contents[currentTab]}</div>
    </div>
  );
};
