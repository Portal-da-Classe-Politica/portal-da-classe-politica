'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export const CarouselView = ({ children }: any) => {
  return (
    <>
      <div className={'md:hidden'}>
        <Carousel autoPlay infiniteLoop showStatus={false} className="justify-items-center">
          {children}
        </Carousel>
      </div>
      <div className="hidden md:block">
        <Carousel autoPlay infiniteLoop showStatus={false} width={'80%'} className="justify-items-center">
          {children}
        </Carousel>
      </div>
    </>
  );
};
