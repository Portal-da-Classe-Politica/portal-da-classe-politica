import Image from 'next/image';
import { Heading, Text } from '..';

export const TextParagraphImage = ({
  src,
  header,
  texts = [],
  reverse = false,
  className = '',
}: {
  src: string;
  header: string;
  texts: string[];
  reverse?: boolean;
  className?: string;
}) => {
  const reverseClass = reverse ? 'flex-row-reverse' : '';
  return (
    <div className={`flex gap-10 ${className} ${reverseClass}`}>
      <div className="flex-1 w-full relative">
        <Image src={src} fill className="rounded-lg object-cover h-auto w-auto" alt="" />
      </div>
      <div className="flex-1">
        <Heading headingLevel={2} size="H1" className="font-bold text-grayDark2 mb-6">
          {header}
        </Heading>
        {texts.map((text, idx) => (
          <Text key={idx} size="B1" className="mb-4">
            {text}
          </Text>
        ))}
      </div>
    </div>
  );
};
