import { Text } from '@base';

export const Bullet = ({ text, name }: { text: string; name: string }) => {
  return (
    <div>
      <label className="flex items-center cursor-pointer">
        <input type="radio" className="hidden peer" name={name} />
        <div className="w-3 h-3 border-[1px] border-orange rounded-full flex items-center justify-center mr-2  peer-checked:bg-orange"></div>
        <Text size="B2" textType="span" className="text-grayLight3">
          {text}
        </Text>
      </label>
    </div>
  );
};
