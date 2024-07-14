import Image from 'next/image';
import { Heading, Text } from '..';
import Link from 'next/link';

export const TextParagraphImage = ({
  src,
  header,
  texts = [],
  reverse = false,
  className = '',
  link,
}: {
  src: string;
  header: string;
  texts: string[];
  reverse?: boolean;
  className?: string;
  link: string;
}) => {
  const reverseClass = reverse ? 'md:flex-row-reverse' : '';
  return (
    <div className={`flex flex-col md:flex-row gap-10 ${className} ${reverseClass}`}>
      <div className="md:flex-1 w-full relative h-[240px] md:h-auto">
        <Image src={src} fill className="rounded-lg object-cover h-auto w-auto" alt="" />
      </div>
      <div className="flex-1">
        <Heading headingLevel={2} size="H1" className="font-bold text-black mb-6">
          {header}
        </Heading>
        {texts.map((text, idx) => (
          <Text key={idx} size="B1" className="mb-4">
            {text}
          </Text>
        ))}
        {link && (
          <Link href={link}>
            <Text size="B1" className="mt-6 text-orange">
              Leia mais
            </Text>
          </Link>
        )}
      </div>
    </div>
  );
};
