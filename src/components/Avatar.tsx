import Image from 'next/image';
import { Heading, Text } from './base';
import { IconAwesome } from './base/Icon/IconAwesome';

type CardIconTextProps = {
  title: string;
  text: string;
};

const Avatar = ({ title, text }: CardIconTextProps) => {
  return (
    <div className="max-w-[360px]">
      <div className="relative w-[360px] h-[360px] inline-block m-auto">
        <Image src={`/img/Person.png`} fill className="rounded-t-[10px] object-cover h-auto w-auto " alt="" />
      </div>
      <div className="text-left my-5">
        <Heading size="S1" className="font-bold my-4" headingLevel={2}>
          {title}
        </Heading>
        <Text size="B1">{text}</Text>
      </div>
      <div className="flex gap-3 text-orange text-left">
        <IconAwesome type="Facebook" />
        <IconAwesome type="Instagram" />
        <IconAwesome type="LinkedIn" />
        <IconAwesome type="Email" />
      </div>
    </div>
  );
};

export default Avatar;
