import { Heading, Text } from '../base';
import { BoxIconAwesome } from '../box/BoxIconAwesome';

type TimelineItemProps = {
  title: string;
  text: string;
};

const TimelineItem = ({ title, text }: TimelineItemProps) => {
  return (
    <div className="max-w-[240px]">
      <BoxIconAwesome iconType="Mountain" className="bg-orange text-white m-auto" size={32} iconSize={'2x'} />
      <Heading size="H4" className="text-orange font-bold mt-5 mb-3">
        {title}
      </Heading>
      <Text size="B2">{text}</Text>
    </div>
  );
};

export default TimelineItem;
