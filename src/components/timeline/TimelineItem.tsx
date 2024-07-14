import { Heading, IconType, Text } from '../base';
import { BoxIconAwesome } from '../box/BoxIconAwesome';

type TimelineItemProps = {
  title?: string;
  text: string;
  vectorIconType?: IconType[];
};

const TimelineItem = ({ title, text, vectorIconType }: TimelineItemProps) => {
  return (
    <div className="max-w-[240px]">
      <BoxIconAwesome
        vectorIconType={vectorIconType}
        className="bg-orange text-white m-auto"
        size={32}
        iconSize={'2x'}
      />
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
