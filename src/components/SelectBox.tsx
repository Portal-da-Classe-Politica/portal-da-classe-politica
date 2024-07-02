'use client';

import { useState } from 'react';
import { IconAwesome } from './base/Icon/IconAwesome';

type ContentProps = {
  title: string;
  content: string | React.ReactNode;
};

export interface SelectBoxProps {
  tabs: ContentProps[];
}

const SelectBox = ({ tabs }: SelectBoxProps) => {
  const [selecionado, setSelecionado] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = selecionado === 0;
    const newIndex = isFirstSlide ? tabs.length - 1 : selecionado - 1;
    setSelecionado(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = selecionado === tabs.length - 1;
    const newIndex = isLastSlide ? 0 : selecionado + 1;
    setSelecionado(newIndex);
  };

  return (
    <div className="max-w-[1298px]">
      <div className="carousel-container relative overflow-hidden w-full md:hidden">
        <div
          className="carousel flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${selecionado * 100}%)` }}
        >
          {tabs.map((item, index) => (
            <div
              key={index}
              className="carousel-item px-12 py-5 text-lg bg-orangeLight1 rounded-t-lg flex-shrink-0 w-full font-bold"
            >
              {item.title}
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-orange p-2"
        >
          <IconAwesome type="shortLeft" size="2x" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-orange p-2"
        >
          <IconAwesome type="shortRight" size="2x" />
        </button>
        <div className="flex gap-1 absolute top-[90%] -translate-y-1/2 left-[50%] -translate-x-1/2  ">
          {tabs.map((val, i) => {
            return (
              <div
                key={i}
                className={`h-[10px] w-[10px] transition-all ${
                  selecionado === i ? 'bg-grayLight3' : 'bg-grayLight2'
                }  rounded-full`}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="hidden md:flex">
        {tabs.map((current, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelecionado(index);
              }}
              className={`${
                selecionado === index
                  ? 'bg-orange text-white text-b1 md:text-[18px] font-bold rounded-t-[10px] py-4 px-8'
                  : 'text-orange text-b1 md:text-[18px]  py-4 px-8'
              }`}
            >
              {current.title}
            </div>
          );
        })}
      </div>
      <div className="flex p-4 md:py-10 md:px-7 bg-orange">{tabs[selecionado].content}</div>
    </div>
  );
};

export default SelectBox;
