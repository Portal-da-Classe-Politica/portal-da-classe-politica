import { useRef, useState } from 'react';
// import { Icon } from './base';

export const CarouselTabs = ({
  tabs,
  contents,
  onTabChange = () => {},
}: {
  tabs: React.ReactNode[];
  contents: React.ReactNode[];
  onTabChange?: (_tab: number, _previousTab?: number) => void;
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const tabsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = (index: any) => {
    setCurrentTab(index);

    if (tabsRef.current[index]) {
      tabsRef.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  // const onNext = () => {
  //   const next = currentTab + 1;
  //   const setTo = loop && next === tabs.length ? 0 : Math.min(tabs.length - 1, next);

  //   setCurrentTab(setTo);
  //   onTabChange(setTo, currentTab);
  // };

  // const onPrevious = () => {
  //   const previous = currentTab - 1;
  //   const setTo = loop && previous < 0 ? tabs.length - 1 : Math.max(0, previous);

  //   setCurrentTab(setTo);
  //   onTabChange(setTo, currentTab);
  // };

  return (
    <div className="max-w-[1298px]">
      {/* <div className="carousel-container relative overflow-hidden w-full md:hidden">
        <div
          className="carousel flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentTab * 100}%)` }}
        >
          {tabs.map((item, index) => (
            <div
              key={index}
              className="carousel-item px-12 py-5 text-lg bg-orangeLight1 rounded-t-lg flex-shrink-0 w-full font-bold"
            >
              {item}
            </div>
          ))}
        </div>
        <button
          onClick={onPrevious}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-orange p-2"
        >
          <Icon type="ArrowLeftShort" size="2x" />
        </button>
        <button
          onClick={onNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-orange p-2"
        >
          <Icon type="ArrowRightShort" size="2x" />
        </button>

        <div className="flex gap-1 absolute top-[90%] -translate-y-1/2 left-[50%] translate-x-1/2">
          {tabs.map((_, i) => {
            return (
              <div
                key={i}
                className={`h-[10px] w-[10px] transition-all ${
                  currentTab === i ? 'bg-grayLight3' : 'bg-grayLight2'
                }  rounded-full`}
              />
            );
          })}
        </div>
      </div> */}
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
                  ? 'bg-orange text-white text-b1 md:text-[18px] font-bold rounded-t-[10px] py-4 px-8'
                  : 'text-orange text-b1 md:text-[18px]  py-4 px-8'
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
