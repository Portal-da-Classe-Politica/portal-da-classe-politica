import { Heading, IconType, Text } from '../base';
import { BoxIcon } from '../box/BoxIcon';

type TimelineItemProps = {
  title?: string;
  text: string;
  icons?: IconType[];
};

const TimelineItem = ({ title, text, icons }: TimelineItemProps) => {
  return (
    <div className="max-w-[240px]">
      <BoxIcon icons={icons} className="bg-orange text-white m-auto" size={32} iconSize={'2x'} />
      <div></div>
      {title && (
        <Heading size="H4" className="text-orange font-bold mt-5">
          {title}
        </Heading>
      )}
      <Text size="B2" className={`${title ? 'mt-3' : 'mt-10 md:mt-5'}`}>
        {text}
      </Text>
    </div>
  );
};

export default TimelineItem;
