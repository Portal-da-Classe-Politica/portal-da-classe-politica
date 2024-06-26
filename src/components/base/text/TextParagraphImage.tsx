import Image from 'next/image';
import { Heading, Text } from '..';

export const TextParagraphImage = ({
  src,
  header,
  text,
  reverse = false,
}: {
  src: string;
  header: string;
  text: string;
  reverse?: boolean;
}) => {
  const reverseClass = reverse ? 'flex-row-reverse' : '';
  return (
    <div className={`flex gap-10 ${reverseClass}`}>
      <div className="flex-1 w-full relative">
        <Image src={src} fill className="rounded-lg object-cover h-auto w-auto" alt="" />
      </div>
      <div className="flex-1">
        <Heading headingLevel={2} size="H1" className="font-bold text-grayDark2 mb-9">
          {header}
        </Heading>
        <Text size="B1">{text}</Text>
      </div>
    </div>
  );
};
