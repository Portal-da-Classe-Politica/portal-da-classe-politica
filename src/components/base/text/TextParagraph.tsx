import { Heading } from '../Heading';
import { Text } from './Text';

export const TextParagraph = ({
  title,
  texts = [],
  className,
}: {
  title: string;
  texts: string[];
  className?: string;
}) => {
  return (
    <div className={className}>
      <Heading size="H2" className="font-bold text-left w-full md:w-1/2 mb-6 pr-4">
        {title}
      </Heading>
      <div className="flex flex-wrap">
        {texts.map((text, idx) => (
          <div key={idx} className={`w-full md:w-1/2 mb-4 ${idx % 2 ? 'pl-4' : 'pr-4'}`}>
            <Text size="B1">{text}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
