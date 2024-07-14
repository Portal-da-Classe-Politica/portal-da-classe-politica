import { Heading, IconType, Text } from './base';
import { BoxIconAwesome } from './box/BoxIconAwesome';

type CardIconTextProps = {
  title: string;
  text: string;
  customIcon?: React.ReactNode;
  iconType?: IconType;
};

const CardIconText = ({ title, text, customIcon, iconType }: CardIconTextProps) => {
  return (
    <div>
      <BoxIconAwesome
        customIcon={customIcon}
        iconType={iconType}
        className="bg-orange text-white"
        size={12}
      />
      <Heading size="S1" className="font-bold my-4" headingLevel={2}>
        {title}
      </Heading>
      <Text size="B1">{text}</Text>
    </div>
  );
};

export default CardIconText;
