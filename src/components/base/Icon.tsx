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
  faBars,
  faCheck,
  faPlus,
  faPhone,
  faBullhorn,
  faHeadset,
  faTriangleExclamation,
  faStar,
  faCalendarDays,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faArrowUpLong,
  faArrowDownLong,
  faArrowLeftLong,
  faArrowRightLong,
  faAngleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const sourceMap = {
  Mountain: faMountainSun,
  Menu: faBars,
  Checked: faCheck,
  UnChecked: faPlus,
  Phone: faPhone,
  Megafone: faBullhorn,
  Error: faTriangleExclamation,
  Headset: faHeadset,
  Star: faStar,
  Calendar: faCalendarDays,

  // Brands
  LinkedIn: faLinkedin,
  Facebook: faFacebook,
  Instagram: faInstagram,
  Twitter: faTwitterSquare,
  YouTube: faYoutube,
  Email: faEnvelope,

  // Arrows
  ArrowUp: faChevronUp,
  ArrowDown: faChevronDown,
  ArrowLeft: faChevronLeft,
  ArrowRight: faChevronRight,

  ArrowUpLong: faArrowUpLong,
  ArrowDownLong: faArrowDownLong,
  ArrowLeftLong: faArrowLeftLong,
  ArrowRightLong: faArrowRightLong,

  ArrowUpShort: faAngleUp,
  ArrowDownShort: faAngleDown,
  ArrowLeftShort: faAngleLeft,
  ArrowRightShort: faAngleRight,
};

export type IconType = keyof typeof sourceMap;

export type IconProps = { type: IconType; size?: SizeProp; className?: string };

export type IconSize = SizeProp;

export const Icon = ({ type, size = '1x', className = '' }: IconProps) => {
  return <FontAwesomeIcon icon={sourceMap[type] as IconProp} size={size} className={className} />;
};
