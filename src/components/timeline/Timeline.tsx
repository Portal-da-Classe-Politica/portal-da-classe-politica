import { IconAwesome } from '@base';
import TimelineItem from './TimelineItem';

type TimelineProps = {
  title: string;
  text: string;
};

const Timeline = ({ items, className }: { items: TimelineProps[]; className?: string }) => {
  return (
    <div className={`flex flex-wrap text-center ${className}`}>
      {items.map((value, i) => {
        return (
          <div className="relative mb-5" key={i}>
            {i !== items.length - 1 && (
              <div className="absolute right-0 translate-x-7 top-1/4 -translate-y-1/2 text-orange">
                <IconAwesome type="LongArrowRight" size="3x" />
              </div>
            )}
            <TimelineItem title={value.title} text={value.text} />
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
