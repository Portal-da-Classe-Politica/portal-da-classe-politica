import { Text } from '@base/text';

export const Radio = ({
  name,
  id = '',
  value,
  label,
  className = '',
}: {
  name: string;
  id: string;
  value: string;
  label: string;
  className?: string;
}) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input type="radio" className="hidden peer" name={name} id={id} value={value} />
      <div className="w-4 h-4 border-[1px] border-orange rounded-full flex items-center justify-center mr-2 peer-checked:bg-orange"></div>
      <Text size="B2" textType="span" className="text-grayLight3">
        {label}
      </Text>
    </label>
  );
};
