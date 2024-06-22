import Image from 'next/image';

const Icon = ({ src, width }: { src: string; width: number }) => {
  return (
    <div className="flex relative w-9 h-9 bg-orange rounded-[10px] items-center justify-center">
      <Image src={src} height={12} width={width} alt="" />
    </div>
  );
};

export default Icon;
