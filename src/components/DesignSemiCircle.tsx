import SemiCircle from './design/SemiCircle';
import { cva } from 'cva';

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

const DesignSemiCircle = ({
  theme,
  position,
}: {
  theme?: 'light' | 'dark';
  position?: 'default' | 'top';
}) => {
  return (
    <>
      <div
        className={`absolute felx flex-col w-[233px] -right-3 ${semiCircleVariant({ position })} hidden design:block`}
      >
        <div className="mb-5 ">
          <SemiCircle height={223} width={223} alt="" className={` ${semiCircleVariant({ theme })}`} />
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
    </>
  );
};

export default DesignSemiCircle;
