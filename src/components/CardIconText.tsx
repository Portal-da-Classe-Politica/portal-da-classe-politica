import { Heading, Text } from './base';
import { BoxIconAwesome } from './box/BoxIconAwesome';

type CardIconTextProps = {
  title: string;
  text: string;
};

const CardIconText = ({ title, text }: CardIconTextProps) => {
  return (
    <div>
      <BoxIconAwesome iconType="Mountain" className="bg-orange text-white" size={12} />
      <Heading size="S1" className="font-bold my-4" headingLevel={2}>
        {title}
      </Heading>
      <Text size="B1">{text}</Text>
    </div>
  );
};

export default CardIconText;
