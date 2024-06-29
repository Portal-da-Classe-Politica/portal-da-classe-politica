import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitterSquare,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faMountainSun,
  faArrowRightLong,
  faAngleRight,
  faAngleLeft,
  faChevronRight,
  faBars,
  faArrowDownLong,
  faChevronDown,
  faCheck,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const sourceMap = {
  Facebook: faFacebook,
  LinkedIn: faLinkedin,
  Instagram: faInstagram,
  Mountain: faMountainSun,
  Twitter: faTwitterSquare,
  YouTube: faYoutube,
  Email: faEnvelope,
  LongArrowRight: faArrowRightLong,
  LongArrowDown: faArrowDownLong,
  shortRight: faAngleRight,
  shortLeft: faAngleLeft,
  ArrowRight: faChevronRight,
  Menu: faBars,
  ArrowDown: faChevronDown,
  Checked: faCheck,
  UnChecked: faPlus,
};

export type IconTypeAwesome = keyof typeof sourceMap;

export type IconAwesomeProps = { type: IconTypeAwesome; size?: SizeProp; className?: string };

export const IconAwesome = ({ type, size = '1x', className = '' }: IconAwesomeProps) => {
  return <FontAwesomeIcon icon={sourceMap[type] as IconProp} size={size} className={className} />;
};
