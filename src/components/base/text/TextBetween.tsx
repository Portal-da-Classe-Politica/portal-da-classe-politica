import { Text } from './Text';

type TextBetweenProps = {
  title: string;
  text: string;
};

const TextBetween = ({ title, text }: TextBetweenProps) => {
  return (
    <Text size="L2" className="flex justify-between">
      <span className="font-bold mr-1">{title}:</span>
      <span className="">{text}</span>
    </Text>
  );
};

export default TextBetween;