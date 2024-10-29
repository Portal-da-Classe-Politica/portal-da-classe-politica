import Image from 'next/image';
import { cva } from 'cva';

import { Heading, Text, Icon } from '@base';

type CardIconTextProps = {
  title: string;
  text: string;
  src: string;
  type?: 'top' | 'left';
  social?: {
    instagram?: string;
    facebook?: string;
    email?: string;
    linkedin?: string;
  };
};

const textVariants = cva('font-montserrat', {
  variants: {
    personImage: {
      top: 'rounded-t-[10px] object-cover h-auto w-auto',
      left: 'rounded-full object-cover h-auto w-auto ',
    },
    imgContainer: {
      top: 'relative w-[240px] h-[240px] md:w-[360px] md:h-[360px] inline-block m-auto',
      left: 'relative w-[120px] h-[120px] md:w-[100px] md:h-[100px] inline-block m-auto',
    },
    mainContainer: {
      top: 'max-w-[360px]',
      left: 'inline-flex gap-4',
    },
    textContainer: {
      top: 'text-left my-5',
      left: 'text-left my-5 max-w-[360px] ',
    },
  },
});

const Avatar = ({ title, text, src, type = 'top', social }: CardIconTextProps) => {
  return (
    <div className={textVariants({ mainContainer: type })}>
      <div className={textVariants({ imgContainer: type })}>
        <Image src={src} fill className={textVariants({ personImage: type })} alt="" />
      </div>
      <div>
        <div className={textVariants({ textContainer: type })}>
          <Heading size="S1" className="font-bold my-4" headingLevel={2}>
            {title}
          </Heading>
          <Text size="B1">{text}</Text>
        </div>
        <div className="flex gap-3 text-orange text-left">
          {social?.facebook && (
            <a href={social?.facebook || ''} target="_blank">
              <Icon type="Facebook" />
            </a>
          )}
          {social?.instagram && (
            <a href={social?.instagram || ''} target="_blank">
              <Icon type="Instagram" />
            </a>
          )}
          {social?.linkedin && (
            <a href={social?.linkedin || ''} target="_blank">
              <Icon type="LinkedIn" />
            </a>
          )}
          {social?.email && (
            <a href={social?.email || ''} target="_blank">
              <Icon type="Email" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
