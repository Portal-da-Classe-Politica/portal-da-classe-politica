import { ButtonStyled, ButtonStyledProps } from '@base/ButtonStyled';

const Page = () => {
  return (
    <main className="font-montserrat p-10">
      {[
        ['Orange small', { color: 'orange', size: 'small' }],
        ['Orange standard', { color: 'orange', size: 'standard' }],
        ['Orange large', { color: 'orange', size: 'large' }],
        ['Orange Outlined', { color: 'orange', size: 'large', style: 'outlined' }],
        ['Orange ghost', { style: 'ghost' }],
        ['Orange link', { style: 'link' }],
        ['Orange Disabled', { disabled: true }],
        ['Black Fill', { color: 'black' }],
        ['Black outlined', { color: 'black', style: 'outlined' }],
        ['Black Ghost', { color: 'black', style: 'ghost' }],
        ['Black Link', { color: 'black', style: 'link' }],
        ['Black Disabled', { color: 'black', disabled: true }],
      ].map((el: any, idx: number) => {
        const text = el[0] as string;
        const props = el[1] as ButtonStyledProps;

        return (
          <div key={idx} className="py-2">
            <ButtonStyled
              text={text}
              color={props?.color || 'orange'}
              style={props?.style || 'fill'}
              size={props?.size || 'standard'}
              disabled={props?.disabled || false}
            />
          </div>
        );
      })}
    </main>
  );
};

export default Page;
