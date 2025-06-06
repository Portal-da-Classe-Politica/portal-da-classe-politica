import { cva } from 'cva';

import SemiCircle from './SemiCircle';

const semiCircleVariant = cva('', {
  variants: {
    theme: {
      light: 'fill-white',
      dark: 'fill-orange',
    },
    position: {
      default: 'bottom-0',
      top: 'top-0',
    },
  },
  defaultVariants: {
    theme: 'light',
    position: 'default',
  },
});

export const DesignSemiCircle = ({
  theme,
  position,
}: {
  theme?: 'light' | 'dark';
  position?: 'default' | 'top';
}) => {
  return (
    <div
      className={`absolute flex flex-col w-[233px] right-0 ${semiCircleVariant({ position })} hidden design:block`}
    >
      <div className="mb-5 ">
        <SemiCircle height={223} width={223} alt="" className={`${semiCircleVariant({ theme })}`} />
      </div>
      <div className="mb-5 ">
        <SemiCircle
          height={223}
          width={223}
          alt=""
          fill={'text-orange'}
          className={`rotate-180  ${semiCircleVariant({ theme })}`}
        />
      </div>
      <div>
        <SemiCircle
          height={223}
          width={223}
          alt=""
          className={`scale-x-[-1]  ${semiCircleVariant({ theme })} `}
        />
      </div>
      {theme === 'dark' && (
        <div className="mt-5">
          <SemiCircle
            height={223}
            width={223}
            alt=""
            className={`scale-x-[-1] rotate-180 ${semiCircleVariant({ theme })} `}
          />
        </div>
      )}
    </div>
  );
};
