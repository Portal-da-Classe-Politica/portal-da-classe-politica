'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export const CarouselView = ({ children }: any) => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      className="bg-white rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] self-center"
    >
      {children}
    </Carousel>
  );
};
