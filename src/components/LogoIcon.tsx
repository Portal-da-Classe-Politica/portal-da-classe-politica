import Image from 'next/image';

const LogoIcon = ({ type = 'white' }: { type?: 'orange' | 'white' }) => {
  const IconSelected = {
    orange: <Image src="/img/LogoOrange.svg" alt="Logo" width={154} height={80} />,
    white: <Image src="/img/Logo.svg" alt="Logo" width={154} height={80} />,
  };

  return IconSelected[type];
};

export default LogoIcon;
