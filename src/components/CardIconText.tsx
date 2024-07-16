import { Heading, IconType, Text } from './base';

import { Box } from './box/Box';
import { BoxIcon } from './box/BoxIcon';

type CardIconTextProps = {
  title: string;
  text: string;
  customIcon?: React.ReactNode;
  iconType?: IconType;
};

const CardIconText = ({ title, text, customIcon, iconType }: CardIconTextProps) => {
  return (
    <div>
      {iconType && <BoxIcon icon={iconType} className="bg-orange text-white" size={12} />}
      {customIcon && (
        <Box className="bg-orange text-white" size={12}>
          {customIcon}
        </Box>
      )}

      <Heading size="S1" className="font-bold my-4" headingLevel={2}>
        {title}
      </Heading>
      <Text size="B1">{text}</Text>
    </div>
  );
};

export default CardIconText;
