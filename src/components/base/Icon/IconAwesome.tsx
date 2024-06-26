import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitterSquare,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountainSun } from '@fortawesome/free-solid-svg-icons';

const sourceMap = {
  Facebook: faFacebook,
  LinkedIn: faLinkedin,
  Instagram: faInstagram,
  Mountain: faMountainSun,
  Twitter: faTwitterSquare,
  YouTube: faYoutube,
};

export type IconTypeAwesome = keyof typeof sourceMap;

export type PropsIcon = { type: IconTypeAwesome; size?: SizeProp; className?: string };

export const IconAwesome = ({ type, size = '1x', className = '' }: PropsIcon) => {
  return <FontAwesomeIcon icon={sourceMap[type] as IconProp} size={size} className={className} />;
};
