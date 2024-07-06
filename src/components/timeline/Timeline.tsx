import { Icon } from '@base';
import TimelineItem from './TimelineItem';

type TimelineProps = {
  title: string;
  text: string;
};

const Timeline = ({ items, className }: { items: TimelineProps[]; className?: string }) => {
  return (
    <div
      className={`grid grid-cols-1 md:flex md:flex-wrap text-center justify-center justify-items-center md:justify-normal gap-14 md:gap-0 ${className}`}
    >
      {items.map((value, i) => {
        return (
          <div className="relative mb-5" key={i}>
            {i !== items.length - 1 && (
              <>
                <div className="absolute right-0 translate-x-7 top-1/4 -translate-y-1/2 text-orange hidden md:block">
                  <Icon type="ArrowRightLong" size="3x" />
                </div>
                <div className="absolute right-1/2 translate-x-1/2 -bottom-1/4  text-orange md:hidden">
                  <Icon type="ArrowDownLong" size="3x" />
                </div>
              </>
            )}
            <TimelineItem title={value.title} text={value.text} />
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
